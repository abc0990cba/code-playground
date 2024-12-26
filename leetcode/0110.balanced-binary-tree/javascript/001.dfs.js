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
 * @return {boolean}
 */
var isBalanced = function(root) {
    let isBalanced = true;
    if(!root) return isBalanced;

    const dfs = (root) => {
      if(!root) return 0;

      const left = dfs(root.left);
      const right = dfs(root.right);

      if(Math.abs(left - right) > 1 ) isBalanced = false;

      return 1 + Math.max(left, right);
    }

    dfs(root);

    return isBalanced;
};