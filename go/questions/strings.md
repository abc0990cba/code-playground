### 1. How does Go handle strings immutability and what are the performance implications?
>>[!NOTE]
>> Answer: Go strings are immutable, meaning once created, their content cannot be changed. This enables several optimizations but requires careful handling for performance-critical operations.
>> Explanation: Immutability allows string sharing, reduces locking needs in concurrent scenarios, and enables compiler optimizations. However, frequent modifications require using []byte or strings.Builder to avoid excessive memory allocation.
```go
package main

import (
  "fmt"
  "strings"  
)

func main() {
  str := "hello"
  
  // This would compile error: 
  // str[0] = "H" // cannot assign to str[0] (neither addressable nor a map index expression)
  
  // Instead we work with slice of bytes
  bytes := []byte(str)
  bytes[0] = 'H'
  fmt.Println(string(bytes))
  
  // Performance implication: concatenation in loops is expensive
  var sb strings.Builder
  for i := 0; i < 1000; i++ {
    sb.WriteString("W")
    // s += "word" // Inefficient - creates new string each time
  }

  fmt.Println(sb.String())
}
```

---

### 2. Explain the difference between string literals, raw string literals, and interpreted strings?
>>[!NOTE]
>> Explanation: Interpreted strings process escape sequences, while raw strings preserve all characters exactly as written. Raw strings are ideal for regex patterns, JSON, and multi-line content.
```go
package main

import (
  "fmt"
)

func main() {
  interpreted := "Hello\nWorld\tTabbed"
  fmt.Println(interpreted)
  // Hello
  // World	Tabbed
  
  escaped := "\u263A Unicode smiley: \U0001F600"
  fmt.Println(escaped)
  // ☺ Unicode smiley: 😀
  
  raw := `Hello\nWorld\tTabbed`
  fmt.Println(raw)
  // Hello\nWorld\tTabbed

  multiline := `
    mul
    ti
    line`
  fmt.Println(multiline)
  // mul
  // ti
  // line
}
```

---

### 3. How does Go handle unicode what are the pitfalls with string indexing?
>>[!NOTE]
>> Answer: Go strings are UTF-8 encoded, so indexing by byte position doesn't always correspond to character position.
>> Explanation: Always use range or utf8 package functions for Unicode strings. Byte indexing can break multi-byte characters and cause encoding issues.
```go
package main

import (
  "fmt"
  "unicode/utf8"
)

func main() {
  s := "Hello, 世界" // Mix of ASCII and Unicode
  
  fmt.Println(len(s)) // 13
  fmt.Println(utf8.RuneCountInString(s)) // 9
  
  // Dangerous: byte indexing
  fmt.Println("First 7 bytes:", s[:7]) // "Hello, �" - broken character
    
  // Safe: rune-wise processing
  for i, r := range s {
    fmt.Printf("Rune %c (starts at byte %d)\n", r, i)
  }
  // Rune H (starts at byte 0)
  // Rune e (starts at byte 1)
  // Rune l (starts at byte 2)
  // Rune l (starts at byte 3)
  // Rune o (starts at byte 4)
  // Rune , (starts at byte 5)
  // Rune   (starts at byte 6)
  // Rune 世 (starts at byte 7)
  // Rune 界 (starts at byte 10)
  
  runes := []rune(s)
  fmt.Println(string(runes[2])) // l
  fmt.Println(string(runes[7])) // 世
}
```

---