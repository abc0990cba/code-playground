package main

func main() {
	count := 10

	// count:  Value Of[ 10 ]  Addr Of[ 0xc00004e728 ]
	println("count:\tValue Of[", count, "]\tAddr Of[", &count, "]")

	// inc:    Value Of[ 11 ]  Addr Of[ 0xc00004e718 ]
	increment(count)

	// count:  Value Of[ 10 ]  Addr Of[ 0xc00004e728 ]
	println("count:\tValue Of[", count, "]\tAddr Of[", &count, "]")
}

//go:noinline
func increment(inc int) {
	inc++
	println("inc:\tValue Of[", inc, "]\tAddr Of[", &inc, "]")
}
