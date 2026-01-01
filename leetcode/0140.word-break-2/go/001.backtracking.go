func wordBreak(s string, wordDict []string) []string {
    var res []string
    var substrs []string

    wordSet := make(map[string]bool)
    for _, word := range(wordDict) {
        wordSet[word] = true
    }

    var backtrack func(int)
    backtrack = func(i int) {
        if i == len(s) {
            res = append(res, strings.Join(substrs, " "))
            return
        }

        for j := i; j < len(s); j++ {
            word := s[i:j+1]
            if wordSet[word] {
                substrs = append(substrs, word)
                backtrack(j+1)
                substrs = substrs[:len(substrs)-1]
            }
        }
    }

    backtrack(0)
    
    return res
}
