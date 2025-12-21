You have n cities connected through a matrix isConnected:

isConnected[i][j] = 1 means city i and city j are directly connected

isConnected[i][j] = 0 means they're not directly connected

Connections are transitive: if A-B and B-C, then A-C are connected

Find number of provinces (connected components)

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 are connected, City 2 is separate
