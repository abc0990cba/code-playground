package main

import "log"

func change1(a []int) {
	for i := range a {
		a[i] = 0
	}
	log.Println(a)
}

func change2(a []int) {
	a = append(a, 4)
	for i := range a {
		a[i] = 0
	}
	log.Println(a)
}

func main() {
	log.Println("case 1")
	x := []int{1, 2, 3}
	log.Println(x) // [1 2 3]
	change1(x)     // [0 0 0]
	log.Println(x) // [0 0 0]

	log.Println("case 2")
	x = []int{1, 2, 3}
	log.Println(x) // [1 2 3]
	change2(x)     // [0 0 0 0]
	log.Println(x) // [1 2 3]

	log.Println("case 3")
	x = []int{1, 2, 3}
	log.Println(x) // [1 2 3]
	change2(x)     // [0 0 0 0]
	x = append(x, 5)
	log.Println(x) // [1 2 3 5]

	log.Println("case 4")
	x = []int{1, 2, 3}
	log.Println(x) // [1 2 3]
	x = append(x, 5)
	change2(x)     // [0 0 0 0 0]
	log.Println(x) // [0 0 0 0]

	log.Println("case 5")
	x = []int{1, 2, 3}
	log.Println(x) // [1 2 3]
	x = append(x, 5)
	log.Println(cap(x)) // 6
	x = append(x, 6, 7, 8)
	log.Println(cap(x)) // 12
	change2(x)          // [0 0 0 0 0]
	log.Println(x)      // [0 0 0 0]
}
