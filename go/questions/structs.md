### 1. [Structs comparison] What will be displayed in the console?
> [!NOTE]
> Answer: Structs are comparable if all their fields are comparable. Use the == operator.

```go
package main
import "fmt"

type A struct {
    X int
    Y int
}

type B struct {
    X int
    Y int
}

type C struct {
    X []int
}

func main() {
  a := A{X:1, Y:2}
  b := A{X:1, Y:2}
  c := A{X:1, Y:3}
   
  fmt.Println(a == b) // true
  fmt.Println(a == c) // false

  // d := B{X:1, Y:2}
  // fmt.Println(a == d) // invalid operation: a == d (mismatched types A and B)
  
  // e := C{X: []int{1,2,3}}
  // f := C{X: []int{1,2,3}}
  // fmt.Println(e == f) // invalid operation: e == f (struct containing []int cannot be compared)
}
```

---

### 2. How do you create constructor-like functions for structs?
> [!NOTE]
> Answer: Go doesn't have constructors, but you can create factory functions that return struct instances.

```go
package main
import "fmt"

type Config struct {
    Host string
    Port int
}

func NewConfig(host string, port int) (*Config, error) {
    if host == "" {
        return nil, fmt.Errorf("host can not be empty")
    } 
    
    if port < 1 || port > 65535 {
        return nil, fmt.Errorf("invalid port number %d", port)
    } 
    
    return &Config{Host: host, Port: port}, nil
}

func main() {
  cfg1, err := NewConfig("test1", 1)
  fmt.Println(cfg1) // &{test1 1}
  fmt.Printf("%+v\n", cfg1) //&{Host:test1 Port:1}
  fmt.Println(err) // <nil>
  
  cfg2, err := NewConfig("test2", 0)
  fmt.Println(cfg2) // <nil>
  fmt.Println(err) // invalid port number 0
}
```

---

### 3. How do you handle private fields and encapsulation in structs?
> [!NOTE]
> Answer: Use lowercase field names for private fields, use interface with public methods. You can create an interface with the method you wish to expose and only access the object when wrapped into that interface.
```go
package main
import "fmt"

type A struct {
    Public int
    private int
}

type hiddenPrivate interface {
    getPublic() int 
}

func NewA(public, private int) hiddenPrivate {
    return &A{Public: public, private: private}
}

func (a *A) getPublic() int {
    return a.Public
}

func (a *A) getPrivate() int {
    return a.private
}

func main() {
  a := NewA(1, 2)

  fmt.Println(a.getPublic()) // 1
  // fmt.Println(a.getPrivate()) //  a.getPrivate undefined (type hiddenPrivate has no field or method getPrivate)
}
```