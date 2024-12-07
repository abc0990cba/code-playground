package main

import (
	"fmt"
)

func main() {
	var a, b []int
	a = append(a, 1, 2, 3)
	b = a[:1]
	b = append(b, 4)
	fmt.Printf("a=%v b=%v\n", a, b) // a=[1 4 3] b=[1 4]

	var c, d []int
	c = append(c, 1, 2, 3)
	d = c[:1:1]
	d = append(d, 4)
	fmt.Printf("c=%v d=%v\n", c, d) // c=[1 2 3] d=[1 4]
}
