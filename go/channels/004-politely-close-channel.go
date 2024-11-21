package main

import (
	"sync"
)

// httpsx://www.leolara.me/blog/closing_a_go_channel_written_by_several_goroutines/

type MyChannel struct {
	ch   chan int
	once sync.Once
}

func NewMyChannel() *MyChannel {
	return &MyChannel{ch: make(chan int)}
}

func (mc *MyChannel) SafeClose() {
	mc.once.Do(func() {
		close(mc.ch)
	})
}

func main() {
	ch := NewMyChannel()

	// close(ch.ch)
	// close(ch.ch)

	ch.SafeClose()
	ch.SafeClose()
}
