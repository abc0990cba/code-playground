package main

import (
	"log"
	"sync"
	"sync/atomic"
)

func main() {
	const count = 4000

	// without atomics
	counter := 0
	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			defer wg.Done()
			counter++
		}()
	}
	wg.Wait()

	// may differ time to time, for example: 3356
	log.Println("no atomics counter", counter)

	// with atomics
	var counterAtomic atomic.Int64
	wg = sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			defer wg.Done()
			counterAtomic.Add(1)
		}()
	}
	wg.Wait()

	// always equal count = 4000
	log.Println("with atomics counter", counterAtomic.Load())
}
