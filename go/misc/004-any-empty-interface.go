package main

import (
	"log"
)

func main() {
	var a any
	var b interface{}

	log.Println(a)      // <nil>
	log.Println(b)      // <nil>
	log.Println(a == b) // true

	var c = struct {
		a string
		b int8
	}{
		a: "test",
	}
	log.Println(c) // {test 0}

	a = c
	log.Println(a) // {test 0}

	a = fn
	log.Println(a) // 0x1089a20
}

func fn() {}
