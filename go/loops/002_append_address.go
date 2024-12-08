package main

import (
	"fmt"
)

func main() {
	numbers := []*int{}

	for i := 0; i < 5; i++ {
		numbers = append(numbers, &i)
	}

	for _, number := range numbers {
		fmt.Printf("%d ", *number)
	}

	// 5 5 5 5 5
}
