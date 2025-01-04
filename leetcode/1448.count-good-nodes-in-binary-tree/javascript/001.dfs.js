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
 * @return {number}
 */
var goodNodes = function(root) {
  if(!root) return 0;
  let count = 0;

  const dfs = (node, max) => {
    if(!node) return;

    if(node.val >= max) {
      count++;  
    }

    const newMax = Math.max(node.val, max);
    dfs(node.left, newMax);
    dfs(node.right, newMax);
  }

  dfs(root, root.val);

  return count;
};