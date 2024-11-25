package main

import (
	"log"
	"os"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	const n = 5

	// log: 0 to n but unordered
	// example: 2 4 0 3 1
	wg.Add(n)
	for i := 0; i < n; i++ {
		go func(a int) {
			log.Println(a)
			wg.Done()
		}(i)
	}
	wg.Wait()

	// log: most equal n
	// example: 5 4 5 5 5
	wg.Add(n)
	for i := 0; i < n; i++ {
		go func() {
			defer wg.Done()
			log.Println(i)
		}()
	}
	wg.Wait()

	// log: could log some values before exit after syscall
	// example: 4 5 exit status 1
	wg.Add(n)
	for i := 0; i < n; i++ {
		go func() {
			log.Println(i)
			defer log.Println("before exit") // not called
			os.Exit(1)
			defer log.Println("after exit") // not called
			defer wg.Done()                 // not called
		}()
	}
	wg.Wait()
}
