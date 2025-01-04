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
var rightSideView = function(root) {
    const res = [];
    if(!root) return res;

    const queue = [root];

    while(queue.length) {
      const level = [];

      for(let i = queue.length; i > 0; i--) {
        const node = queue.pop();

        if(node !== null) {
          level.push(node.val);
          queue.unshift(node.left);
          queue.unshift(node.right);
        }
      }
      if(level.length) res.push(level.pop());
    }

    return res;
};