// The Floyd Warshall Algorithm is for solving the "All Pairs Shortest Path problem".
// The problem is to find shortest distances between every pair of vertices in a given edge weighted directed Graph.

// Input:
//        graph =   [  [0,   5,  INF, 10],
//                     [INF,  0,  3,  INF],
//                     [INF, INF, 0,   1},
//                     [INF, INF, INF, 0] ]
// which represents the following graph
//              10
//        (0)------->(3)
//         |         /|\
//       5 |          |
//         |          | 1
//        \|/         |
//        (1)------->(2)
//             3
// Note that the value of graph[i][j] is 0 if i is equal to j
// And graph[i][j] is INF (infinite) if there is no edge from vertex i to j.


// Time Complexity: O(V^3)
function floydWarshall(graph) {
  let vertices = graph.length; // number of vertices

  // let dist = Array.from(Array(graph.length), () => new Array(graph.length).fill(0))
  let dist =  [...Array(vertices)].map(x => [...Array(vertices)].map(ele => 0))
  let i, j, k

  // Initialize the solution matrix same as input graph matrix
  // Or we can say the initial values of shortest distances
  // are based on shortest paths considering no intermediate vertex
  for (i = 0; i < vertices; i++) {
    for (j = 0; j < vertices; j++) {
      dist[i][j] = graph[i][j]
    }
  }

  for (k = 0; k < vertices; k++) {

   // Pick all vertices as source one by one
    for (i = 0; i < vertices; i++) {

    // Pick all vertices as destination for the above picked source
      for (j = 0; j < vertices; j++) {

      // If vertex k is on the shortest path from i to j, then update the value of dist[i][j]
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  // Detecting negative cycle using Floyd Warshall
  // If distance of any vertex from itself becomes negative, then there is a negative weight cycle.
    for (i = 0; i < vertices; i++) {
      if (dist[i][i] < 0) {
         console.log("Negative Cycle Detected")
      }
    }

    console.log("No negative Cycle Detected in the Graph")

  return dist;
}


let graph = [
        [0, 5, Infinity, 10],
        [Infinity, 0, 3, Infinity],
        [Infinity, Infinity, 0, 1],
        [Infinity, Infinity, Infinity, 0],
];




console.log(floydWarshall(graph));

// Result:

// [
//   [ 0, 5, 8, 9 ],
//   [ Infinity, 0, 3, 4 ],
//   [ Infinity, Infinity, 0, 1 ],
//   [ Infinity, Infinity, Infinity, 0 ]
// ]
