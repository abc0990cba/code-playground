/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function generateTrees(n) {
  if (n < 1) return [];

  return backtrack(1, n);
}

/**
 * @param {number} start
 * @param {number} end
 * @return {TreeNode[]}
 */
function backtrack(start, end) {
  const res = [];

  if (start > end) {
    res.push(null);
    return res;
  }

  for (let i = start; i <= end; i++) {
    const leftNode = backtrack(start, i - 1);
    const rightNode = backtrack(i + 1, end);

    for (let l = 0; l < leftNode.length; l++) {
      for (let r = 0; r < rightNode.length; r++) {
        const root = new TreeNode(i);
        root.left = leftNode[l];
        root.right = rightNode[r];
        res.push(root);
      }
    }
  }
  
  return res;
}
