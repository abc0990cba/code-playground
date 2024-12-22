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

	mFloatInt := map[float32]int{
		1.0: 1,
		2.0: 2,
	}
	keys3 := getKeys(mFloatInt) // float32 does not satisfy customType
	log.Println(keys3)
}

type customType interface {
	~int | ~string
}

func getKeys[K customType, V any](m map[K]V) []K {
	var keys []K

	for k := range m {
		keys = append(keys, k)
	}

	return keys
}
