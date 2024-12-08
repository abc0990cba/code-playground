package main

import (
	"fmt"
	"unsafe"
)

type A struct {
	a bool
	b int64
	c [6]byte
}

type B struct {
	b int64
	a bool
	c [6]byte
}

func main() {
	fmt.Println(unsafe.Sizeof(A{})) // 24
	fmt.Println(unsafe.Sizeof(B{})) // 16
}
