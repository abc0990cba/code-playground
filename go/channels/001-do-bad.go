package main

func main() {
	// 1 - close nil channel cause panic
	// c1 := make(chan int)
	// c1 = nil
	// close(c1)

	// 2 - close closed channel cause panic
	// c2 := make(chan int)
	// close(c2)
	// close(c2)

	// 3 - sending on closed channel cause panic
	// c3 := make(chan int)
	// close(c3)
	// c3 <- 3

	// 4 - sending to a nil channel cause deadlock
	// c4 := make(chan int)
	// c4 = nil
	// c4 <- 4
}
