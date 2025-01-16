const ABC_SIZE = 26;

var TrieNode = function() {
  
  this.children = new Array(ABC_SIZE).fill(null);
  this.wordEnd = false;  
};

var WordDictionary = function() {
  this.root = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  let cur = this.root;

  for(const ch of word) {
    const idx = ch.charCodeAt(0) - 97;
    if(cur.children[idx] === null) {
      cur.children[idx] = new TrieNode();
    }

    cur = cur.children[idx];
  }

  cur.wordEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  const dfs = (j, cur) => {
    for(let i = j; i < word.length; i++) {
      if(word[i] === '.') {
        for(let k = 0; k < ABC_SIZE; k++) {
          const child = cur.children[k];
          if(child !== null && dfs(i+1, child)) {
            return true
          }
        }
        return false;
      } else {
        const idx = word[i].charCodeAt(0) - 97;
        if(cur.children[idx] === null) {
          return false;
        }
  
        cur = cur.children[idx];
      }
    }

    return cur.wordEnd;
  }

  return dfs(0, this.root);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */