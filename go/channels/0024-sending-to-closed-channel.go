package main

import (
	"fmt"
	"sync"
	"time"
)

func writerBroken() <- chan int {
    ch := make(chan int)
    
    go func() {
        for i := range(5) {
            ch <- i + 1
        }
        close(ch)
    }()
    
    go func() {
        for i := range(5) {
            ch <- i + 11
        }
        close(ch)
    }()
    
    return ch
}

func writerFixed() <- chan int {
	ch := make(chan int)
	wg := &sync.WaitGroup{}
	
	wg.Add(2)

	go func() {
			defer wg.Done()

			for i := range 5 {
					ch <- i + 1
			}
	}()
	
	go func() {
		  defer wg.Done()

			for i := range 5 {
					ch <- i + 11
			}
	}()

	go func() {
		wg.Wait()
		close(ch)
	}()
	
	return ch
}

func main() {
  // ch := writerBroken()
	ch := writerFixed()
  
  for {
      i, ok := <- ch
      if !ok {
          break;
      }
      
      fmt.Println(i)
  }

	// Better version
	// for i := range ch {		
	// 	fmt.Println(i)
	// }
  
	// Cause race condition for broken case
  time.Sleep(time.Second)
    
	// BROKEN
	// for ch := writerBroken()
	// 11
	// 12
	// 13
	// 14
	// 1
	// 2
	// 3
	// 4
	// 5
	// panic: send on closed channel
	
	// goroutine 19 [running]:
	// main.writer.func2()
	// 	/tmp/bqTlL6IF4B/main.go:22 +0x33
	// created by main.writer in goroutine 1
	// 	/tmp/bqTlL6IF4B/main.go:20 +0xa5
	// exit status 2


	// FIXED
	// ch := writerFixed()
	// 1
	// 2
	// 3
	// 4
	// 5
	// 11
	// 12
	// 13
	// 14
	// 15
}