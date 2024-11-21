package main

import "fmt"

// https://go101.org/article/channel-closing.html

func IsClosedChan(c <-chan int) bool {
	select {
	case <-c:
		return true
	default:
	}
	return false
}

func main() {
	c := make(chan int)
	fmt.Println(IsClosedChan(c)) // false

	close(c)
	fmt.Println(IsClosedChan(c)) // true

	c = nil
	fmt.Println(IsClosedChan(c)) // false
}
