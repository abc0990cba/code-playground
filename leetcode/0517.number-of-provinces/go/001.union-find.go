func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    provinces := n

    parent := make([]int, n)
    rank := make([]int, n)

    for i := 0; i < n; i++ {
        parent[i] = i
        rank[i] = 1
    }

    findRoot := func(node int) int {
        cur := node

        for cur != parent[cur] {
            parent[cur] = parent[parent[cur]]
            cur = parent[cur]
        }

        return cur
    }


    union := func(a, b int) bool {
        rootA := findRoot(a)
        rootB := findRoot(b)

        if rootA == rootB {
            return false
        }

        if rank[rootA] <= rank[rootB] {
            rank[rootB] += rank[rootA]
            parent[rootA] = rootB
        } else {
            rank[rootA] += rank[rootB]
            parent[rootB] = rootA
        }

        return true
    }


    for i := 0; i < n; i++ {
        for j := i+1; j < n; j++ {
            if isConnected[i][j] == 1 {
                if union(i, j)  {
                    provinces -= 1
                }
            }
        }
    }

    return provinces
}
