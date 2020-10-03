export interface Node {
  text: string
  children: Node[]
}

class Buf {
  private lines: string[]
  private index: number = 0
  constructor(lines: string[]) {
    this.lines = lines
  }
  advance() {
    this.index++
  }
  getNext() {
    return this.lines[this.index]
  }
}

const parseLevelMatched = (
  regExp: RegExp,
  line: string,
  indentWidth: number
): [number, string] | undefined => {
  const match = regExp.exec(line)
  if (match != null && match.length > 1) {
    return [
      Math.floor(match[1].length / indentWidth) + 1,
      line.substring(match[0].length),
    ]
  }
  return undefined
}

type LevelParser = (line: string) => [number, string] | undefined

const createLevelParser = (
  singleListRegExp: RegExp,
  multiListRegExp: RegExp,
  indentWidth: number
): LevelParser => (line) => {
  const singleMatch = parseLevelMatched(singleListRegExp, line, indentWidth)
  if (singleMatch !== undefined) {
    return singleMatch
  }
  const multiMatch = parseLevelMatched(multiListRegExp, line, indentWidth)
  if (multiMatch !== undefined) {
    return multiMatch
  }
  return undefined
}

const createParser = (parseLevel: LevelParser) => {
  const parseSubtree = (buf: Buf, parentLevel: number): Node[] => {
    const nodes = []
    while (true) {
      const line = buf.getNext()

      if (line === "" || line === undefined) {
        return nodes
      }

      // much waste here, parse same line many times
      const level = parseLevel(line)

      if (level === undefined) {
        throw new Error(`could not parse the line: ${line}`)
      }

      const node = {
        text: level[1],
        children: [],
      }

      if (level[0] === parentLevel + 1) {
        buf.advance()
        nodes.push(node)
      } else if (level[0] === parentLevel + 2) {
        nodes[nodes.length - 1].children = parseSubtree(buf, parentLevel + 1)
      } else {
        return nodes
      }
    }
  }
  return parseSubtree
}

export interface Options {
  verticalLine: string
  singleJoint: string
  multiJoint: string
}

export const presets = {
  tree: <Options>{
    verticalLine: "│",
    singleJoint: "└── ",
    multiJoint: "├── ",
  },
  clang: <Options>{
    verticalLine: "\\|",
    singleJoint: "`-",
    multiJoint: "\\|-",
  },
}

export const reverseTree = (
  input: string,
  options: Options = presets.tree
): Node => {
  const buf = new Buf(input.split("\n"))
  const text = buf.getNext()
  buf.advance()

  const singleListRegExp = new RegExp(
    `^([\\s${options.verticalLine}]*)${options.singleJoint}`
  )
  const multiListRegExp = new RegExp(
    `^([\\s${options.verticalLine}]*)${options.multiJoint}`
  )

  return {
    text,
    children: createParser(
      createLevelParser(
        singleListRegExp,
        multiListRegExp,
        options.singleJoint.length
      )
    )(buf, 0),
  }
}
