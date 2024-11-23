package main

import (
	"log"
	"math/rand"
	"strconv"
	"sync"
)

func main() {
	const SendersNum = 500
	const ReceiversNum = 100
	const Max = 100
	const SenderStopVal = 50
	const ReceiverStopVal = 0

	wg := sync.WaitGroup{}
	wg.Add(ReceiversNum)

	dataCh := make(chan int)
	stopCh := make(chan struct{})
	toStopCh := make(chan string, SendersNum+ReceiversNum)

	var stoppedBy string

	go func() {
		stoppedBy = <-toStopCh
		close(stopCh)
	}()

	for i := 0; i < SendersNum; i++ {
		go func(id string) {
			for {
				val := rand.Intn(Max)

				if val == SenderStopVal {
					toStopCh <- "sender#" + id
					log.Println("stop val", val)

					return
				}

				select {
				case <-stopCh:
					return
				default:
				}

				select {
				case <-stopCh:
					return
				default:
					dataCh <- val
				}
			}
		}(strconv.Itoa(i))
	}

	for i := 0; i < ReceiversNum; i++ {
		go func(id string) {
			defer wg.Done()

			for {
				select {
				case <-stopCh:
					return
				default:
				}

				select {
				case <-stopCh:
					return
				case val := <-dataCh:
					if val == ReceiverStopVal {
						toStopCh <- "receiver#" + id
						log.Println("stop val", val)

						return
					}
					log.Println(val)
				}

			}
		}(strconv.Itoa(i))
	}

	wg.Wait()
	log.Println("stopped by: ", stoppedBy)
}
