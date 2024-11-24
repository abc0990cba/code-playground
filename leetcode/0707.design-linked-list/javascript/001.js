class ListNode {
  constructor(val, next) {
    this.val = val == undefined ? 0 : val;
    this.next = next == undefined ? null : next;
  }
}

var MyLinkedList = function() {
    this.head = null;
};

MyLinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.getLength()) return -1;
    let cur = this.head;
    for (let i = 0; i < index; i++) {
        cur = cur.next;
    }
    return cur.val;
};

MyLinkedList.prototype.addAtHead = function(val) {
    let node = new ListNode(val);
    node.next = this.head;
    this.head = node;
};

MyLinkedList.prototype.addAtTail = function(val) {
    if (this.head == null) {
        this.addAtHead(val);
        return;
    }
    let node = new ListNode(val);
    let cur = this.head;
    while (cur.next !== null) {
        cur = cur.next;
    }
    cur.next = node;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index === 0) {
        this.addAtHead(val);
        return;
    }
    if (index === this.getLength()) {
        this.addAtTail(val);
        return;
    }
    if (index > this.getLength()) return;
        
    let cur = this.head;
    let node = new ListNode(val);
    for (let i = 0; i < index-1; i++) {
        cur = cur.next;
    }
    let next = cur.next;
    cur.next = node;
    node.next = next;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || index >= this.getLength()) return;
    if (index == 0) {
        this.head = this.head.next;
        return;
    }

    let cur = this.head;
    for (let i = 0; i < index-1; i++) {
        cur = cur.next;
    }
    cur.next = cur.next.next;
};

MyLinkedList.prototype.getLength = function() {
    let len = 0, cur = this.head;
    while (cur !== null) {
        cur = cur.next;
        len++;
    }
    return len;
};
