/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    const queueP = [p];
    const queueQ = [q];

    while(queueQ.length && queueP.length) {
      const nodeP = queueP.shift();
      const nodeQ = queueQ.shift();

      if(nodeP == null && nodeQ == null) continue;

      if(!nodeP || !nodeQ || nodeP.val !== nodeQ.val) return false;

      queueP.push(nodeP.left, nodeP.right);
      queueQ.push(nodeQ.left, nodeQ.right);
    }

    return true;
};