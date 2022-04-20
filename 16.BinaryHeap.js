// WHAT IS A BINARY HEAP?
// Very similar to a binary search tree, but with some different rules!
// Each node can have a maximum of 2 children; 0, 1 or 2
// In a MaxBinaryHeap, parent nodes are always larger than child nodes.
// In a MinBinaryHeap, parent nodes are always smaller than child nodes

// MAX BINARY HEAP
// Each parent has at most two child nodes
// The value of each parent node is always greater than its child nodes
// In a max Binary Heap the parent is greater than the children, but there are no guarantees between sibling nodes.
// A binary heap is as compact as possible. All the children of each node are as full
// as they can be and left children are filled out first.

// Why do we need to know this?
// Binary Heaps are used to implement Priority Queues, which are very commonly used data structures
// They are also used quite a bit, with graph traversal algorithms

// THERE'S AN EASY WAY OF STORING A BINARY HEAP...A LIST OR AN ARRAY
// With just a little bit of math, we can represent heaps using arrays!

// For any index of an array n...

// If you have a parent node at index n and want to find child nodes:
// The left child is stored at 2n + 1 index in the array
// The right child is at 2n + 2

// WHAT IF WE HAVE A CHILD NODE AND WANT TO FIND ITS PARENT?
// For any child node at index  n...
// Its parent is at index Math.floor((n-1)/2)

//                          100
//               19                   36
//         17         12        25          5
//      9    15    16   11   13     8    1     4
//
// [100, 19, 36, 17, 12, 25, 5, 9, 15, 16, 11, 13, 8, 1, 4]

// We fill in the left first and then the right

// Instead of creating bunch of nodes and storing them manually like we did in BST, instead
// we store them in an array and use their position in the array to model their actual structure.
// The index, individual numbers corrsponding to each item's positionis what actually gives that the structure of the heap.

// Each time we go down a step in bianry heap, we have two times the number of nodes
// Everytime we double the number of nodes, i.e, one full layer, we are only increasing the time it takes by one.

// Big O of Binary Heaps
// Insertion   -   O(log N)
// Removal     -   O(log N)
// Search      -   O(N)



//          41
//     39        33
// 18     27   12
// [41, 39, 33, 18, 27, 12]

class MaxBinaryHeap {
  constructor () {
    this.values = [41, 39, 33, 18, 27, 12]
  }

  insert (value) {
      // add it to the end
    this.values.push(value)

    // bubble the inserted value up to it's correct spot
    this.bubbleUp()
  }

  bubbleUp () {
    let currentIndex = this.values.length - 1
    let currentValue = this.values[currentIndex]

    while (currentIndex > 0) {
      let parentIndex = Math.floor((currentIndex - 1) / 2)
      let parentValue = this.values[parentIndex]

      if (currentValue > parentValue) {
          // swap the values
        this.values[currentIndex] = parentValue
        this.values[parentIndex] = currentValue

        currentIndex = parentIndex
      } else {
          // inserted element is in the right spot. So, break out of loop
        break
      }
    }
  }

  extractMax () {
      // Remove the root
      const max = this.values[0]
      const last = this.values.pop()

      // edge case
      if(this.values.length > 0) {
        // Replace with the most recently added
        this.values[0] = last;

        // Adjust (sink down)
        this.sinkDown()
      }

      return max
  }

  sinkDown () {
    let parentIndex = 0
    let parentValue = this.values[parentIndex]

    while (true) {
      let leftChildIndex = (2 * parentIndex) + 1
      let rightChildIndex = (2 * parentIndex) + 2
      let leftChildValue, rightChildValue
      let swap = null
      let swapIndex = null

      if (leftChildIndex < this.values.length) {
        leftChildValue = this.values[leftChildIndex]

        if (leftChildValue > parentValue) {
          swap = leftChildValue
          swapIndex = leftChildIndex
        }
      }

      if (rightChildIndex < this.values.length) {
        rightChildValue = this.values[rightChildIndex]

        if ((swap === null && rightChildValue > parentValue) || (swap !== null && rightChildValue > swap)) {
          swap = rightChildValue
          swapIndex = rightChildIndex
        }
      }

      if (swap) {
        this.values[parentIndex] = swap
        this.values[swapIndex] = parentValue
        parentIndex = swapIndex
      } else {
        break
      }
    }
  }
}

// SINK DOWN ?
// The procedure for deleting the root from the heap (effectively extracting the maximum element in
// a max-heap or the minimum element in a min-heap) and restoring the properties
// is called down-heap (also known as bubble-down, percolate-down, sift-down, trickle down,
// heapify-down, cascade-down, and extract-min/max).

const heap = new MaxBinaryHeap()
// heap.values // [41, 39, 33, 18, 27, 12]
heap.insert(55)
heap.insert(23)
// heap.values // [55, 39, 41, 23, 27, 12, 33, 18]
console.log(heap.extractMax())
heap.values // [41, 39, 33, 23, 27, 12, 18]
console.log(heap.values)
