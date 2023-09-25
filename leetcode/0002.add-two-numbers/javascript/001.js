/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 *
 * const l10 = new ListNode(2)
 * const l11 = new ListNode(4)
 * const l12 = new ListNode(3)

 * l10.next = l11;
 * l11.next = l12;

 * const l20 = new ListNode(5)
 * const l21 = new ListNode(6)
 * const l22 = new ListNode(4)

 * l20.next = l21;
 * l21.next = l22;
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  const head = new ListNode(0);
  let carry = 0;
  let sum = 0;
  let now = head;
  let a = l1;
  let b = l2;

  while (a !== null || b !== null) {
    sum = (a ? a.val : 0) + (b ? b.val : 0) + carry;
    carry = Math.floor(sum / 10);
    now.next = new ListNode(sum % 10);
    now = now.next;
    a = a ? a.next : null;
    b = b ? b.next : null;
  }

  if (carry) now.next = new ListNode(carry);

  return head.next;
};

// Time complexity : O(max(m,n)).
// Space complexity : O(max(m,n)).