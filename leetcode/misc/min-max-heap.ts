class MinMaxHeap {
  private heap: number[] = [];
  private isMinHeap: boolean;

  constructor(mode: 'min' | 'max' = 'min') {
    this.isMinHeap = mode === 'min';
  }

  insert(value: number): void {
    this.heap.push(value); 
    this.bubbleUp(); 
  }

  extract(): number | undefined {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(); // Restore heap property by moving down
    return root;
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
      
      // Use appropriate comparison based on heap type
      const shouldSwap = this.isMinHeap 
        ? this.heap[parentIndex] > this.heap[index]  // MinHeap: parent should be smaller
        : this.heap[parentIndex] < this.heap[index]; // MaxHeap: parent should be larger
      
      // If heap property is satisfied, break
      if (!shouldSwap) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Move root element down to correct position after extraction
  private bubbleDown(): void {
    let index = 0; // Start at root
    const length = this.heap.length;

    while (true) {
      let target = index;
      const left = 2 * index + 1;   // Left child index
      const right = 2 * index + 2;  // Right child index

      if (left < length) {
        // For MinHeap: check if left is smaller; for MaxHeap: check if left is larger
        const leftIsBetter = this.isMinHeap
          ? this.heap[left] < this.heap[target]
          : this.heap[left] > this.heap[target];
          
        if (leftIsBetter) {
          target = left;
        }
      }

      if (right < length) {
        // For MinHeap: check if right is smaller than current target; for MaxHeap: larger
        const rightIsBetter = this.isMinHeap
          ? this.heap[right] < this.heap[target]
          : this.heap[right] > this.heap[target];
          
        if (rightIsBetter) {
          target = right;
        }
      }

      if (target === index) break;

      this.swap(index, target);
      index = target;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
