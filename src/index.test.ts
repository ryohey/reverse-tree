import { presets, reverseTree } from "./index"

test("tree command", () => {
  expect(
    reverseTree(`.
├── LICENSE.txt
├── README.md
├── lib
│   ├── mime-type.js
│   ├── parser.js
│   ├── serializer.js
│   └── utils.js
└── package.json

1 directory, 7 files`)
  ).toStrictEqual({
    text: ".",
    children: [
      {
        text: "LICENSE.txt",
        children: [],
      },
      {
        text: "README.md",
        children: [],
      },
      {
        text: "lib",
        children: [
          {
            text: "mime-type.js",
            children: [],
          },
          {
            text: "parser.js",
            children: [],
          },
          {
            text: "serializer.js",
            children: [],
          },
          {
            text: "utils.js",
            children: [],
          },
        ],
      },
      {
        text: "package.json",
        children: [],
      },
    ],
  })
})

test("clang command", () => {
  expect(
    reverseTree(
      `TranslationUnitDecl 0x7fec56022408 <<invalid sloc>> <invalid sloc>
|-TypedefDecl 0x7fec56022ca0 <<invalid sloc>> <invalid sloc> implicit __int128_t '__int128'
| \`-BuiltinType 0x7fec560229a0 '__int128'
|-TypedefDecl 0x7fec57858910 <line:81:1, col:33> col:33 __darwin_mbstate_t '__mbstate_t':'__mbstate_t'
| \`-TypedefType 0x7fec578588e0 '__mbstate_t' sugar
|   |-Typedef 0x7fec57858868 '__mbstate_t'
|   \`-ElaboratedType 0x7fec57858810 'union __mbstate_t' sugar
|     \`-RecordType 0x7fec578586a0 '__mbstate_t'
|       \`-Record 0x7fec57858620 ''
\`-ObjCImplementationDecl 0x7fec5d2621b0 <ViewController.m:5:1, line:17556:1> line:5:17 ViewController
  |-ObjCInterface 0x7fec5d24e7e0 'ViewController'
  \`-ObjCMethodDecl 0x7fec5d2943d8 <line:17551:1, line:17553:1> line:17551:1 - didFinishEditing: 'void'
    |-ImplicitParamDecl 0x7fec5d6a9028 <<invalid sloc>> <invalid sloc> implicit self 'ViewController *'
    |-ImplicitParamDecl 0x7fec5d6a9090 <<invalid sloc>> <invalid sloc> implicit _cmd 'SEL':'SEL *'
    |-ParmVarDecl 0x7fec5d294468 <col:40> col:40 lview 'id':'id'
    \`-CompoundStmt 0x7fec5d6a91c8 <col:46, line:17553:1>
    \`-CallExpr 0x7fec5d6a9188 <line:17552:5, col:41> 'void'
        |-ImplicitCastExpr 0x7fec5d6a9170 <col:5> 'void (*)(id, ...)' <FunctionToPointerDecay>
        | \`-DeclRefExpr 0x7fec5d6a90f8 <col:5> 'void (id, ...)' Function 0x7fec56058b10 'NSLog' 'void (id, ...)'
        \`-ImplicitCastExpr 0x7fec5d6a91b0 <col:11, col:12> 'id':'id' <BitCast>
        \`-ObjCStringLiteral 0x7fec5d6a9150 <col:11, col:12> 'NSString *'
            \`-StringLiteral 0x7fec5d6a9118 <col:12> 'char [28]' lvalue "---didFinishEditing-----"`,
      presets.clang
    )
  ).toStrictEqual({
    text: "TranslationUnitDecl 0x7fec56022408 <<invalid sloc>> <invalid sloc>",
    children: [
      {
        text:
          "TypedefDecl 0x7fec56022ca0 <<invalid sloc>> <invalid sloc> implicit __int128_t '__int128'",
        children: [
          {
            text: "BuiltinType 0x7fec560229a0 '__int128'",
            children: [],
          },
        ],
      },
      {
        text:
          "TypedefDecl 0x7fec57858910 <line:81:1, col:33> col:33 __darwin_mbstate_t '__mbstate_t':'__mbstate_t'",
        children: [
          {
            text: "TypedefType 0x7fec578588e0 '__mbstate_t' sugar",
            children: [
              {
                text: "Typedef 0x7fec57858868 '__mbstate_t'",
                children: [],
              },
              {
                text: "ElaboratedType 0x7fec57858810 'union __mbstate_t' sugar",
                children: [
                  {
                    text: "RecordType 0x7fec578586a0 '__mbstate_t'",
                    children: [
                      {
                        text: "Record 0x7fec57858620 ''",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        children: [
          {
            children: [],
            text: "ObjCInterface 0x7fec5d24e7e0 'ViewController'",
          },
          {
            children: [
              {
                children: [],
                text:
                  "ImplicitParamDecl 0x7fec5d6a9028 <<invalid sloc>> <invalid sloc> implicit self 'ViewController *'",
              },
              {
                children: [],
                text:
                  "ImplicitParamDecl 0x7fec5d6a9090 <<invalid sloc>> <invalid sloc> implicit _cmd 'SEL':'SEL *'",
              },
              {
                children: [],
                text:
                  "ParmVarDecl 0x7fec5d294468 <col:40> col:40 lview 'id':'id'",
              },
              {
                children: [],
                text: "CompoundStmt 0x7fec5d6a91c8 <col:46, line:17553:1>",
              },
              {
                children: [],
                text: "CallExpr 0x7fec5d6a9188 <line:17552:5, col:41> 'void'",
              },
            ],
            text:
              "ObjCMethodDecl 0x7fec5d2943d8 <line:17551:1, line:17553:1> line:17551:1 - didFinishEditing: 'void'",
          },
        ],
        text:
          "ObjCImplementationDecl 0x7fec5d2621b0 <ViewController.m:5:1, line:17556:1> line:5:17 ViewController",
      },
    ],
  })
})
