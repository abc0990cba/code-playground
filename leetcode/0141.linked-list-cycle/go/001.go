/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
// Use fast, slow pointers to determine whether there's a cycle in the linked list.
// Fast pointer moves 2 steps a time, slow pointer moves 1 step a time.
// If fast pointer catch up slow pointer, then there's a cycle in the linked list.
func hasCycle(head *ListNode) bool {
    if head == nil {
        return false
    }

    slow := head.Next
    if slow == nil {
        return false
    }

    fast := slow.Next

    for fast != nil && slow != nil {
        if fast == slow {
            return true
        }

        slow = slow.Next
        
        fast = fast.Next
        if fast != nil {
            fast = fast.Next
        }
    }

    return false
}
