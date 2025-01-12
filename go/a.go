package main

import (
	"log"
	"reflect"
)

type Person struct {
	Name string
	Age  int
}

func (p Person) PrintName() {
	log.Println(p.Name)
}

func (p *Person) SetAge(age int) {
	p.Age = age
}

type Singer struct {
	Person
	works []string
}

func main() {
	smith := Singer{Person{"John Smith", 29}, []string{"any"}}
	smith.PrintName() // John Smith
	smith.SetAge(56)

	log.Println(smith) // {{John Smith 56} [any]}

	var singer = Singer{}

	t := reflect.TypeOf(singer)
	log.Println(t, "has", t.NumField(), "fields") // main.Singer has 2 fields
	for i := 0; i < t.NumField(); i++ {
		log.Println("field#", i, "equals", t.Field(i))
		// field# 0 equals {Person  main.Person  0 [0] true}
		// field# 1 equals {works main []string  24 [1] false}
	}

	log.Println(t, "has", t.NumMethod(), "methods") // main.Singer has 1 methods
	for i := 0; i < t.NumMethod(); i++ {
		log.Println("method#", i, "equals", t.Method(i))
		// method# 0 equals {PrintName  func(main.Singer) <func(main.Singer) Value> 0}
	}

	pt := reflect.TypeOf(&singer)
	log.Println(t, "has", pt.NumMethod(), "methods") // main.Singer has 2 methods
	for i := 0; i < pt.NumMethod(); i++ {
		log.Println("method#", i, "equals", pt.Method(i))
		// method# 0 equals {PrintName  func(*main.Singer) <func(*main.Singer) Value> 0}
		// method# 1 equals {SetAge  func(*main.Singer, int) <func(*main.Singer, int) Value> 1}
	}
}
