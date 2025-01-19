/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    const oldToNewMap = new Map();

    const dfs = (node) => {
      if(!node) return null;

      if(oldToNewMap.has(node)) return oldToNewMap.get(node);

      const copyNode = new _Node(node.val);
      oldToNewMap.set(node, copyNode);

      for(const neighbor of node.neighbors) {
        copyNode.neighbors.push(dfs(neighbor));
      }
      
      return copyNode;
    }

    return dfs(node);
};