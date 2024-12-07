package main

import "log"

func c() (i int) {
	defer func() { i++ }()
	return 1
}

func main() {
	log.Println(c()) // 2
}
