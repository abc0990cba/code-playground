package main

import (
	"fmt"
	"unsafe"
)

type Compact struct {
	a, b                   uint64
	c, d, e, f, g, h, i, j byte
}

type Inefficient struct {
	a uint64
	b byte
	c uint64
	d byte
}

func main() {
	newCompact := new(Compact)
	newInefficient := new(Inefficient)

	fmt.Println(unsafe.Sizeof(*newCompact))     // 24
	fmt.Println(unsafe.Sizeof(*newInefficient)) // 32
}
