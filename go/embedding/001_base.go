package main

import "log"

func main() {
	type P = *bool
	type M = map[int]int
	type test struct {
		string
		int
		bool
		P
		M
	}

	t := test{
		string: "qwe",
	}

	log.Println(t) // {qwe 0 false <nil> map[]}
}
