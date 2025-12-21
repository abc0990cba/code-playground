impl Solution {
    pub fn find_circle_num(is_connected: Vec<Vec<i32>>) -> i32 {
        let n = is_connected.len();

        if(n == 0) {
            return 0;
        }      

        let mut parent: Vec<usize> = (0..n).collect();
        let mut size: Vec<usize> = vec![1; n];
        let mut provinces = n as i32;

        fn find_root(parent: &mut Vec<usize>, mut node: usize) -> usize {
            while node != parent[node] {
                parent[node] = parent[parent[node]];
                node = parent[node];
            }

            node
        }

        fn union(parent: &mut Vec<usize>, size: &mut Vec<usize>, a: usize, b: usize) -> bool {
            let mut root_a = find_root(parent, a);
            let mut root_b = find_root(parent, b);

            if root_a == root_b {
                return false;
            }

            if size[root_a] <= size[root_b] {
                size[root_b] += size[root_a];
                parent[root_a] = root_b;
            } else {
                size[root_a] += size[root_b];
                parent[root_b] = root_a;
            }

            true
        }

        for i in 0..n {
            for j in (i+1)..n {
                if is_connected[i][j] == 1 {
                    if union(&mut parent, &mut size, i, j) {
                        provinces -= 1
                    }
                }
            }
        }

        provinces
    }
}
