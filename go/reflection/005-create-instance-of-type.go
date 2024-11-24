package main

import (
	"fmt"
	"reflect"
)

type Person struct {
	Name string
	Age  int
}

func CreateInstanceOfType(t reflect.Type) interface{} {
	return reflect.New(t).Elem().Interface()
}

func main() {
	personType := reflect.TypeOf(Person{})
	person := CreateInstanceOfType(personType).(Person)

	fmt.Printf("instance %+v\n", person) // instance {Name: Age:0}
}
