package main

import (
	"fmt"
	"sync"
)

// httpsx://www.leolara.me/blog/closing_a_go_channel_written_by_several_goroutines/

type MyChannel struct {
	ch     chan int
	closed bool
	mutex  sync.Mutex
}

func NewMyChannel() *MyChannel {
	return &MyChannel{ch: make(chan int)}
}

func (mc *MyChannel) SafeClose() {
	mc.mutex.Lock()
	defer mc.mutex.Unlock()

	if !mc.closed {
		close(mc.ch)
		mc.closed = true
	}
}

func (mc *MyChannel) IsClosed() bool {
	mc.mutex.Lock()
	defer mc.mutex.Unlock()

	return mc.closed
}

func main() {
	ch := NewMyChannel()

	// double close cause panic
	// close(ch.ch)
	// close(ch.ch)

	fmt.Println(ch.closed)
	ch.SafeClose()
	ch.SafeClose()
	fmt.Println(ch.closed)
}
