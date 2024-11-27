package main

import (
	"log"
)

type C chan C

func main() {
	var c = make(C, 1)
	c <- c

	for i := 0; i < 10_000; i++ {
		select {
    // will select random case, because they same
		case <-c:
		case <-c:
			c <- c
		default:
			log.Println(i)
			return
		}
	}
}

// Output:
// It will differ from time to time
// 1 or 2 or 3 or ...
