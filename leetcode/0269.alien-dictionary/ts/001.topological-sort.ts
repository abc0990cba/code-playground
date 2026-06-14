function alienOrder(words: string[]): string {
    const adj = new Map<string, Set<string>>();
    const indegree = new Map<string, number>();

    for(const w of words) {
        for(const ch of w) {
            if(!adj.has(ch)) {
                adj.set(ch, new Set());
                indegree.set(ch, 0);
            }
        }
    }

    for(let i = 0; i <= words.length-2; i++) {
        const w1 = words[i];
        const w2 = words[i+1];

        const minLen = Math.min(w1.length, w2.length);
        let foundDiff = false;

        for(let j = 0; j < minLen; j++) {
            if(w1[j] !== w2[j]) {
                foundDiff = true;
                if(!adj.get(w1[j])?.has(w2[j])) {
                    adj.get(w1[j])?.add(w2[j]);
                    indegree.set(w2[j], indegree.get(w2[j])! + 1);
                }
                break;
            }
        }

        if(w1.length > w2.length && !foundDiff) return "";
    }


    const queue = [];
    for(const [ch, indeg] of indegree.entries()) {
        if(indeg === 0) {
            queue.push(ch);
        }
    }

    const order = []
    while(queue.length) {
        const ch = queue.pop()!;
        order.push(ch);

        for(const to of adj.get(ch)!) {
            const newIndegree = indegree.get(to)! - 1;
            indegree.set(to, newIndegree);

            if(newIndegree === 0) {
                queue.push(to);
            }
        }
    }

    return order.length === indegree.size ? order.join("") : "";
}
