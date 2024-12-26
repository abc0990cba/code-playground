/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// Time Complexity: O(n)
// Space Complexity: O(h) | Where h is the height of the tallest tree.
// This is within the Call Stack 
// In the worst case, a tree's number of nodes is it's height.
// Thus it's argued the real space complexity is O(n)

/**
 * @param {TreeNode} left
 * @param {TreeNode} right
 * @return {boolean}
 */
const isSameTree = (left, right) =>  {
    if(left === null &&   right === null) {
      return true;
    }

    if(
      left === null && right !== null ||
      right === null && left !== null
    ) {
      return false;
    }

    if(left.val !== right.val) {
      return false;
    }

    const isLeftSubtreeSame = isSameTree(left.left, right.left);
    const isRightSubtreeSame = isSameTree(left.right, right.right);

    return isLeftSubtreeSame && isRightSubtreeSame;
};