package main

import (
	"log"
	"sync"
)

func main() {
	ch := make(chan int)

	close(ch)

	for x := range ch {
		log.Println("unreachable code", x)
	}

	log.Println("end")
}
