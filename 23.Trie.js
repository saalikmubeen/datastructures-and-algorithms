// Tries or Prefix Trees

class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  constructor() {
     this.root = new TrieNode();
  }

  // Iterative implementation of insert into trie
  // Time complexity: O(length_of_word)
  insert(word) {
    let current = this.root;

    for(let i = 0; i < word.length; i++) {
      let ch = word[i];
      let node = current.children[ch];

      if(!node) {
          node = new TrieNode();
          current.children[ch] = node;
      };

      current = node;
    }

    // mark the current node's endOfWord as true
    current.endOfWord = true;
  };

  // Recursive implementation of insert into trie
  insertRecursive(word, node = this.root, index=0) {

      if(index === word.length) {
        node.endOfWord = true;
        return
      }

      let ch = word[index];
      let child = node.children[ch];
      if(!child) {
        child = new TrieNode();
        node.children[ch] = child
      }

      this.insertRecursive(word, child, index+1);
  }



  // Iterative implementation of search in a trie.
  // Time complexity: O(length_of_word)
  search(word) {
    let current = this.root;

    for(let i = 0; i < word.length; i++) {
      let ch = word[i];
      let node = current.children[ch];

      // if node does not exist for given char then return false;
      if(!node) {
        return false;
      }

      current = node;
    }

    // return true if current's endOfWord is true else return false.
     return current.endOfWord;
  };


  // Recursive implementation of search into trie.
  searchRecursive(word, currentNode = this.root, index = 0) {
     if(word.length === index && currentNode.endOfWord) {
        return true
     }

     if (word.length === 0 && !currentNode.endOfWord) {
       return false
     }

     let ch = word[index];
     let child = currentNode.children[ch];

     // if node/child doesn't exist for given character, then return false
     if(!child) {
       return false
     }

     return this.searchRecursive(word, child, index+1)
  }

  // AUTO-COMPLETE (PREFIX SEARCH)
  startsWith(prefix) {
     let current = this.root;

      // Traverse till last character in `prefix`
     for(let i = 0; i < prefix.length; i++) {
       let ch = prefix[i];
       let node = current.children[ch];

       if(!node) {
         // return false
         return []
       }

       current = node;
     };

     const possibleWords = this.prefixSearch(prefix, current);
     return possibleWords;
     // return true;
  }


  prefixSearch(prefix, current, possibleWords=[]) {
    for(let childNode of Object.entries(current.children)) {
       let ch = childNode[0];
       let node = childNode[1];
       prefix = prefix + ch;

       if(node.endOfWord) {
          // console.log(prefix)
          possibleWords.push(prefix);
       }

       this.prefixSearch(prefix, node, possibleWords);
       prefix = prefix.slice(0, prefix.length-1) // Backtracking
    }

    return possibleWords;
  }

}



const trie = new Trie();

trie.insertRecursive("apple");
trie.insertRecursive("apply");
trie.insertRecursive("application")
console.log(trie.search("apple"));   // returns true
console.log(trie.searchRecursive("app"));     // returns false
console.log(trie.startsWith("app")); // returns true, [ 'apple', 'apply', 'application' ]
trie.insert("dog")
trie.insert("app");
console.log(trie.search("app"));     // returns true
