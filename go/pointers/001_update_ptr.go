package main

import (
	"fmt"
)

func updatePtr(p *int) {
	v := 2
	p = &v
}

func updatePtr2(p *int) {
	v := 2
	*p = v
}

func main() {
	v := 1
	p := &v

	fmt.Println(*p) // 1

	updatePtr(p)
	fmt.Println(*p) // 1

	updatePtr2(p)
	fmt.Println(*p) // 2
}
