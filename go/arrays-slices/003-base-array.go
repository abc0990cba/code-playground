package main

import (
	"log"
	"unsafe"
)

func main() {
	var arr1 [5]int
	log.Println(arr1) // [0 0 0 0 0]

	var arr2 [2][3]int
	log.Println(arr2) // [[0 0 0] [0 0 0]]

	var arr3 = [...]int{1, 2, 3}
	log.Println(arr3) // [1 2 3]

	arr4 := [5]int{1, 2, 3}
	log.Println(arr4) // [1 2 3 0 0]

	arr5 := [5]int{2: 9, 2, 3}
	log.Println(arr5) // [0 0 9 2 3]

	arr6 := [5]int{}
	log.Println(arr6) // [0 0 0 0 0]

	idx := 100
	log.Println(arr5[idx]) // panic

	one := [...]int{1, 2, 3}
	two := [...]int{1, 2, 3}
	three := [...]int{4, 5, 6}
	four := [...]float32{1, 2, 3}

	log.Println(one == two)   // true
	log.Println(one == three) // false
	log.Println(one == four)  // invalid operation

	arr7 := [0]int{}
	log.Println(arr7)                // []
	log.Println(unsafe.Sizeof(arr7)) // 0
}
