
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


// Time Complexity: O(n)
// Space Complexity: O(q), q is the length of the Binary Tree's Queue

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = (root) => {
  if (!root) return [];

  const levelOrderArry = [];
  const queue = [root];

  while (queue.length) {
      const currentLevel = [];
      let queueLen = queue.length;

      for (let i = 0; i < queueLen; i++) {
          const node = queue.pop();

          currentLevel.push(node.val);
          if(node.left) queue.unshift(node.left);
          if(node.right) queue.unshift(node.right);
      }

      levelOrderArry.push(currentLevel);
  }

  return levelOrderArry;
};