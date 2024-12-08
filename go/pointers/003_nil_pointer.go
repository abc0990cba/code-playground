package main

import (
	"fmt"
)

func main() {
	var p *int

	fmt.Println(p) // <nil>

	fmt.Println(*p) // panic: runtime error: invalid memory address or nil pointer dereference
}
