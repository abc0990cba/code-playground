/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
  let prev = null;
  let cur = head;

  while(cur) {
    let tmp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = tmp;
  }

  return prev;
};

// Time: O(n)
// Space O(1)