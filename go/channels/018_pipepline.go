package main

import (
	"fmt"
)

func mulBy2(in <-chan int) chan int {
	out := make(chan int)

	go func() {
		for val := range in {
			out <- val * 2
		}

		close(out)
	}()

	return out
}

func add3(in <-chan int) chan int {
	out := make(chan int)

	go func() {
		for val := range in {
			out <- val + 3
		}

		close(out)
	}()

	return out
}

func main() {
	c0 := make(chan int)

	c1 := mulBy2(c0)
	c2 := add3(c1)

	go func() {
		arr := [...]int{1, 2, 3}

		for val := range arr {
			c0 <- val
		}

		close(c0)
	}()

	for res := range c2 {
		fmt.Println(res) // 3 5 7
	}
}
