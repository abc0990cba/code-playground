// 5 kyu
// Fun with trees: array to tree
// https://www.codewars.com/kata/fun-with-trees-array-to-tree/

// Task description
// You are given a non-null array of integers. Implement the method arrayToTree which creates a binary tree
// from its values in accordance to their order, while creating nodes by depth from left to right.
// For example, given the array [17, 0, -4, 3, 15] you should create the following tree:
//     17
//    /  \
//   0   -4
//  / \
// 3   15 
// The class TreeNode is available for you:
// var TreeNode = function(value, left, right) {
//   this.value = value;
//   this.left = left;
//   this.right = right;
// };
// This kata is part of fun with trees series:
// Fun with trees: max sum
// Fun with trees: array to tree
// Fun with trees: is perfect

function arrayToTree(array, i = 0) {
  if (i >= array.length) return;
  return (
    new TreeNode(array[i],
                 arrayToTree(array, 2 * i + 1),
                 arrayToTree(array, 2 * i + 2));
  )
}

