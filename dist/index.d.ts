export interface Node {
    text: string;
    children: Node[];
}
export interface Options {
    verticalLine: string;
    singleJoint: string;
    multiJoint: string;
}
export declare const presets: {
    tree: Options;
    clang: Options;
};
export declare const reverseTree: (input: string, options?: Options) => Node;
