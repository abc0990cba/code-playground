package main

import (
	"fmt"
)

type errorStr struct {
	s string
}

func (e errorStr) Error() string {
	return e.s
}

func checkErr(err error) {
	fmt.Println(err == nil)
}

func main() {
	var e1 error // <nil>
	checkErr(e1) // true

	var e *errorStr // <nil>
	checkErr(e)     // false

	e = &errorStr{}
	checkErr(e) // false

	e = nil
	checkErr(e) // false
}
