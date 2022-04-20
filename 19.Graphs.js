// WHAT ARE GRAPHS
// A graph data structure consists of a finite (and possibly mutable) set of vertices or nodes or points,
// together with a set of unordered pairs of these vertices for an undirected graph
// or a set of ordered pairs for a directed graph.

// WHAT
// Nodes(verices) + Connections(edges)

// ESSENTIAL GRAPH TERMS
// Vertex - a node
// Edge - connection between nodes
// Weighted/Unweighted - values assigned to distances between vertices
// Directed/Undirected - directions assigned to distanced between vertices

// Tree is a graph in which any two vertices are connected by exactly only one path.

// How do we store/represent a graph ?
// 1. Adjacent Matrix
// 2. Adjacency List
// 3. Edge List


// DIFFERENCES & BIG O OPERATION	ADJACENCY LIST	ADJACENCY MATRIX:
// |V| - number of vertices
// |E| - number of edges

// OPERATION      AdjacencyList    AdjacencyMatrix

// Add Vertex	     O(1)	            ​O(|V^2|)
// Add Edge  	     O(1)	            O(1)
// Remove Vertex   O(|V| + |E|)	    ​O(|V^2|)
// Remove Edge	   O(|E|)           O(1)
// Query       	   O(|V| + |E|)	    O(1)
// Storage	       O(|V| + |E|)	​    O(|V^2|)

// 1. Adjacency List
// Can take up less space (in sparse graphs)
// Faster to iterate over all edges
// Can be slower to lookup specific edge

// 2. Adjacency Matrix
// Takes up more space (in sparse graphs)
// Slower to iterate over all edges
// Faster to lookup specific edge

// 3. Edge List
// An edge list is a way to represent a graph
// simply as an unordered list of edges. Assume
// the notation for any triplet (u,v,w) means:
// “the cost from node u to node v is w
// [(C,A,4), (A,C,1),(B,C,6), (A,B,4), (C,B,1), (C,D,2)]
// Space efficient for representing sparse graphs
// Less space efficient for denser graphs.
// Iterating over all edges is efficient Edge weight lookup is O(E)
// Very simple structure

// Graph Traversal - Visiting/Updating/Checking each vertex in a graph
// 1. DEPTH FIRST:    Explore as far as possible down one branch before "backtracking"
// 2. BREADTH FIRST:  Visit neighbors at current depth first!

// Undirected Graph
class Graph {

  constructor () {
    this.adjacencyList = {}

     // {
     //   vertexName: [list of all the vertices this vertex is linked/connected to]
     // }

     // {
     //    A: [ 'B', 'C' ],
     //    B: [ 'A', 'D' ],
     //    C: [ 'A', 'E' ],
     //    D: [ 'B', 'E', 'F' ],
     //    E: [ 'C', 'D', 'F' ],
     //    F: [ 'D', 'E' ]
     // }

  }

  addVertex (vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }

  addEdge (vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2)
      this.adjacencyList[vertex2].push(vertex1)
    }
  }

  removeEdge (vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((vertex) => vertex !== vertex2)

      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((vertex) => vertex !== vertex1)
    }
  }

  removeVertex (vertex) {
    if (!this.adjacencyList[vertex]) {
      return
    }

    this.adjacencyList[vertex].forEach((adjacentVertex) => {
      this.adjacencyList[adjacentVertex] =
                  this.adjacencyList[adjacentVertex].filter((v) => v !== vertex)
    })

    delete this.adjacencyList[vertex]
  }

  // removeVertex(vertex){
  //     while(this.adjacencyList[vertex].length){
  //         const adjacentVertex = this.adjacencyList[vertex].pop();
  //         this.removeEdge(vertex, adjacentVertex);
  //     }
  //     delete this.adjacencyList[vertex]
  // }

  depthFirstRecursive (start) {
    const results = []
    const visited = []
    const adjacencyList = this.adjacencyList

    const dfs = (vertex) => {
      if (!vertex) {
        return null
      }

      visited[vertex] = true
      results.push(vertex)

      adjacencyList[vertex].forEach((neighbour) => {
        if (!visited[neighbour]) {
          dfs(neighbour)
        }
      })
    }

    dfs(start)
    return results
  }

  depthFirstIterative (start) {
    const results = []
    const visited = []
    const stack = [start]
    const adjacencyList = this.adjacencyList

    visited[start] = true;
    while (stack.length) {
      let vertex = stack.pop()
      results.push(vertex)

      adjacencyList[vertex].forEach((neighbour) => {
        if (!visited[neighbour]) {
          visited[neighbour] = true
          stack.push(neighbour)
        }
      })
    }

    return results;
  }

  breadthFirstIterative(start) {
    const results = []
    const visited = []
    const queue = [start]
    const adjacencyList = this.adjacencyList

    visited[start] = true;
    while (queue.length) {
      let vertex = queue.shift()
      results.push(vertex)

      adjacencyList[vertex].forEach((neighbour) => {
        if (!visited[neighbour]) {
          visited[neighbour] = true
          queue.push(neighbour)
        }
      })
    }

    return results;
  }

}

let g = new Graph()

// g.addVertex('Dallas')
// g.addVertex('Tokyo')
// g.addVertex('Aspen')
// g.addVertex('Los Angeles')
// g.addVertex('Hong Kong')
// g.addEdge('Dallas', 'Tokyo')
// g.addEdge('Dallas', 'Aspen')
// g.addEdge('Hong Kong', 'Tokyo')
// g.addEdge('Hong Kong', 'Dallas')
// g.addEdge('Los Angeles', 'Hong Kong')
// g.addEdge('Los Angeles', 'Aspen')
//
// console.log(g.adjacencyList)
// g.removeVertex('Hong Kong')
// console.log(g.adjacencyList)

g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')
g.addVertex('F')

g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('B', 'D')
g.addEdge('C', 'E')
g.addEdge('D', 'E')
g.addEdge('D', 'F')
g.addEdge('E', 'F')

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

console.log(g.adjacencyList)
console.log(g.depthFirstRecursive('A'))   // [ 'A', 'B', 'D', 'E', 'C', 'F' ]
console.log(g.depthFirstIterative('A'))   // [ 'A', 'C', 'E', 'F', 'D', 'B' ]
console.log(g.breadthFirstIterative('A')) // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
