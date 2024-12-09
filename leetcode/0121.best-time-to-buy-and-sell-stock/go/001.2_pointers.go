// Time complexity: O(n)
// Space complexity:  O(1)
// Sliding window, 2 pointers

func maxProfit(prices []int) int {
    if len(prices) == 0 {
        return 0
    }

    l, r := 0, 1
    var profit int

    for ; r < len(prices); {
        if prices[l] < prices[r] {
            tmp := prices[r] - prices[l]

            if tmp > profit {
                profit = tmp
            }
        } else {
            l = r
        }

        r++
    }

    return profit
}
