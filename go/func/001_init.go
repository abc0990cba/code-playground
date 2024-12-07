package main

import "log"

func init() {
	log.Println("init 1")
}

var a = func() int {
	log.Println("var")
	return 0
}()

func main() {
	log.Println("main")
}

func init() {
	log.Println("init 2")
}

// var
// init 1
// init 2
// main
