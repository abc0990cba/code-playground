package main

import (
	"log"
	"reflect"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	bob := Person{
		Name: "Bob",
		Age:  34,
	}

	bobType := reflect.TypeOf(bob)
	log.Println("Type:", bobType.Name())

	bobVal := reflect.ValueOf(bob)
	log.Println("Value:", bobVal)

	numFields := bobVal.NumField()
	log.Println("Num fields:", numFields)

	for i := 0; i < numFields; i++ {
		log.Println("field ", i, ": ", bobVal.Field(i))
	}
}
