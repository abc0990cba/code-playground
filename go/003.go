package main

// article: https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-escape-analysis.html

type user struct {
	name  string
	email string
}

func main() {
	u1 := createUserV1()
	u2 := createUserV2()

	println("u1", &u1)
	println("u2", &u2)

	// with go:noinline
	// V1 0xc00004e6c8
	// V2 0xc000066020
	// u1 0xc00004e710
	// u2 0xc00004e708

	// without go:noinline
	// V1 0xc00004e710
	// V2 0xc00004e6f0
	// u1 0xc00004e6d0
	// u2 0xc00004e6c8
}

//go:noinline
func createUserV1() user {
	u := user{
		name:  "Bill",
		email: "bill@ardanlabs.com",
	}

	println("V1", &u)
	return u
}

//go:noinline
func createUserV2() *user {
	u := user{
		name:  "Bill",
		email: "bill@ardanlabs.com",
	}

	println("V2", &u)
	return &u
}
