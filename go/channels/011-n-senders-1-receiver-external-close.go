package main

import (
	"log"
	"math/rand"
	"sync"
	"time"
)

func main() {
	const ReceiversNum = 100
	const Max = 100
	const ThirdPartyClosersNum = 15

	wg := sync.WaitGroup{}
	wg.Add(ReceiversNum)

	dataCh := make(chan int)
	closingCh := make(chan struct{})
	closedCh := make(chan struct{})

	// https://groups.google.com/g/golang-nuts/c/lEKehHH7kZY/m/Ri2I2o8DAQAJ
	// https://go.dev/play/p/qSWluYy4ifl
	stop := func() {
		select {
		case closingCh <- struct{}{}:
			<-closedCh
		case <-closedCh:
		}
	}

	for i := 0; i < ThirdPartyClosersNum; i++ {
		go func() {
			secs := 1 + rand.Intn(3)
			time.Sleep(time.Duration(secs) * time.Second)
			stop()
		}()
	}

	go func() {
		defer func() {
			close(dataCh)
			close(closedCh)
		}()

		for {

			select {
			case <-closingCh:
				return
			default:
			}

			select {
			case <-closingCh:
				return
			default:
				dataCh <- rand.Intn(Max)
			}
		}
	}()

	for i := 0; i < ReceiversNum; i++ {
		go func() {
			defer wg.Done()

			for val := range dataCh {
				log.Println(val)
			}
		}()
	}

	wg.Wait()
}
