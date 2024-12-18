package main

import (
	"log"
	"strings"
)

func main() {
	log.Println(strings.Contains("hey", "ey")) // true

	log.Println(strings.Split("aa_asd_asd", "_")) // [aa asd asd]

	log.Println(strings.Join([]string{"a", "b", "c"}, ":")) // a:b:c

	sb := strings.Builder{}

	sb.WriteByte(100)
	log.Println(sb.String()) // d

	sb.WriteString("qwe")
	log.Println(sb.String()) // dqwe

	sb.Write([]byte{110, 111})
	log.Println(sb.String()) // dqweno
}
