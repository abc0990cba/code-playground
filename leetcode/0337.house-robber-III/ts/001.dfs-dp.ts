/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */


function rob(root: TreeNode | null): number {
    const dfs = (node: TreeNode | null) => {
        if(!node) return { rob: 0, notRob: 0 };

        const left = dfs(node.left);
        const right = dfs(node.right);
        const rob = node.val + left.notRob + right.notRob;
        const notRob = Math.max(left.notRob, left.rob) + Math.max(right.notRob, right.rob);

        return { rob, notRob }; 
    }
    const { rob, notRob } = dfs(root);

    return Math.max(rob, notRob);
}
