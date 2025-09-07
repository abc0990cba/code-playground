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

### 1. Explain the difference between string literals, raw string literals, and interpreted strings?
>>[!NOTE]
>> Answer: Go strings are immutable, meaning once created, their content cannot be changed. This enables several optimizations but requires careful handling for performance-critical operations.
>> Explanation: Immutability allows string sharing, reduces locking needs in concurrent scenarios, and enables compiler optimizations. However, frequent modifications require using []byte or strings.Builder to avoid excessive memory allocation.
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