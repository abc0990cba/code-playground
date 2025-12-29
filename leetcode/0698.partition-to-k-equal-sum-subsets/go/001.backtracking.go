func canPartitionKSubsets(nums []int, k int) bool {
  sum := 0
  for i := 0; i < len(nums); i++ {
    sum += nums[i]
  }

  if sum % k != 0 {
    return false
  }

  target := sum / k

  sort.Sort(sort.Reverse(sort.IntSlice(nums)))

  used := make([]bool, len(nums))

  var backtrack func(int, int, int) bool
  backtrack = func(i, k, subsetSum int) bool {
    if k == 0 {
        return true
    }

    if subsetSum == target {
       return backtrack(0, k-1, 0)
    }

    for j := i; j < len(nums); j++ {
        if used[j] || subsetSum + nums[j] > target {
            continue
        }

        used[j] = true
        if backtrack(j+1, k, subsetSum + nums[j]) {
            return true
        }
        used[j] = false

        if subsetSum == 0 {
            return false
        }
    }

    return false
  }

  return backtrack(0, k, 0)
}
