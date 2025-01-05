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
var maxPathSum = function(root) {
    let maxSum = root.val;

    const dfs = (root) => {
      if(!root) return 0;

      const maxLeft = Math.max(0, dfs(root.left));
      const maxRight = Math.max(0, dfs(root.right));

      const sum = maxLeft + root.val + maxRight;
      maxSum = Math.max(sum, maxSum);
      
      return root.val + Math.max(maxLeft, maxRight);
    }

    dfs(root);

    return maxSum;
};

// Time: O(n)
// Space: O(n)