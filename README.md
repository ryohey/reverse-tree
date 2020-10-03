# reverse-tree

Convert string represented tree back into the structured JSON

## Installation

```bash
npm install -g reverse-tree
```

## Usage

### Command

`reverse-tree <preset>`

reverse-tree reads stdin.

### Preset

- `tree` (default)
- `clang`

### Example

```bash
tree | reverse-tree | jq
```

```bash
clang -Xclang -ast-dump ViewController.m -fno-color-diagnostics | reverse-tree clang | jq
```

## Output Example

### Input

```
.
├── LICENSE.txt
├── README.md
├── lib
│   ├── mime-type.js
│   ├── parser.js
│   ├── serializer.js
│   └── utils.js
└── package.json

1 directory, 7 files
```

### Output

```json
{
  "text": ".",
  "children": [
    {
      "text": "LICENSE.txt",
      "children": []
    },
    {
      "text": "README.md",
      "children": []
    },
    {
      "text": "lib",
      "children": [
        {
          "text": "mime-type.js",
          "children": []
        },
        {
          "text": "parser.js",
          "children": []
        },
        {
          "text": "serializer.js",
          "children": []
        },
        {
          "text": "utils.js",
          "children": []
        }
      ]
    },
    {
      "text": "package.json",
      "children": []
    }
  ]
}
```

## JavaScript API

```js
reverseTree(input, options)
```

### Options

```ts
Options {
  verticalLine: string
  singleJoint: string
  multiJoint: string
}
```
