package main

import "log"

func evenGenerator(limit int) <-chan int {
	ch := make(chan int)

	go func() {
		for i := 0; i < limit; i = i + 2 {
			ch <- i
		}
		close(ch)
	}()

	return ch
}

func main() {
	const Max = 100

	for val := range evenGenerator(Max) {
		log.Println(val)
	}
}
