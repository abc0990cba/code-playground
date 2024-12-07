package main

import (
	"fmt"
)

func main() {
	a := []string{"a", "b", "c", "d"}
	b := a[1:3]
	b[1] = "y"

	fmt.Printf("%s\n", a) // [a b y d]
}
