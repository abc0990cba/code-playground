package main

import (
	"encoding/json"
	"fmt"
	"reflect"
)

type Person struct {
	Name string `json:string`
	Age  int8   `json:number`
}

func MarshalStructToJSON(st interface{}) ([]byte, error) {
	val := reflect.ValueOf(st)

	if val.Kind() != reflect.Struct {
		return nil, fmt.Errorf("expected struct but got %s", val.Kind())
	}

	return json.Marshal(st)
}

func main() {
	alice := Person{
		Name: "Alice",
		Age:  22,
	}

	aliceJSON, err := MarshalStructToJSON(alice)

	if err == nil {
		fmt.Println(string(aliceJSON)) // {"Name":"Alice","Age":22}
	} else {
		fmt.Println(err)
	}

	bobJSON, err := MarshalStructToJSON("bob")

	if err == nil {
		fmt.Println(string(bobJSON))
	} else {
		fmt.Println(err) // expected struct but got string
	}
}
