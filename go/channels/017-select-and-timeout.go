package main

import (
	"log"
	"time"
)

func main() {
	ch := make(chan string)

	go func() {
		time.Sleep(time.Second * 5)
		ch <- "Job 1 complete"
	}()

	select {
	case val := <-ch:
		log.Println(val)
	case <-time.After(time.Second * 3):
		log.Println("Timeout")
		return
	}
}
