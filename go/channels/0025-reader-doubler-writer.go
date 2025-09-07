package main

import (
	"fmt"
	"time"
)

func writer() <-chan int {
    ch := make(chan int)
    
    go func() {
        for i := range 10 {
            ch <- i + 1
        }
        close(ch)
    }()
    
    
    return ch
}

func doubler(in <-chan int) <-chan int {
	out := make(chan int)

	go func() {
			for i := range(in) {
				time.Sleep(time.Second)
					out <- 2 * i
			}
			close(out)
	}()
	
	return out
}

func reader(in <-chan int)  {
	for i := range(in) {
		fmt.Println(i)
	}
}

func main() {
  reader(doubler(writer()))
}