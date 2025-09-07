package channels

import "fmt"

func writer() <-chan int {
    ch := make(chan int)
    
    go func() {
        for i := range 5 {
            ch <- i + 1
        }    
        // if remove this it will cause deadlock
        close(ch)
    }()

    return ch
}


func main() {
  ch := writer()
  
	// WRONG
	// cannot close receive-only channel ch
	// close(ch)
  for {
      i, ok := <- ch
      if !ok {
          break
      }
      fmt.Println(i)
  }     
  
  fmt.Println("Done")
}