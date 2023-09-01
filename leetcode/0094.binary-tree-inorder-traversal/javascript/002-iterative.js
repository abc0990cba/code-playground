/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = (root) => {
    const inorder = [];
    const stack = [];
    let current = root;
    
    while(stack.length || current) {
        while(current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        inorder.push(current.val);
        current = current.right;
    }
    
    return inorder;
};
