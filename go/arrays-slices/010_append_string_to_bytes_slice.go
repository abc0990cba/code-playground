package main

import (
	"fmt"
)

func main() {
	var buf []byte
	buf = append(buf, 'a', 'b')
	buf = append(buf, "cd"...)
	fmt.Println(buf) // [97 98 99 100]
}
