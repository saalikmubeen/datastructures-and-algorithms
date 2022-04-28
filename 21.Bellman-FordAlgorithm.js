// Bellman Ford Algorithm (Single Source Shortest Path Graph Algorithm)

// Bellman-Ford works with negative edges and detects negative weight cycle unlike Dijkstra's Algorithm.
// Bellman-Ford algorithm can handle directed and undirected graphs with non-negative weights.
// However, it can only handle directed graphs with negative weights, as long as we don’t have negative cycles.

// The time complexity of Bellman-Ford Algorithm is O(V * E)) average case,
// and O(E) best case, O(V^3) worst case. And space complexity is O(|V| + |E|)
// where V is the number of nodes, and E is the number of edges in the graph.


// Weighted Undirected Graph
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

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }

  addEdge(vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({node: vertex2, weight})
      this.adjacencyList[vertex2].push({node: vertex1, weight})
    }
  }

  bellmanFord(start, finish) {
    const v = Object.keys(this.adjacencyList).length; // number of vertices in the graph
    const distances = {} // stores the current shortest distace of each vertex from the start point;

    const history = {}

    const path = [] // to return at end

       // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0
      } else {
        distances[vertex] = Infinity
      }

      history[vertex] = null
    }


    for(let i = 0; i < v - 1; i++) {

        for(let vertex in this.adjacencyList) {

            let source = vertex;
            for (let targetNode of this.adjacencyList[vertex]) {
                let target = targetNode.node;
                let weight = targetNode.weight;

                if(distances[source] + weight < distances[target]) {
                   distances[target] = distances[source] + weight;
                   history[target] = source
                }
            }

        }

    }

    // Iterate one more time. If we still get lesser distance it means
    // there is negative weight cycle in the graph. Throw exception in that case
    for(let vertex in this.adjacencyList) {
        let source = vertex;
        for (let j = 0; j < this.adjacencyList[vertex].length; j++) {
            let node = this.adjacencyList[vertex][j]
            let target = node.node;
            let weight = node.weight;

            if(distances[source] + weight < distances[target]) {
                 throw new Error("Negative Cycle Detected in the graph!")
            }
        }
    }

    // Build the shortest path to return
    while (history[finish]) {
      path.push(finish)
      finish = history[finish]
    }


    // shortest path from start point to finish point
    return path.concat(start).reverse()
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

const shortestPath = graph.bellmanFord('A', 'E')  // [ 'A', 'C', 'D', 'F', 'E' ]
console.log(shortestPath)
