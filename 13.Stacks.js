// A LIFO (Last In First Out) data structure!
// The last element added to the stack will be the first element removed from the stack

// BIG O of STACKS
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


class Stack {
  constructor(){
      this.first = null; // head
      this.last = null;  // tail
      this.size = 0;     // length
  }

  // add to the beginning - O(1) time complexity
  // unshift
  push(value) {
    const newNode = new Node(value);
    const currentFirst = this.first;
    newNode.next = currentFirst
    this.first = newNode
    // this.size++

    // if list was empty
    if(!currentFirst) {
        this.last = newNode
    }

    return ++this.size
  }

  // remove from the beginning - O(1) time complexity
  // shift
  pop() {
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
