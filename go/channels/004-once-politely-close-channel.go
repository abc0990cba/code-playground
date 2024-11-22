package main

import (
	"sync"
)

// https://go101.org/article/channel-closing.html

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
