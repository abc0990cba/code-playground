/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function(head, n) {
  const zeroNode = { val: null, next: head };
  let first = zeroNode;
  let second = head;

  // make shift between pointers
  while(n > 0) {
    second = second.next;
    n--;
  }

  // move 2nd ptr to end
  while(second !== null) {
    first = first.next;
    second = second.next; 
  }

  first.next = first.next.next;

  return zeroNode.next;
};