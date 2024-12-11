/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = function(list1, list2) {
  const zeroNode = { val:0, next: null };
  let res = zeroNode;

  while(list1 && list2){
    if(list1.val > list2.val) {
      res.next = list2;
      list2 = list2.next;
    } else {
      res.next = list1;
      list1 = list1.next;
    }

    res = res.next;
  }

  res.next = list1 ? list1 : list2;

  return zeroNode.next;
};