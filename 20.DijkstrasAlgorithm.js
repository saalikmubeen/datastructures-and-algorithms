// Dijkstra's Algorithm (Shortest Path Algorithm)

// One of the most famous and widely used algorithms around!
// Finds the shortest path between two vertices on a graph
// "What's the fastest way to get from point A to point B?"

// The time complexity of Dijkstra’s Algorithm is O(V + E * log(V)),
// And space complexity is O(|V| + |E|)
// where V is the number of nodes, and E is the number of edges in the graph.

class Node {
  constructor (val, priority) {
    this.val = val
    this.priority = priority
  }
}

// MinBinaryHeap
class PriorityQueue {

  constructor () {
    this.values = []
  }

  enqueue (val, priority) {
    let newNode = new Node(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
  }

  bubbleUp () {
    let idx = this.values.length - 1
    const element = this.values[idx]
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2)
      let parent = this.values[parentIdx]
      if (element.priority >= parent.priority) break
      this.values[parentIdx] = element
      this.values[idx] = parent
      idx = parentIdx
    }
  }

  dequeue () {
    const min = this.values[0]
    const end = this.values.pop()
    if (this.values.length > 0) {
      this.values[0] = end
      this.sinkDown()
    }
    return min
  }

  sinkDown () {
    let idx = 0
    const length = this.values.length
    const element = this.values[0]
    while (true) {
      let leftChildIdx = 2 * idx + 1
      let rightChildIdx = 2 * idx + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx]
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx]
        if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
          swap = rightChildIdx
        }
      }
      if (swap === null) break
      this.values[idx] = this.values[swap]
      this.values[swap] = element
      idx = swap
    }
  }

}

class WeightedGraph {

  constructor () {
    this.adjacencyList = {}
  }

    //  ADJACENCY LIST STRUCTURE
    // {
    //      A: [ { node: 'B', weight: 4 }, { node: 'C', weight: 2 } ],
    //      B: [ { node: 'A', weight: 4 }, { node: 'E', weight: 3 } ],
    //      C: [
    //           { node: 'A', weight: 2 },
    //           { node: 'D', weight: 2 },
    //           { node: 'F', weight: 4 }
    //         ],
    //      D: [
    //           { node: 'C', weight: 2 },
    //           { node: 'E', weight: 3 },
    //           { node: 'F', weight: 1 }
    //         ],
    //      E: [
    //           { node: 'B', weight: 3 },
    //           { node: 'D', weight: 3 },
    //           { node: 'F', weight: 1 }
    //      ],
    //      F: [
    //           { node: 'C', weight: 4 },
    //           { node: 'D', weight: 1 },
    //           { node: 'E', weight: 1 }
    //      ]
    // }

  addVertex (vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }

  addEdge (vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({node: vertex2, weight})
      this.adjacencyList[vertex2].push({node: vertex1, weight})
    }
  }

  dijkstra (start, finish) {
    const distances = {} // stores the current shortest distace of each vertex from the start point;
    const queue = new PriorityQueue() // priority queue
    const history = {}
    const visited = [] // nodes/vertices we have visited
    const path = [] // to return at end

       // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0
        queue.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        queue.enqueue(vertex, Infinity)
      }

      history[vertex] = null
    }

    let smallest

       // as long as there is something in the priority queue (to visit)
    while (queue.values.length) {
      smallest = queue.dequeue().val // current smallest value(vertex with least distance) from the start point

      if (smallest === finish) {
             // WE ARE DONE
             // Build the shortest path to return
        while (history[smallest]) {
          path.push(smallest)
          smallest = history[smallest]
        }
        break
      }

      // for safety
      if (smallest || distances[smallest] !== Infinity) {

        for (let neighbour of this.adjacencyList[smallest]) {
             // calculate new distance to neighboring node from start point
          let candidate = distances[smallest] + neighbour.weight

             // is this distance less than what we are currently storing
          if (candidate < distances[neighbour.node]) {
               // updating new smallest distance to neighbour from start point
            distances[neighbour.node] = candidate

               // update history - How we got to neighbour
            history[neighbour.node] = smallest

               // enqueue in priority queue with new priority (current/new smallest distance to reach
               // this neighbouring node from the start point
            queue.enqueue(neighbour.node, candidate)
          }

        }

      }
    }

       // shortest path from start point to finish point
    return path.concat(smallest).reverse()
  }

}

const graph = new WeightedGraph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')

graph.addEdge('A', 'B', 4)
graph.addEdge('A', 'C', 2)
graph.addEdge('B', 'E', 3)
graph.addEdge('C', 'D', 2)
graph.addEdge('C', 'F', 4)
graph.addEdge('D', 'E', 3)
graph.addEdge('D', 'F', 1)
graph.addEdge('E', 'F', 1)

const shortestPath = graph.dijkstra('A', 'E')  // [ 'A', 'C', 'D', 'F', 'E' ]
console.log(shortestPath)
