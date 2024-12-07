package main

import (
	"log"
	"unsafe"
)

func main() {
	a := []int{}
	log.Println(a, a == nil) // [] false

	var b []int
	log.Println(b, b == nil) // [] true

	c := [1]int{}
	d := [...]int{0}
	log.Println(c, d, c == d) // [0] [0] true

	e := [0]int{}
	log.Println(e) // []

	var f [0]int
	log.Println(f, unsafe.Sizeof(f)) // [] 0
}
