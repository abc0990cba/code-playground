/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
  const max = Math.max(...piles);
  const range = new Array(max)
                .fill(0)
                .map((_, idx) => idx + 1);

  let minSpeed = max;

  let l = 0;
  let r = range.length - 1;

  while(l <= r) {
    const mid = Math.floor((l + r) / 2);

    const speed = range[mid];
    let i = 0;
    let sumTime = 0;
    while (i < piles.length) {
      const timePerPile = Math.ceil(piles[i] / speed);
      sumTime += timePerPile;
      i++;
    }

    if(sumTime <= h) {
      minSpeed = Math.min(minSpeed, speed);
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return minSpeed;
};