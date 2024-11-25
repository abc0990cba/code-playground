package main

import (
	"log"
	"runtime"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	const n = 5

	runtime.GOMAXPROCS(1)

	// https://habr.com/ru/articles/858490/
	// 4 0 1 2 3
	wg.Add(n)
	for i := 0; i < n; i++ {
		go func(x int) {
			log.Println(x)
			wg.Done()
		}(i)
	}
	wg.Wait()
}
