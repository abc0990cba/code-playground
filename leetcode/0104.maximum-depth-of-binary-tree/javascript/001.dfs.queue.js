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
var maxDepth = function(root) {
  if(!root) return 0;

  let maxDepth = 1;

  const queue = [{ node: root, depth: maxDepth }];

  while(queue.length) {
    const { node, depth } = queue.shift();

    maxDepth = Math.max(maxDepth, depth);

    if(node.left !== null) queue.push({ node: node.left, depth: depth + 1 });
    if(node.right !== null) queue.push({ node: node.right, depth: depth + 1 });
  }

  return maxDepth;
};