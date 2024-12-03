package main

import (
	"log"
	"unsafe"
)

// TODO: Need more detailed sorting out

//go:noinline
func allocate(idx int) byte {
	var arr [10 << 20]byte
	return arr[idx]
}

func main() {
	var arr [10]int

	a := &arr
	b := unsafe.Pointer(&arr)
	c := (uintptr)(unsafe.Pointer(&arr))

	log.Println(a) // &[0 0 0 0 0 0 0 0 0 0]
	log.Println(b) // 0xc0000b2000
	log.Println(c) // 824634449920

	allocate(1000)

	a = &arr
	b = unsafe.Pointer(&arr)
	c = (uintptr)(unsafe.Pointer(&arr))

	log.Println(a) // &[0 0 0 0 0 0 0 0 0 0]
	log.Println(b) // 0xc0000b2000
	log.Println(c) // 824634449920
}
