#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
async function read(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf8");
}
;
(async () => {
    const input = await read(process.stdin);
    const options = process.argv[2] !== undefined ? _1.presets[process.argv[2]] : _1.presets.tree;
    try {
        console.log(JSON.stringify(_1.reverseTree(input, options)));
    }
    catch (e) {
        console.error(e.message, e.stack);
    }
})();
//# sourceMappingURL=cli.js.map