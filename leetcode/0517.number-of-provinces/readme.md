You have n cities connected through a matrix isConnected:

isConnected[i][j] = 1 means city i and city j are directly connected

isConnected[i][j] = 0 means they're not directly connected

Connections are transitive: if A-B and B-C, then A-C are connected

Find number of provinces (connected components)

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 are connected, City 2 is separate
---
Solution explanation:
Union-Find:
Path Compression Techniques in Union-Find
This is called "Path Halving" or "Path Splitting" - an optimization technique for the Union-Find/Disjoint Set data structure.

What Problem Does It Solve?
In Union-Find, the find operation navigates up the tree to find the root. Without optimization, trees can become very tall (linked-list-like), making find operations O(n).

---
Three Path Compression Techniques:

---
1. Naive Find (No Compression)
---
   ```go
   func find(x int) int {
    for parent[x] != x {
        x = parent[x]  // Just climb up
    }
    return x
   }
   ```
Problem: Trees remain tall, operations become slow over time.

---
2. Full Path Compression (Recursive)
---
 ```go
    func find(x int) int {
         if parent[x] != x {
             parent[x] = find(parent[x])  // Recursively compress entire path
         }
         return parent[x]
    }
```
How it works: When finding root for node X, it recursively compresses the entire path from X to root, making all nodes point directly to root.

Before: 1 → 2 → 3 → 4 (root)

After find(1):  1 → 4  2 → 4  3 → 4

---
3. Path Halving
---
   ```go
 func find(x int) int {
       for parent[x] != x {
           parent[x] = parent[parent[x]]  // Make node point to its grandparent
           x = parent[x]                  // Move to grandparent
       }
    return x
}
```
How it works:
Instead of compressing the entire path at once
Each iteration makes the node point to its grandparent (skips one level)
Progressively flattens the tree over multiple operations

Visual Example:
Initial: 1 → 2 → 3 → 4 → 5 (root)

Step 1: parent[1] = parent[parent[1]] = parent[2] = 3
Now: 1 → 3 → 4 → 5

Step 2: x = parent[1] = 3
        parent[3] = parent[parent[3]] = parent[4] = 5
Now: 1 → 3 → 5
     2 → 3 → 5
     
After a few operations, tree becomes much flatter!
