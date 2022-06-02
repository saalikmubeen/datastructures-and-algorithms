// LRU (Least Recently Used) Cache

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}


class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }


  push(key, value) {
    const newNode = new Node(key, value);

    // if list is empty
    if(!this.head) {
      this.head = this.tail = newNode
      this.length++
      return this
    }

    const currentTail = this.tail;
    currentTail.next = newNode;
    newNode.prev = currentTail
    this.tail = newNode
    this.length++
    return this;
  }


  pop() {

    // if there is no element in the list
      if(!this.head) {
        return null
      }

      // if there is only one element in the list
       if(!this.head.next) {
          const currentTail = this.tail;
          this.head = this.tail = null;
          this.length--
          return currentTail
       }

    const last = this.tail;
    const secondLast = last.prev;
    secondLast.next = null;
    last.prev = null
    this.tail = secondLast;
    this.length--
    return last;
  }


  shift() {
    // if there is no element in the list
    if(!this.head) {
      return null
    }
    // if there is only one element in the list
    if(!this.head.next) {
        const currentHead = this.head
        this.head = this.tail = null
        this.length--
        return currentHead
    }

    const currentHead = this.head;
    const newHead = currentHead.next;
    currentHead.next = null;
    newHead.prev = null;
    this.head = newHead;
    this.length--
    return currentHead
  }

  unshift(key, value) {
    const newNode = new Node(key, value);
    const currentHead = this.head;

    // if list was empty
    if(!currentHead) {
        this.head = this.tail = newNode;
        this.length++
        return this;
    }

    newNode.next = currentHead
    currentHead.prev = newNode
    this.head = newNode
    this.length++
    return this;
  }

  setHead(node) {
     if(this.head === node) {
       return;
     } else if (this.head === null) {
       this.head = node;
       this.tail = node;
     } else if (this.head === this.tail) {
         this.tail.prev = node;
         this.head = node;
         this.head.next = this.tail;
     } else {
          if(this.tail === node) {
             this.pop();
          }

          if(node.prev) {
             node.prev.next = node.next;
          }

          if(node.next) {
             node.next.prev = node.prev;
          }

          node.next = null;
          node.prev = null;

          this.head.prev = node;
          node.next = this.head;
          this.head = node;
     }
  }

}


class LRUCache {

   constructor(maxSize = 1) {
      this.maxSize = maxSize;
      this.cache = {};
      this.currentSize = 0;
      this.list = new DoublyLinkedList();
   }


   // O(1) time | O(1) space;
   set(key, value) {

       if(key in this.cache) {
          this.replaceKey(key, value);
          this.updateMostRecent(this.cache[key])
          return;
       }

       if(this.currentSize === this.maxSize) {
            this.evictLeastRecent();
       } else {
            this.currentSize++
       }

       this.cache[key] = new Node(key, value);
       this.updateMostRecent(this.cache[key])

   }


   // O(1) time | O(1) space;
   get(key) {
        if(key in this.cache) {
           this.updateMostRecent(this.cache[key])
           return this.cache[key].value;
        }

        return null;
   }


   // O(1) time | O(1) space;
   getMostRecent(key) {
       return this.list.head.key;
   }

   // O(1) time | O(1) space;
   getLeastRecent(key) {
       return this.list.tail.key;
   }


   replaceKey(key, value) {
      this.cache[key].value = value;
   }

   evictLeastRecent() {
       let deleted = this.list.pop(); // removes tail(least recently used);
       delete this.cache[deleted.key];
   }

   updateMostRecent(node) {
        this.list.setHead(node);
   }
}


let cache = new LRUCache(4);

cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);
cache.set("d", 4);
 console.log(cache.getLeastRecent()) // a
 console.log(cache.get("d"))  // 4
 cache.set("a", 10);
console.log(cache.get("a")) // 10
 console.log(cache.getMostRecent())  // a
