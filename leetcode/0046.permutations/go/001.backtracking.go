func permute(nums []int) [][]int {
    result := [][]int{}
    used := make([]bool, len(nums))
    
    var backtrack func(path []int)
    backtrack = func(path []int) {
        if len(path) == len(nums) {
      
            result = append(result, append([]int{}, path...))
            return
        }
        
        for i := 0; i < len(nums); i++ {
            if used[i] {
                continue
            }
            
            used[i] = true
            backtrack(append(path, nums[i]))
            used[i] = false
        }
    }
    
    backtrack([]int{})
    return result
}
