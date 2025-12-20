func containsDuplicate(nums []int) bool {
   seenMap := make(map[int]struct{})

   for _, num := range(nums) {
    seenMap[num] = struct{}{}
   }

   return len(nums) > len(seenMap)
}
