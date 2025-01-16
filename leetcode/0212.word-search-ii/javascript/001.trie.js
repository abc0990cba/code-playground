const ABC_SIZE = 26;

class TrieNode {
  constructor() {
      this.children = {};
      this.isWord = false;
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
      let cur = this;
      for (const c of word) {
          if (!(c in cur.children)) {
              cur.children[c] = new TrieNode();
          }
          cur = cur.children[c];
      }
      cur.isWord = true;
  }
}
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  const root = new TrieNode();
  for (const word of words) {
      root.addWord(word);
  }

  const ROWS = board.length;
  const COLS = board[0].length;
  const res = new Set();
  const visited = new Set();

  const dfs = (r, c, node, word) => {
    const pos = `${r},${c}`;

      if (r < 0 || c < 0 || r >= ROWS || 
          c >= COLS || visited.has(pos) || 
          !(board[r][c] in node.children)) {
          return;
      }

      visited.add(pos);
      node = node.children[board[r][c]];
      word += board[r][c];
      if (node.isWord) {
          res.add(word);
      }

      dfs(r + 1, c, node, word);
      dfs(r - 1, c, node, word);
      dfs(r, c + 1, node, word);
      dfs(r, c - 1, node, word);

      visited.delete(pos);
  };

  for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
          dfs(r, c, root, "");
      }
  }

  return Array.from(res);
};