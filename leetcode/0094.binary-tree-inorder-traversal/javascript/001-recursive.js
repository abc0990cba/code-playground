/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// Time complexity: O(n)
// Space complexity: O(n)

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = (root) => {
    const inorder = [];
    solve(root);
    
    function solve(root) {
        if(root !== null) {
            solve(root.left);
            inorder.push(root.val);
            solve(root.right);
        }
    }

    return inorder;
};
