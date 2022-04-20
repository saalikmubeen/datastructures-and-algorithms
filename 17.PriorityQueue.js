// WHAT IS A PRIORITY QUEUE?

// A data structure where each element has a priority.
// Elements with higher priorities are served before elements with lower priorities.

// OUR PRIORITY QUEUE

// Write a Min Binary Heap - lower number means higher priority.
// Each Node has a val and a priority.  Use the priority to build the heap.
// Enqueue method accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority.
// Dequeue method removes root element, returns it, and rearranges heap using priority


class Node {
    constructor(value, priority){
        this.value = value;
        this.priority = priority; // greater the priority number, higher is the priority
    }
}


// MinBinaryHeap
class PriorityQueue {
  constructor() {
      this.values = [];
  }

  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.values.push(node);

    this.bubbleUp();
  }


  bubbleUp() {
    let currentIdx = this.values.length - 1;
    let currentValue = this.values[currentIdx];

    while(currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2)
      let parentValue = this.values[parentIdx];

      if(currentValue.priority > parentValue.priority) {
         this.values[parentIdx] = currentValue;
         this.values[currentIdx] = parentValue;
         currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  dequeue() {
    const max = this.values[0];
    const last = this.values.pop();

    // edge case
    if(this.values.length > 0) {
      this.values[0] = last;
      this.sinkDown();
    }

    return max;
  }


  sinkDown() {
    let parentIdx = 0
    let parentValue = this.values[parentIdx];
    const length = this.values.length;

    while(true) {
      let leftChildIdx  =  (2 * parentIdx) + 1;
      let rightChildIdx =  (2 * parentIdx) + 2;
      let leftChildValue, rightChildValue;
      let swapIndex = null;
      let swapValue = null;

      if(leftChildIdx < length) {
         leftChildValue = this.values[leftChildIdx]

         if(leftChildValue.priority > parentValue.priority) {
           swapIndex = leftChildIdx;
           swapValue = leftChildValue
         }
      }

      if(rightChildIdx < length) {
        rightChildValue = this.values[rightChildIdx]

        if((swapValue === null && rightChildValue.priority > parentValue.priority)
         ||                                          // leftChildValue.priority
         (swapValue !== null && rightChildValue.priority > swapValue.priority)) {
           swapIndex = rightChildIdx;
           swapValue = rightChildValue
        }
      }

      if(swapValue !== null) {
         this.values[parentIdx] = swapValue;
         this.values[swapIndex] = parentValue

         parentIdx = swapIndex
      } else {
        break;
      }
    }
  }
}

let ER = new PriorityQueue();

ER.enqueue("common cold", 5)
ER.enqueue("gunshot wound", 1)
ER.enqueue("high fever", 4)
ER.enqueue("broken arm", 2)
ER.enqueue("glass in foot", 3)

console.log(ER.dequeue()) // 5
console.log(ER.dequeue()) // 4
console.log(ER.dequeue()) // 3
console.log(ER.dequeue()) // 2
console.log(ER.dequeue()) // 1

console.log(ER.values)


// Simple or Naive Version.
// We are sorting which is O(n*logn)
// class PriorityQueue {
//
//   constructor(){
//     this.values = [];
//   }
//
//   enqueue(val, priority) {
//     this.values.push({val, priority});
//     this.sort();
//   };
//
//   dequeue() {
//     return this.values.shift();
//   };
//
//   sort() {
//     this.values.sort((a, b) => a.priority - b.priority);
//   };
//
// }
