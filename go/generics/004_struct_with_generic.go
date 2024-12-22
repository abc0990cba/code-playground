package main

import "log"

type Node[T any] struct {
	Val  T
	next *Node[T]
}

func (n *Node[T]) Add(next *Node[T]) {
	n.next = next
}

func main() {
	head := &Node[int]{99, nil}

	log.Println(head) // &{99 <nil>}

	head.Add(&Node[int]{100, nil})

	log.Println(head.next.Val) // 100
}
