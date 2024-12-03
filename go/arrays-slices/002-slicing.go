package main

import "log"

func main() {
	a := [...]string{"a", "b", "c", "d"}
	b := a[2:]

	log.Println(a) // [a b c d]
	log.Println(b) // [c d]

	b[1] = "e"

	log.Println(a) // [a b c e]
	log.Println(b) // [c e]
}
