"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseTree = exports.presets = void 0;
class Buf {
    constructor(lines) {
        this.index = 0;
        this.lines = lines;
    }
    advance() {
        this.index++;
    }
    getNext() {
        return this.lines[this.index];
    }
}
const parseLevelMatched = (regExp, line, indentWidth) => {
    const match = regExp.exec(line);
    if (match != null && match.length > 1) {
        return [
            Math.floor(match[1].length / indentWidth) + 1,
            line.substring(match[0].length),
        ];
    }
    return undefined;
};
const createLevelParser = (singleListRegExp, multiListRegExp, indentWidth) => (line) => {
    const singleMatch = parseLevelMatched(singleListRegExp, line, indentWidth);
    if (singleMatch !== undefined) {
        return singleMatch;
    }
    const multiMatch = parseLevelMatched(multiListRegExp, line, indentWidth);
    if (multiMatch !== undefined) {
        return multiMatch;
    }
    return undefined;
};
const createParser = (parseLevel) => {
    const parseSubtree = (buf, parentLevel) => {
        const nodes = [];
        while (true) {
            const line = buf.getNext();
            if (line === "" || line === undefined) {
                return nodes;
            }
            // much waste here, parse same line many times
            const level = parseLevel(line);
            if (level === undefined) {
                throw new Error(`could not parse the line: ${line}`);
            }
            const node = {
                text: level[1],
                children: [],
            };
            if (level[0] === parentLevel + 1) {
                buf.advance();
                nodes.push(node);
            }
            else if (level[0] === parentLevel + 2) {
                nodes[nodes.length - 1].children = parseSubtree(buf, parentLevel + 1);
            }
            else {
                return nodes;
            }
        }
    };
    return parseSubtree;
};
exports.presets = {
    tree: {
        verticalLine: "│",
        singleJoint: "└── ",
        multiJoint: "├── ",
    },
    clang: {
        verticalLine: "\\|",
        singleJoint: "`-",
        multiJoint: "\\|-",
    },
};
exports.reverseTree = (input, options = exports.presets.tree) => {
    const buf = new Buf(input.split("\n"));
    const text = buf.getNext();
    buf.advance();
    const singleListRegExp = new RegExp(`^([\\s${options.verticalLine}]*)${options.singleJoint}`);
    const multiListRegExp = new RegExp(`^([\\s${options.verticalLine}]*)${options.multiJoint}`);
    return {
        text,
        children: createParser(createLevelParser(singleListRegExp, multiListRegExp, options.singleJoint.length))(buf, 0),
    };
};
//# sourceMappingURL=index.js.map