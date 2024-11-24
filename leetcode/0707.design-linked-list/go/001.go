type Node struct {
        Val  int
        Next *Node
}

type MyLinkedList struct {
        head   *Node
        length int
}

func Constructor() MyLinkedList {
        return MyLinkedList{}
}

func (this *MyLinkedList) Get(index int) int {

        if index < 0 || index > this.length-1 {
                return -1
        }

        cur := this.head
        for i := 0; i < index && cur != nil; i++ {
                cur = cur.Next
        }

        if cur == nil {
                return -1
        }

        return cur.Val
}

func (this *MyLinkedList) AddAtHead(val int) {
        var newNode Node
        newNode.Val = val
        newNode.Next = this.head
        this.head = &newNode

        this.length++
}

func (this *MyLinkedList) AddAtTail(val int) {
        if this.head == nil {
                this.AddAtHead(val)
                return
        }

        cur := this.head
        for i := 0; cur.Next != nil; i++ {
                cur = cur.Next
        }

        var newNode Node
        newNode.Val = val
        cur.Next = &newNode

        this.length++
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
        if index == 0 {
                this.AddAtHead(val)
                return
        } else if index == this.length {
                this.AddAtTail(val)
                return
        } else if index < 0 || index > this.length {
                return
        }

        cur := this.head
        for i := 0; i < index-1; i++ {
                cur = cur.Next
        }

        var newNode Node
        newNode.Val = val
        newNode.Next = cur.Next
        cur.Next = &newNode

        this.length++

}

func (this *MyLinkedList) DeleteAtIndex(index int) {
        if index < 0 || index >= this.length {
                return
        } else if index == 0 {
                this.head = this.head.Next
                this.length--
                return
        }

        cur := this.head
        for i := 0; i < index-1; i++ {
                cur = cur.Next
        }

        cur.Next = cur.Next.Next
        this.length--

}


/**
 * Your MyLinkedList object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Get(index);
 * obj.AddAtHead(val);
 * obj.AddAtTail(val);
 * obj.AddAtIndex(index,val);
 * obj.DeleteAtIndex(index);
 */
