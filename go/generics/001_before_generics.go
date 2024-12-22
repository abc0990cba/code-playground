package main

import (
	"fmt"
	"log"
)

func main() {
	mStringInt := map[string]int{
		"one": 1,
		"two": 2,
	}

	keys0 := getKeys0(mStringInt)
	log.Println(keys0) // [one two]

	keys1, err := getKeys1(mStringInt)
	if err != nil {
		log.Println(err)
	} else {
		log.Println(keys1) // [one two]
	}

	mIntBool := map[int]bool{
		1: true,
		2: false,
	}
	keys1, err = getKeys1(mIntBool)
	if err != nil {
		log.Println(err)
	} else {
		log.Println(keys1) // [1 2]
	}

	mIntInt := map[int]int{
		1: 1,
		2: 2,
	}
	keys1, err = getKeys1(mIntInt)
	if err != nil {
		log.Println(err) // This type is not implemented
	} else {
		log.Println(keys1)
	}

}

func getKeys0(m map[string]int) []string {
	var keys []string

	for k := range m {
		keys = append(keys, k)
	}

	return keys
}

func getKeys1(m any) ([]any, error) {

	switch mt := m.(type) {
	default:
		return nil, fmt.Errorf("This type is not implemented")
	case map[string]int:
		var keys []any
		for k := range mt {
			keys = append(keys, k)
		}
		return keys, nil
	case map[int]bool:
		var keys []any
		for k := range mt {
			keys = append(keys, k)
		}
		return keys, nil
	}
}
