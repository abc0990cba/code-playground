/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
const carFleet = function(target, position, speed) {
    const pairs = position.map((p,i) => [p, speed[i]]);

    // sort array in reversed order
    // for iterating from the nearest to target positions at first 
    pairs.sort((a, b) => b[0] - a[0]);

    const stack = [];
    for(const [pos, spd] of pairs) {
      const time = (target - pos) / spd;
      stack.push(time);

      if(stack.length >= 2) {
        if(stack.at(-2) >= stack.at(-1)) {
          stack.pop();
        }
      }
    } 
    
    return stack.length;
};