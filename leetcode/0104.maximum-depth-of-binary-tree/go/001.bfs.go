/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxDepth(root *TreeNode) int {
    depth := 0

    if root == nil {
        return depth
    }

    queue := []*TreeNode{root}

    for len(queue) > 0 {
        levelQueueSize := len(queue)

        for i := 0; i < levelQueueSize; i += 1 {
            node := queue[0]
            queue = queue[1:]

            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }

        depth += 1
    }

    return depth
}
