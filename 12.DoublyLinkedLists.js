// Big O of Doubly Linked Lists
// Insertion -  O(1)
// Removal   -  O(1)
// Searching -  O(N)
// Access -   O(N)
// Technically searching is O(N / 2), but that's still O(N)

// Doubly Linked Lists are almost identical to Singly Linked Lists except there is an additional pointer to previous nodes
// Better than Singly Linked Lists for finding nodes and can be done in half the time!
// However, they do take up more memory considering the extra pointer
// Doubly linked lists are used to implement other data structures and certain types of caches

class Node {
  constructor(value) {
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


  push(value) {
    const newNode = new Node(value);

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

  unshift(value) {
    const newNode = new Node(value);
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


  get(index) {

    if(index < 0 || index >= this.length) {
       return null
    }

    const fromStart = index <= Math.floor(this.length / 2) ? true : false
    let current, count;

    if(fromStart) {
      console.log("Working from the start...!")
      current = this.head;
      count = 0
      while(count < index) { // OR while(count !== index)
        current = current.next;
        count++
      }

    } else {
      console.log("Working from the end...!")
      current = this.tail;
      count = this.length - 1
      while(count > index) { // OR while(count !== index)
        current = current.prev;
        count--

      }
    }

    return current
  }

   set(index, value) {
     const foundNode = this.get(index);

     if(foundNode) {
       foundNode.value = value;
       return true
     }

     return false
   }

   insert(index, value) {

     if(index < 0 || index > this.length) {
       return false
     }

     if(index === this.length) {
       return !!this.push(value)
     }

     if(index === 0) {
       return !!this.unshift(value)
     }

     const newNode = new Node(value);
     const previous = this.get(index - 1); // 2
     const current = previous.next // 3

     previous.next = newNode;
     newNode.prev = previous;
     newNode.next = current;
     current.prev = newNode;
     this.length++
     return true;
   }


   remove(index) {

     if(index < 0 || index >= this.length) {
       return null
     }

     if(index === this.length - 1) {
       return this.pop()
     }

     if(index === 0) {
       return this.shift()
     }

     const toBeRemoved = this.get(index);
     const previous = toBeRemoved.prev;
     const next = toBeRemoved.next;

     previous.next = next;
     next.prev = previous;

     // toBeRemoved.prev.next = toBeRemoved.next
     // toBeRemoved.next.prev = toBeRemoved.prev

     toBeRemoved.next = null;
     toBeRemoved.prev = null;
     this.length--
     return toBeRemoved;
   }
}



const l = new DoublyLinkedList();

l.push(1)
l.push(2)
l.push(3)
l.push(4)
// l.push(5)
// l.push(6)
// a = l.unshift("hello")
// let b = l.shift()
// let b = l.pop()
// console.log(b)
// console.log(l.head, l.length)
// console.log(l.insert(1, "hello"))
// console.log(l.get(2))
// console.log(l.get())
// console.log(l.get(2))
console.log(l.remove(1))
// console.log(l.get(9))
console.log(l)
