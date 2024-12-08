package main

func main() {
	// same things grouped in blocks

	_ = (*struct{})(nil)
	var _ *struct{} = nil

	_ = []int(nil)
	var _ []int = nil

	_ = map[int]bool(nil)
	var _ map[int]bool = nil

	_ = chan string(nil)
	var _ chan string = nil

	_ = (func())(nil)
	var _ func() = nil

	_ = interface{}(nil)
	var _ interface{} = nil

	// doesn't compile
	var _ = nil
}
