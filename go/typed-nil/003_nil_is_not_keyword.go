package main

import "log"

func main() {
	// it is ok
	var _ map[string]int = nil

	nil := 123
	log.Println(nil) // 123

	// The following line fails to compile,
	// for nil represents an int value now
	// in this scope.
	var _ map[string]int = nil
}
