// TODO: imrove perf by presorting
function isNStraightHand(hand, groupSize) {
    const n = hand.length;
    if (n % groupSize !== 0) return false;

    const count = new Map();
    for (const card of hand) {
        count.set(card, (count.get(card) || 0) + 1);
    }

    for (let i = 0; i < n / groupSize; i++) {
        const start = Math.min(...Array.from(count.keys()));
        if (!count.get(start)) return false;

        count.set(start, count.get(start) - 1);
        if (count.get(start) === 0) count.delete(start);

        const group = [start];
        for (let j = 1; j < groupSize; j++) {
            const next = group.at(-1) + 1;
            if (count.get(next)) {
                group.push(next);
                count.set(next, count.get(next) - 1);
                if (count.get(next) === 0) count.delete(next);
            } else {
                return false;
            }
        }
    }

    return true;
}
