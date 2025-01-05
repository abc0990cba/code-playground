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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  const stack = [];
  let cur = root;
  let n = 0;

  while(stack.length || cur) {
    while(cur !== null) {
      stack.push(cur);
      cur = cur.left;
    }
    n++;
    cur = stack.pop();
    if(n === k) return cur.val;
    cur = cur.right;
  }
};