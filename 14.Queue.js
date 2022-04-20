
// A FIFO (First In First Out) data structure!

// BIG O of QUEUES
// Insertion  -   O(1)
// Removal    -   O(1)
// Searching  -   O(N)
// Access     -   O(N)

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
