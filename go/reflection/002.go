package main

import (
	"log"
	"reflect"
)

func main() {
	var x float64 = 1.2
	v := reflect.ValueOf(x)

	log.Println("Value", v)                                                  // Value 0
	log.Println("Value", reflect.ValueOf(x).String())                        // Value <float64 Value>
	log.Println("Type", v.Type())                                            // Type float64
	log.Println("v.Kind() == reflect.Float64:", v.Kind() == reflect.Float64) // v.Kind() == reflect.Float64: true
	log.Println("value v.Float()", v.Float())                                // value v.Float() 1.2

	var y uint8 = 5
	v = reflect.ValueOf(y)

	log.Println("Value", v)                                              // Value 5
	log.Println("Value", reflect.ValueOf(y).String())                    // Value <uint8 Value>
	log.Println("Type", v.Type())                                        // Type uint8
	log.Println("v.Kind() == reflect.Uint8:", v.Kind() == reflect.Uint8) // Tv.Kind() == reflect.Uint8: true
	log.Println("reflect.TypeOf(v.Uint())", reflect.TypeOf(v.Uint()))    // reflect.TypeOf(v.Uint()) uint64
	y = uint8(v.Uint())                                                  // v.Uint returns a uint64

	type MyInt int
	var c MyInt = 3
	v = reflect.ValueOf(c)
	log.Println("Type", v.Type())          // Type main.MyInt
	log.Println("Type", reflect.TypeOf(c)) // Type main.MyInt
	log.Println("Kind", v.Kind())          // Kind int
}
