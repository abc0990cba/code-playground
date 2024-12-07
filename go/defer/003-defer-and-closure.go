package main

import "fmt"

func main() {
	var whatever [5]struct{}

	for i := range whatever {
		fmt.Println(i)
	}

	for i := range whatever {
		defer func() { fmt.Println(i) }()
	}

	for i := range whatever {
		defer func(n int) { fmt.Println(n) }(i)
	}

	// 0 1 2 3 4 from 1st part
	// 4 3 2 1 0 from 3rd part
	// 4 4 4 4 4 from 2nd part
}
