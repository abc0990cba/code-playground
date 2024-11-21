package main

import (
	"fmt"
	"sync"
)

func RudeSafeClose(c chan int) (justClosed bool) {
	defer func() {
		if recover() != nil {
			justClosed = false
		}
	}()

	// Simulate double close
	close(c)

	close(c)
	return true
}

func main() {
	ch := make(chan int)

	justClosed := RudeSafeClose(ch)
  
	fmt.Println(justClosed) //false
}
