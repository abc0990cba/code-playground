package main

// https://go101.org/blog/2024-03-01-for-loop-semantic-changes-in-go-1.22.html

func main() {
	c, out := make(chan int), make(chan int)

	m := map[int]int{1: 2, 3: 4}
	for i, v := range m {
		go func() {
			<-c
			out <- i + v
		}()
	}

	close(c)

	println(<-out + <-out)
	// < go1.22 -> 14
	// >= go1.22 -> 10
}
