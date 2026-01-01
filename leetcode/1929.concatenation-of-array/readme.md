Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.
Return the array ans.

### Example 1:
Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]
   
### Example 2:
Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]
 
### Constraints:
n == nums.length
1 <= n <= 1000
1 <= nums[i] <= 1000

---
## Solution
Typescript 1
```ts
function getConcatenation(nums: number[]): number[] {
    return [...nums, ...nums]
};
```

Typescript 2
```ts
function getConcatenation(nums: number[]): number[] {
    return nums.concat(nums)
};
```

Typescript 3
```ts
function getConcatenation(nums: number[]): number[] {
    return Array.from({ length: nums.length * 2 }, (_, i)=> nums[i % nums.length])
};
```

Golang 1
```go
func getConcatenation(nums []int) []int {
    res := make([]int, len(nums)*2)

    copy(res, nums)
    copy(res[len(nums):], nums)
    
    return res
}
```

Golang 2
```go
func getConcatenation(nums []int) []int {
   return append(append([]int{}, nums...), nums...)
}
```
