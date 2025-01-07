package main

import (
	"log"
	"sync"
	"time"
)

func main() {
	const MaxGoroutines = 10
	const SemaphoreSize = 3

	semaphore := make(chan struct{}, SemaphoreSize)

	var wg sync.WaitGroup
	wg.Add(MaxGoroutines)

	for i := 0; i < MaxGoroutines; i++ {
		go func(i int) {
			defer wg.Done()
			semaphore <- struct{}{}

			log.Println(i)
			time.Sleep(time.Second)

			<-semaphore
		}(i)
	}

	wg.Wait()
}
