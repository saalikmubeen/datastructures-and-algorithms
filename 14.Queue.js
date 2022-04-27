
// A FIFO (First In First Out) data structure!

// BIG O of QUEUES
// Insertion  -   O(1)
// Removal    -   O(1)
// Searching  -   O(N)
// Access     -   O(N)


// LINKED LIST IMPLEMENTATION

class Node {
  constructor(value){
    this.value = value
    this.next = null
  }
}


class Queue {
  constructor(){
      this.first = null; // head
      this.last = null;  // tail
      this.size = 0;     // length
  }

  // add to the end - O(1) time complexity
  // push
  enqueue(value) {
    const newNode = new Node(value)

    // if list is empty
    if(!this.first) {
      this.first = this.last = newNode
      this.size++
      return this.size
    }

    // there are some existing nodes in the list
    const currentLast = this.last;
    currentLast.next = newNode
    this.last = newNode
    return ++this.size
  }

  // remove from the beginning - O(1) time complexity
  // shift
  dequeue() {
    // if there is no element in the list
    if(!this.first) {
      return null
    }
    // if there is only one element in the list
    if(!this.first.next) {
        const currentFirst = this.first
        this.first = this.last = null
        this.size-
        return currentFirst.value
    }

    const currentFirst = this.first;
    const newFirst = currentFirst.next
    this.first = newFirst
    this.size--
    return currentFirst.value
  }

}



// ARRAY IMPLEMENTATION

class Queue_ {

constructor() {
  this.queue = []
}


  add(element) {
    this.queue.unshift(element)
  }

  remove(element) {
    return this.queue.pop()
  }

}


// Queue from Stack

// --- Directions
// Implement a Queue datastructure using two stacks.
// *Do not* create an array inside of the 'Queue' class.
// Queue should implement the methods 'add', 'remove', and 'peek'.
// For a reminder on what each method does, look back
// at the Queue exercise.
// --- Examples
    // const q = new Queue();
    // q.add(1);
    // q.add(2);
    // q.peek();  // returns 1
    // q.remove(); // returns 1
    // q.remove(); // returns 2

class Stack {
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}


// FIFO
class QueueFromStack {
  constructor() {

    this.firstStack = new Stack();
    this.secondStack = new Stack()
  }

   add(element) {
     this.firstStack.push(element)
   }

   remove() {
     while(this.firstStack.peek()) {
       this.secondStack.push(this.firstStack.pop())
     }

     const removedItem = this.secondStack.pop()

     while(this.secondStack.peek()) {
       this.firstStack.push(this.secondStack.pop())
     }

     return removedItem
   }

   peek() {

     while(this.firstStack.peek()) {
       this.secondStack.push(this.firstStack.pop())
     }

     const item = this.secondStack.peek()

     while(this.secondStack.peek()) {
       this.firstStack.push(this.secondStack.pop())
     }

      return item;
   }

}


const q = new QueueFromStack();
q.add(1);
q.add(2);
q.add(3);
q.add(4);
console.log(q.peek());  // returns 1
console.log(q.remove()); // returns 1
console.log(q.remove()); // returns 2
console.log(q.peek()); // returns 3
