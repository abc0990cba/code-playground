type TreeNode = {
    value: string;
}

type LeafNode = TreeNode & {
    isLeaf: boolean;
}

type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode];
}

function mapNode<T extends TreeNode>(
    node: T,
    f: (s: string) => string
): T {
    return {
        ...node,
        value: f(node.value)
    }
}

let a1: TreeNode = { value: 'a' };
let b1: LeafNode = { value: 'b', isLeaf: true };
let c1: InnerNode = { value: 'c', children: [b1] };

const callback = (s: string) => s.toUpperCase();

let a2 = mapNode(a1, callback);
let b2 = mapNode(b1, callback);
let c2 = mapNode(c1, callback);