func permuteUnique(nums []int) [][]int {
    result := [][]int{}
    used := make([]bool, len(nums))
    sort.Ints(nums)
    
    var backtrack func(path []int)
    backtrack = func(path []int) {
        if len(path) == len(nums) {
      
            result = append(result, append([]int{}, path...))
            return
        }
        
        lastRemoved := -10000
        for i := 0; i < len(nums); i++ {
            if used[i] || (nums[i] == lastRemoved) {
                continue
            }
            
            used[i] = true
            path = append(path, nums[i])

            backtrack(path)
            lastRemoved = path[len(path)-1]
            path = path[:len(path)-1]
            used[i] = false
        }
    }
    
    backtrack([]int{})
    return result
}
