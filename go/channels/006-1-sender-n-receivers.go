package main

import (
	"log"
	"math/rand"
	"sync"
)

func main() {
	const ReceiversNum = 100
	const Max = 100

	wg := sync.WaitGroup{}
	wg.Add(ReceiversNum)

	ch := make(chan int)

	go func() {
		for {
			if val := rand.Intn(Max); val == 0 {
				log.Println("finish", val)
				close(ch)
				return
			} else {
				ch <- val
			}
		}
	}()

	for i := 0; i < ReceiversNum; i++ {
		go func() {
			defer wg.Done()
			for val := range ch {
				log.Println(val)
			}
		}()
	}

	wg.Wait()
}
