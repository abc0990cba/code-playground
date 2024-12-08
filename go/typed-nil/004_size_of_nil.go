package main

import (
	"log"
	"unsafe"
)

func main() {
	var a *struct{} = nil
	log.Println(unsafe.Sizeof(a)) // 8

	var b []int = nil
	log.Println(unsafe.Sizeof(b)) // 24

	var c map[int]bool = nil
	log.Println(unsafe.Sizeof(c)) // 8

	var d chan string = nil
	log.Println(unsafe.Sizeof(d)) // 8

	var e func() = nil
	log.Println(unsafe.Sizeof(e)) // 8

	var f interface{} = nil
	log.Println(unsafe.Sizeof(f)) // 16
}
