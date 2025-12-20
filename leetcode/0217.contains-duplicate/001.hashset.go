func containsDuplicate(nums []int) bool {
   seenMap := make(map[int]struct{})

   for _, num := range(nums) {
    
    if _, ok := seenMap[num]; ok {
        return true 
    }

    seenMap[num] = struct{}{}
   }

   return false
}
