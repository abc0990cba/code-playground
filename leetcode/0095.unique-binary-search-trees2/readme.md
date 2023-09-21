## 95. Unique Binary Search Trees II

Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.

> Example:
> Input: 3
> Output:
> [
>  [1,null,3,2],
>  [3,2,null,1],
>  [3,1,null,null,2],
>  [2,1,3],
>  [1,null,2,null,3]
> ]

> Example 2:
> Input: n = 1
> Output: [[1]]

Explanation:
The above output corresponds to the 5 unique BST's shown below:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
The meaning of the title: Given a number, find all the binary search trees

## Solution:
Tree can be divided into three parts
Picking ith element in 1…n sequence, the subtree would be

  V       
 / \      L: 1...i-1
L   R     R: i+1...n

Therefore, we need a function that could generate trees that take 2 inputs, start and end.
By recursively calling this subfunction, we can generate different trees.
One thing to notice is that, after the recursive, we should have a root node to catch these different left and right trees.
That is to say, if we have sequence [1,2,3,4,5] and we pick 3 as root.
L would be [1,2], R [4,5].
It’s easy to see that the Left tree could have these two shape.

    1         2                         3          3
   / \       / \        ----->         /          /
null  2     1   null                  1          2
                                     / \        / \
                                  null  2      1   null
  
The right part is the same, so I just draw left part on it.
Finally, push the new tree to the vector and return it to upper recursive.

time: O(catalan(n)), https://en.wikipedia.org/wiki/Catalan_number
space: O(log(n)), tree space is log(n) with total node n