var TrieNode = function() {
  const ABC_SIZE = 26;
  this.children = new Array(ABC_SIZE).fill(null);
  this.wordEnd = false;  
};


var Trie = function() {
  this.root = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
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
Trie.prototype.search = function(word) {
  let cur = this.root;

  for(const ch of word) {
    const idx = ch.charCodeAt(0) - 97;
    if(cur.children[idx] === null) {
      return false;
    }

    cur = cur.children[idx];
  }

  return cur.wordEnd;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let cur = this.root;

  for(const ch of prefix) {
    const idx = ch.charCodeAt(0) - 97;
    if(cur.children[idx] === null) {
      return false;
    }

    cur = cur.children[idx];
  }

  return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */