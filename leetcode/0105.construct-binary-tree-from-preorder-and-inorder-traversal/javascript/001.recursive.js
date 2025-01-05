/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if(!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0]; 
  const root = new TreeNode(rootVal);
  const inorderRootIdx = inorder.indexOf(rootVal);

  root.left = buildTree(preorder.slice(1, inorderRootIdx+1), inorder.slice(0, inorderRootIdx));
  root.right = buildTree(preorder.slice(inorderRootIdx+1), inorder.slice(inorderRootIdx+1));

  return root;
};

// Time: O(n^2)
// Space: O(n^2)