package main

import (
	"log"
	"unsafe"
)

func main() {
	elemSize := unsafe.Sizeof(int32(0))
	arr := [...]int32{10, 20, 30}

	ptr := unsafe.Pointer(&arr)

	val0 := *(*int32)(unsafe.Add(ptr, 0*elemSize))
	log.Println(val0) // 10

	val1 := *(*int32)(unsafe.Add(ptr, 1*elemSize))
	log.Println(val1) // 20

	// danger zone
	valExceed := *(*int32)(unsafe.Add(ptr, 99))
	log.Println(valExceed) // 256 or smth else

	// danger zone
	valNeg := *(*int32)(unsafe.Add(ptr, -1))
	log.Println(valNeg) // 2631 or smth else
}
