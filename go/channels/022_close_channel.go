package main

import (
	"log"
)

func main() {
	const bufferSize = 5
	jobs := make(chan int, bufferSize)
	done := make(chan bool)

	go func() {
		for {
			i, ok := <-jobs

			if ok {
				log.Println("Job received", i)
			} else {
				log.Println("Jobs channel closed")
				done <- true
				return
			}
		}
	}()

	const jobsCount = 3
	for i := 0; i < jobsCount; i++ {
		log.Println("Job sent", i)
		jobs <- i
	}
	close(jobs)

	d := <-done

	log.Println("done:", d)
}

// Job sent 0
// Job sent 1
// Job sent 2
// Job received 0
// Job received 1
// Job received 2
// Jobs channel closed
// done: true
