package main

import (
	"log"
	"sync"
	"time"
)

type Semaphore struct {
	ch chan struct{}
}

func NewSemaphore(semaphoreSize int) *Semaphore {
	return &Semaphore{ch: make(chan struct{}, semaphoreSize)}
}

func (s *Semaphore) Acquire() {
	s.ch <- struct{}{}
}

func (s *Semaphore) Release() {
	<-s.ch
}

func main() {
	const MaxGoroutines = 10
	const SemaphoreSize = 3

	semaphore := NewSemaphore(SemaphoreSize)

	var wg sync.WaitGroup
	wg.Add(MaxGoroutines)

	for i := 0; i < MaxGoroutines; i++ {
		go func(i int) {
			defer wg.Done()

			semaphore.Acquire()
			defer semaphore.Release()

			log.Println(i)
			time.Sleep(time.Second)
		}(i)
	}

	wg.Wait()
}
