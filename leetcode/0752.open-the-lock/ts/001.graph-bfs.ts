function openLock(deadends: string[], target: string): number {
    let start = '0000';
    const deadSet = new Set(deadends);
    const visited = new Set([start]);

    if(deadSet.has(start)) return -1;

    const queue: [string, number][] = [[start, 0]];
   
    const getNeighbors = (lock: string): string[] => {
        const res = [];
        const LOCK_SIZE = 4;
        for(let i = 0; i < LOCK_SIZE; i++) {
            const digit = parseInt(lock[i], 10);

            // Turn wheel i forward (increment)
            const upDigit = (digit + 1) % 10;
            const up = lock.slice(0, i) + upDigit + lock.slice(i + 1);
            
            // Turn wheel i backward (decrement)
            const downDigit = (digit + 9) % 10;
            const down = lock.slice(0, i) + downDigit + lock.slice(i + 1);
            
            res.push(up, down);
        }

        return res
    }
    

    while(queue.length) {
        const [lock, dst] = queue.shift();

        if(target === lock) return dst;

        const neighbors = getNeighbors(lock);

        for(const neighbor of neighbors) {
            if(!visited.has(neighbor) && !deadSet.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dst+1])
            }
        }
    }

    return -1;
};
