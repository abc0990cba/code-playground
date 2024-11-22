package main

import (
	"log"
	"math/rand"
	"sync"
)

func main() {
	const SendersNum = 100
	const Max = 100
	const StopVal = 50

	wg := sync.WaitGroup{}
	wg.Add(1)

	dataCh := make(chan int)
	stopCh := make(chan struct{})

	for i := 0; i < SendersNum; i++ {
		go func() {
			for {
				select {
				case <-stopCh:
					return
				default:
				}

				select {
				case <-stopCh:
					return
				default:
					dataCh <- rand.Intn(Max)
				}
			}
		}()
	}

	go func() {
		defer wg.Done()

		for val := range dataCh {
			if val == StopVal {
				close(stopCh)
				log.Println("stop val", val)
				return
			}
			log.Println(val)
		}
	}()

	wg.Wait()
}
