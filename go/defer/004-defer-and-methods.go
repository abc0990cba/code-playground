package main

import (
	"fmt"
)

type Component struct {
	val int
}

func (c Component) method() {
	fmt.Println(c.val)
}

func (c *Component) method2() {
	fmt.Println(c.val)
}

func main() {
	c := Component{}
	defer c.method()
	defer c.method2()
	c.val = 2

	// 2 0
}
