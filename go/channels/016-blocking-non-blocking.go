package main

import (
	"log"
)

func main() {
	ch := make(chan int)

	go func() {
		ch <- 5
	}()

	// non blocking
	select {
	case val := <-ch:
		log.Printf("Get data=%d from channel\n", val)
	default:
		log.Println("default")
	}
	// Output: default

  ch2 := make(chan int)
	go func() {
		ch2 <- 10
	}()

	// blocking
	val2 := <-ch2
	log.Printf("Get data=%d from channel\n", val2)
	// Output: Get data=10 from channel
}
