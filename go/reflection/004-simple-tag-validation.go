package main

import (
	"fmt"
	"reflect"
	"strings"
)

type Person struct {
	Name string `validate:"required"`
	Age  int    `validate:"min=0"`
}

func ValidateStruct(st interface{}) error {
	val := reflect.ValueOf(st)
	typ := reflect.TypeOf(st)

	if val.Kind() != reflect.Struct {
		return fmt.Errorf("expected struct but got %s", val.Kind())
	}

	for i := 0; i < val.NumField(); i++ {
		fieldVal := val.Field(i)
		fieldType := typ.Field(i)

		tag := fieldType.Tag.Get("validate")

		if strings.Contains(tag, "required") && fieldVal.IsZero() {
			return fmt.Errorf("field %s is required", fieldType.Name)
		}

		if strings.Contains(tag, "min=0") && fieldVal.Kind() == reflect.Int && fieldVal.Int() < 0 {
			return fmt.Errorf("field %s must be positive", fieldType.Name)
		}
	}

	return nil
}

func main() {
	alice := Person{
		Name: "Alice",
		Age:  22,
	}

	err := ValidateStruct(alice)

	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Alice passed validation")
	}

	bob := Person{
		Name: "Bob",
		Age:  -22,
	}

	err = ValidateStruct(bob)

	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Bob passed validation")
	}
}
