package main

import (
	"log"
)

func main() {
	mStringInt := map[string]int{
		"one": 1,
		"two": 2,
	}
	keys1 := getKeys(mStringInt)
	log.Println(keys1) // [one two] or [two one]

	mIntBool := map[int]bool{
		1: true,
		2: false,
	}
	keys2 := getKeys(mIntBool)
	log.Println(keys2) // [1 2] or [2 1]

	mIntInt := map[int]int{
		10: 1,
		20: 2,
	}
	keys3 := getKeys(mIntInt) // [20 10] or [10 20]
	log.Println(keys3)
}

func getKeys[K comparable, V any](m map[K]V) []K {
	var keys []K

	for k := range m {
		keys = append(keys, k)
	}

	return keys
}
