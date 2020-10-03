#!/usr/bin/env node

import { ReadStream } from "tty"
import { presets, reverseTree } from "."

async function read(stream: ReadStream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString("utf8")
}

;(async () => {
  const input = await read(process.stdin)
  const options =
    process.argv[2] !== undefined ? presets[process.argv[2]] : presets.tree
  try {
    console.log(JSON.stringify(reverseTree(input, options)))
  } catch (e) {
    console.error(e.message, e.stack)
  }
})()
