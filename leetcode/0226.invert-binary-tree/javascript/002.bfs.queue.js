/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const tree = {
  left: {
    left: {
      value: 1
    },
    right: {
      value: 3
    },
    value: 2
  },
  right: {
    left: {
      value: 6
    },
    right: {
      value: 9
    },
    value: 7
  },
  value: 4
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
 if (!root) return null
 
 const queue = [root];

 while(queue.length) {
  const node = queue.shift();

  [node.right, node.left] = [node.left,node.right];

  if(node.left !== null) queue.push(node.left);
  if(node.right !== null) queue.push(node.right);
 }

 return root    
};

// Original Tree
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// console.log('orignial binary tree: ', tree);

// Inverted Tree
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1
// console.log('inverted binary tree: ', invertTree(tree));
