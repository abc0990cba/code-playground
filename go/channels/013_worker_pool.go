package main

import (
	"log"
	"sync"
	"time"
)

func worker(id int, wg *sync.WaitGroup, jobs <-chan int, results chan<- int) {
	defer wg.Done()
	for i := range jobs {
		time.Sleep(time.Second)
		results <- i * i
		log.Println("job for worker#%d done with job=%d", id, i)
	}
}

func main() {
	const WorkersNum = 3
	const JobsNum = 10
  
	wg := sync.WaitGroup{}

	jobs := make(chan int, JobsNum)
	results := make(chan int, JobsNum)

	wg.Add(WorkersNum)
	for i := 0; i < WorkersNum; i++ {
		go worker(i, &wg, jobs, results)
	}

	for i := 0; i < JobsNum; i++ {
		jobs <- i
	}
	close(jobs)

	wg.Wait()
	close(results)

	for res := range results {
		log.Printf("result=%d\n", res)
	}
}
