package main

import (
	"fmt"
)

func main() {
	a := []int{1, 2, 3, 4, 5}
	b := []*int{}
	for _, i := range a {
		b = append(b, &i)
	}
	for _, j := range b {
		fmt.Printf("%d ", *j)
	}
	// 5 5 5 5 5
}
