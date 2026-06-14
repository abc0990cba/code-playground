function networkDelayTime(times: number[][], n: number, k: number): number {
  const graph = new Map<number, [number, number][]>();

  for (const [src, dst, w] of times) {
    if (!graph.has(src)) {
      graph.set(src, []);
    }

    graph.get(src)!.push([w, dst]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0; 

  const minHeap = new MinPriorityQueue<[number, number]>(x => x[0]);
  minHeap.enqueue([0, k]);

  while (!minHeap.isEmpty()) {
    const [currentDist, node] = minHeap.dequeue()!;

    if (currentDist > dist[node]) continue;

    const neighbors = graph.get(node);
    if (!neighbors) continue;

    for (const [weight, neighbor] of neighbors) {
      const newDist = currentDist + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        minHeap.enqueue([newDist, neighbor]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}
