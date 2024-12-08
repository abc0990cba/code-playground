package main

import "fmt"

type Object struct {
	Name string
}

func changeName(obj *Object) {
	obj = &Object{
		Name: "2",
	}
}

func changeName2(obj *Object) {
	*obj = Object{
		Name: "2",
	}
}

func main() {
	obj := &Object{
		Name: "1",
	}
	fmt.Println(obj.Name) // 1

	changeName(obj)
	fmt.Println(obj.Name) // 1

	changeName2(obj)
	fmt.Println(obj.Name) // 2
}
