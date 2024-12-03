package main

const size = 1024

func main() {
	s := "HELLO"
	stackCopy(&s, 0, [size]int{})
}

func stackCopy(s *string, i int, a [size]int) {
	println(i, s, *s)

	i++
	if i == 10 {
		return
	}

	stackCopy(s, i, a)
}

// 0 0xc0000a9f30 HELLO
// 1 0xc0000a9f30 HELLO
// 2 0xc0000b9f30 HELLO
// 3 0xc0000b9f30 HELLO
// 4 0xc0000b9f30 HELLO
// 5 0xc0000b9f30 HELLO
// 6 0xc00011ff30 HELLO
// 7 0xc00011ff30 HELLO
// 8 0xc00011ff30 HELLO
// 9 0xc00011ff30 HELLO
