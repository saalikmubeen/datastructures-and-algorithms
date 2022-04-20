// WHAT IS A HASH TABLE / HASH MAP

// Hash tables are used to store key-value pairs.
// They are like arrays, but the keys are not ordered.
// Unlike arrays, hash tables are fast for all of the following operations:
// finding values, adding new values, and removing value


// THE HASH PART
// To implement a hash table, we'll be using an array.
// In order to look up values by key, we need a way to convert keys into valid array indices.
// A function that performs this task is called a hash function.


// WHAT MAKES A GOOD HASH?
// Fast (i.e. constant time)
// Doesn't cluster outputs at specific indices, but distributes uniformly
// Deterministic (same input yields same output)

// Prime numbers? wut.
// The prime number in the hash is helpful in spreading out the keys more uniformly.
// It's also helpful if the array that you're putting values into has a prime length.
// You don't need to know why. (Math is complicated!) But here are some links if you're curious.
// Why do hash functions use prime numbers?
// Does making array size a prime number help in hash table implementation?

// Dealing with Collisions
// Even with a large array and a great hash function, collisions are inevitable.
// There are many strategies for dealing with collisions, but we'll focus on two:
// Separate Chaining
// Linear Probing

// Separate chaining and linear probing are two strategies used to deal with two keys that hash to the same index

// Separate Chaining
// With separate chaining, at each index in our array we store values using a more
// sophisticated data structure (e.g. an array or a linked list).
// This allows us to store multiple key-value pairs at the same index.

// Linear Probing
// With linear probing, when we find a collision, we search through the array to find the next empty slot.
// Unlike with separate chaining, this allows us to store a single key-value at each index.

// BIG O of HASH TABLES
// Insert    -  O(1)
// Deletion  -  O(1)
// Access    -  O(1)

class HashTable {
  constructor(size=53){
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key,value){
    let index = this._hash(key);
    if(!this.keyMap[index]){
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }
  
  get(key){
    let index = this._hash(key);
    if(this.keyMap[index]){
      for(let i = 0; i < this.keyMap[index].length; i++){
        if(this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1]
        }
      }
    }
    return undefined;
  }

  keys(){
    let keysArr = [];
    for(let i = 0; i < this.keyMap.length; i++){
      if(this.keyMap[i]){
        for(let j = 0; j < this.keyMap[i].length; j++){
          if(!keysArr.includes(this.keyMap[i][j][0])){
            keysArr.push(this.keyMap[i][j][0])
          }
        }
      }
    }
    return keysArr;
  }

  values(){
    let valuesArr = [];
    for(let i = 0; i < this.keyMap.length; i++){
      if(this.keyMap[i]){
        for(let j = 0; j < this.keyMap[i].length; j++){
          if(!valuesArr.includes(this.keyMap[i][j][1])){
            valuesArr.push(this.keyMap[i][j][1])
          }
        }
      }
    }
    return valuesArr;
  }
}

let ht = new HashTable(17);
ht.set("maroon","#800000")
ht.set("yellow","#FFFF00")
ht.set("olive","#808000")
ht.set("salmon","#FA8072")
ht.set("lightcoral","#F08080")
ht.set("mediumvioletred","#C71585")
ht.set("plum","#DDA0DD")
ht.set("purple","#DDA0DD")
ht.set("violet","#DDA0DD")


ht.keys().forEach(function(key){
  console.log(ht.get(key));
})
