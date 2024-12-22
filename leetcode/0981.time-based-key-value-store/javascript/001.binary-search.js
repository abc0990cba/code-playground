var TimeMap = function() {
    this.store = new Map()
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
  if(!this.store.has(key)) {
    this.store.set(key, []);
  }

  this.store.get(key).push([value, timestamp])
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    let res = '';

    if(!this.store.has(key)) return res;

    const vals = this.store.get(key);

    let l = 0;
    let r = vals.length - 1;

    while(l <= r) {
      const mid = Math.floor((l + r ) / 2);

      if(vals[mid][1] <= timestamp) {
        res = vals[mid][0];
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return res;
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */