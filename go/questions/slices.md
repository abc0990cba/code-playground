### 1. Which approach to working with slices is more effective?
>>[!NOTE]
>> Answer: The Core Reason: Repeated Memory Allocations and Copies
>> The key difference lies in how the underlying array for the slice is managed. Go slices are built on top of arrays, and a slice has a length (number of elements it contains) and a capacity (number of elements in the underlying array).

>> First Approach (Inefficient):
>> The slice data starts with a length and capacity of 0.
>> The first append sees the slice is at capacity. Go allocates a new underlying array (typically starting with a small size, like 1 or 2 elements), copies the existing elements (none in this case), and adds the new value.
>> On each subsequent append that exceeds the current capacity, Go must:
>> Allocate a new, larger array (the capacity usually doubles each time: 1 → 2 → 4 → 8 → 16 ... → 1024).
>> Copy all the existing elements from the old array to the new one.
>> Then add the new element.
>> This process of allocation-and-copy happens multiple times (around 10-11 times for 1000 elements), making it computationally expensive.

>> Second Approach (Efficient):
>> What happens:
>> make([]int, 1000) performs a single allocation of an underlying array large enough to hold 1000 integers. The length and capacity are both set to 1000.
>> The loop simply assigns each value to its pre-allocated slot in the array. There are no further memory allocations or copies during the loop.

>> When is append the Right Tool?
>> The first approach isn't always wrong. It's necessary and idiomatic when you don't know the final size of the slice beforehand. However, you can make it efficient by using the three-argument version of make to pre-allocate capacity.

>> The Best of Both Worlds (Efficient with append):
>> If you need to use append but know the final size, you can do this:

```go
data := make([]int, 0, SIZE)
for i := 0; i < SIZE; i++ {
    data = append(data, i) // No reallocations happen!
}
```
>> This way, you get the convenience of append with the performance of a single allocation.

>> Conclusion: Always pre-allocate the capacity of a slice (make([]T, length, capacity)) if you know how many elements it will need to hold. This avoids the performance penalty of repeated memory allocations and copies, making your code significantly faster.

```go
  const SIZE = 1_000
    
  // 1 approach
  slice1 := make([]int, 0)
  for i := 0; i < SIZE; i++ {
      slice1 = append(slice1, i);
  }
  
  
  // 2 approach
  slice2 := make([]int, SIZE)
  for i := 0; i < SIZE; i++ {
      slice2[i] = i;
  }

```

#### Benchmark tests

```bash
go test -bench=. -benchmem main_test.go
goos: darwin
goarch: arm64
cpu: Apple M2
BenchmarkInefficientAppend-8                3488            346568 ns/op         4101430 B/op         28 allocs/op
BenchmarkEfficientNoAppend-8               16158             73879 ns/op          802831 B/op          1 allocs/op
BenchmarkEfficientWithAppend-8             13455             86982 ns/op          802830 B/op          1 allocs/op
PASS
ok      command-line-arguments  6.397s
```

```go
// main_test.go
package main

import (
	"testing"
)

const SIZE = 100_000

func BenchmarkInefficientAppend(t *testing.B) {
  for n := 0; n < t.N; n++ {
    slice := make([]int, 0)
    for i := 0; i < SIZE; i++ {
      slice = append(slice, i)
    }
  }
}

func BenchmarkEfficientNoAppend(t *testing.B) {
  for n := 0; n < t.N; n++ {
    slice := make([]int, SIZE)
    for i := 0; i < SIZE; i++ {
      slice[i] = i
    }
  }
}

func BenchmarkEfficientWithAppend(t *testing.B) {
  for n := 0; n < t.N; n++ {
    slice := make([]int, 0, SIZE)
    for i := 0; i < SIZE; i++ {
      slice = append(slice, i)
    }
  }
}
```