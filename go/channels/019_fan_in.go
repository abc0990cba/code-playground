package main

import "log"

func generator(limit int) <-chan int {
	ch := make(chan int)

	go func() {
		for i := 0; i < limit; i = i + 1 {
			ch <- i
		}
		close(ch)
	}()

	return ch
}

func fanIn(c1, c2 <-chan int) chan int {
	c := make(chan int)

	go func() {
		defer close(c)

		for c1 != nil || c2 != nil {
			select {
			case s, ok := <-c1:
				if !ok {
					c1 = nil
					continue
				}
				c <- s
			case s, ok := <-c2:
				if !ok {
					c2 = nil
					continue
				}
				c <- s
			}
		}
	}()

	return c
}

func fanInMultiple(channels ...<-chan int) chan int {
	c := make(chan int)

	go func() {
		defer close(c)

		for c1 != nil || c2 != nil {
			select {
			case s, ok := <-c1:
				if !ok {
					c1 = nil
					continue
				}
				c <- s
			case s, ok := <-c2:
				if !ok {
					c2 = nil
					continue
				}
				c <- s
			}
		}
	}()

	return c
}

func main() {
	c1 := generator(3)
	c2 := generator(5)

	c3 := fanIn(c1, c2)

	for val := range c3 {
		log.Println(val)
	}
}
