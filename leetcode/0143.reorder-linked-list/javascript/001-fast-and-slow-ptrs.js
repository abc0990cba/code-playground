/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
const reorderList = function(head) {
  let slow = head;
  let fast = head.next;
  
  // move slow ptr to center and fast ptr to end
  while(fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse order of second half of list
  let second = slow.next;
  let prev = null;
  slow.next = null;

  while(second !== null) {
    const tmp = second.next;
    second.next = prev;
    prev = second;
    second = tmp;
  }

  // merge first part and reversed second
  let first = head;
  second = prev;

  while(second !== null) {
    const firstTmp = first.next;
    const secondTmp = second.next;
    first.next = second;
    second.next = firstTmp;
    first = firstTmp;
    second = secondTmp;
  }
};

// Time: O(n)
// Space: O(1)