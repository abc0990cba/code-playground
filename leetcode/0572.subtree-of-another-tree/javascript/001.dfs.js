/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} left
 * @param {TreeNode} right
 * @return {boolean}
 */
function isSameTree(left, right) {
  if(!left && !right) return true;
  
  if(left && right && right.val === left.val) {
    const isLeftSubtreeSame = isSameTree(left.left, right.left);
    const isRightSubtreeSame = isSameTree(left.right, right.right);
    
    return isLeftSubtreeSame && isRightSubtreeSame;
  }

  return false;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
    if(!subRoot) return true;

    if(!root) return false;

    if(isSameTree(root, subRoot)) return true;

    return (
      isSubtree(root.left, subRoot) ||
      isSubtree(root.right, subRoot)
    );
};

