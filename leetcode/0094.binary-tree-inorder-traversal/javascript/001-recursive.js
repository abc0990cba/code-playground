/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// Solution 1. Recursive
// Time complexity: O(n)
// Space complexity: O(n

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = (root) => {
    const traversal = [];
    solve(root);
    
    function solve(root) {
        if(root !== null) {
            solve(root.left);
            traversal.push(root.val);
            solve(root.right);
        }
    }

    return traversal;
};
