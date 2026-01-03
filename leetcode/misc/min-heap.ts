class MinHeap {
  private heap: number[] = [];

  insert(value: number): void {
    this.heap.push(value); 
    this.bubbleUp(); 
  }

  extractMin(): number | undefined {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(); // Restore heap property by moving down
    return min;
  }

  peek(): number | undefined {
    return this.heap[0];
  }
  
  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  // Move newly inserted element up to correct position
  private bubbleUp(): void {
    let index = this.heap.length - 1;

    // While not at root (index > 0)
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      // If parent ≤ current, heap property is satisfied
      if (this.heap[parentIndex] <= this.heap[index]) break;

      this.swap(index, parentIndex);

      index = parentIndex;
    }
  }

  // Move root element down to correct position after extraction
  private bubbleDown(): void {
    let index = 0; // Start at root
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;   // Left child index
      const right = 2 * index + 2;  // Right child index

      // Check if left child exists and is smaller
      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      // Check if right child exists and is smaller than current smallest
      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);

      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
