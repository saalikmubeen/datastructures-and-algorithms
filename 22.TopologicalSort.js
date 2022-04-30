// Topological Sort is ordering of vertices of a directed acyclic graph such that
// for every edge u, v going from vertex u to vertx v, u should always appear before v in the ordering.
// Topological Sorting for a graph is not possible if the graph is not a DAG.

//  Directed Acyclic Graph (DAG)

//                      0,    1,    2,    3,      4,   5
let adjacencyList = [ [ 1 ], [ 2 ], [], [ 0, 4 ], [], [ 2, 3, 4 ] ];


// v     -> number of vertices
// graph -> adjacencyList
function topologicalSort(v, graph) {
    const inDegree = new Array(v).fill(0);

    for (let edge of graph) {
        for (let target of edge) {
          inDegree[target]++;
        }
    }

    let stack = [];
    let order = [];

    for(let i = 0; i < inDegree.length; i++) {
      if(inDegree[i] === 0) {
        stack.push(i);
      }
    };

    while(stack.length) {
      const current = stack.pop();
      order.push(current)

      const adjacent = graph[current];

      for(let i = 0; i < adjacent.length; i++) {
        const next = adjacent[i];
        inDegree[next]--;
        if(inDegree[next] === 0) {
          stack.push(next);
        }
      }
    }

    return order;

}

console.log(topologicalSort(6, adjacencyList)) // [ 5, 3, 4, 0, 1, 2 ]

// recursive implementation of topologicalSort;

let adjList = {
    "A": ["B"],
    "B": ["C"],
    "C": [],
    "D": ["A", "E"],
    "E": [],
    "F": ["C", "D", "E"]
}


// Time Complexity: O(V+E).
// The below algorithm is simply DFS with an extra stack. So time complexity is the same as DFS which is.
// Auxiliary space: O(V).
// The extra space is needed for the stack.

function topologicalSortRecursive(graph) {
   let order = [];
   let visited = [];

   for (let vertex in graph) {
     if(visited.includes(vertex)) {
        continue;
     }

     topSort(vertex, order, visited, graph);
   }

    return order;
}

function topSort(vertex, order, visited, adjacencyList) {
   visited.push(vertex);

   for(let neighbour of adjacencyList[vertex]) {
      if(visited.includes(neighbour)) {
         continue;
      }

      topSort(neighbour, order, visited, adjacencyList)
   }


    order.unshift(vertex)
}


console.log(topologicalSortRecursive(adjList))  // [ 'F', 'D', 'E', 'A', 'B', 'C' ]
