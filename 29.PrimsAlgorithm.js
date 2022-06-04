// Prims’s Minimum Spanning Tree Algorithm , Minimum Cost Spanning Tree(MST)
//
// What is Minimum Spanning Tree?
// Given a connected and undirected graph, a spanning tree of that graph is a tree and connects all the vertices together.
// A single graph can have many different spanning trees. A minimum spanning tree (MST) or minimum weight spanning tree for a weighted,
// connected, undirected graph is a spanning tree with a weight less than or equal to the weight of every other spanning tree.
// The weight of a spanning tree is the sum of weights given to each edge of the spanning tree.
// How many edges does a minimum spanning tree has?
// A minimum spanning tree has (V – 1) edges where V is the number of vertices in the given graph.




class PriorityQueue {

  constructor(){
    this.values = [];
  }

  enqueue(from, to, weight) {
    this.values.push({from, to, weight});
    this.sort();
  };

  dequeue() {
    return this.values.shift();
  };

  sort() {
    this.values.sort((a, b) => a.weight - b.weight);
  };

}


// for Adjacency Matrix
function primsAlgorithm(graph) {
   let vertices = graph.length // number of vertices or nodes in the graph;
   let m = vertices - 1 // number of edges in spanning tree

   let edgeCount = 0;
   let mstCost = 0;

   let mstEdges = [] // length m

   // visited[i] tracks whether node/vertex i has beeen visited or not;
   const visited = [...Array(vertices)].map(ele => false);
   const queue = new PriorityQueue();

   // initialize the queue with edges from node 0 to rest of nodes
   for(let i = 1; i < vertices; i++) {
      if(graph[0][i] !== Infinity) {
         queue.enqueue(0, i, graph[0][i])
      }
   }

   visited[0] = true;

   // Loop while the MST is not complete
   while(edgeCount !== m && queue.values.length > 0) {

     let minEdge = queue.dequeue();

     if(!visited[minEdge.to]) {
       for(let i = 0; i < vertices; i++) {

          // enque all the neighbours(not visited) of minEdge
          if(!visited[i] && graph[minEdge.to][i] != Infinity) {
            queue.enqueue(minEdge.to, i, graph[minEdge.to][i])
          }
       }

       mstCost += minEdge.weight;
       visited[minEdge.to] = true;
       edgeCount++
       mstEdges.push(minEdge);
     }
   }

   // Make sure MST spans the whole graph
    if (edgeCount !== m) {
      return null
    };

   return mstEdges;
}


/* Let us create the following graph
       2    3
   (0)--(1)--(2)
   | / \ |
   6| 8/ \5 |7
   | /     \ |
   (3)-------(4)
        9         */


let graph = [
    //  0       1   2        3   4
    [ Infinity, 2, Infinity, 6, Infinity ],  // 0
    [ 2, Infinity, 3, 8, 5 ],                // 1
    [ Infinity, 3, Infinity, Infinity, 7 ],  // 2
    [ 6, 8, Infinity, Infinity, 9 ],         // 3
    [ Infinity, 5, 7, 9, Infinity ]          // 4
];

console.log(primsAlgorithm(graph))

//Result:

// Min Cost = 16

// [
//   { from: 0, to: 1, weight: 2 },
//   { from: 1, to: 2, weight: 3 },
//   { from: 1, to: 4, weight: 5 },
//   { from: 0, to: 3, weight: 6 }
// ]



// For Adjacency List
function primsAlgorithm2(graph) {
   let vertices = graph.length // number of vertices or nodes in the graph;
   let m = vertices - 1 // number of edges in spanning tree

   let edgeCount = 0;
   let mstCost = 0;

   let mstEdges = [] // length m

   // visited[i] tracks whether node/vertex i has beeen visited or not;
   const visited = [...Array(vertices)].map(ele => false);
   const queue = new PriorityQueue();

   function addEdges(nodeIndex) {

      // mark the current node as visited
      visited[nodeIndex] = true;

      // iterate over all the edges going outwards from the current node
      // add edges to the queue which point to unvisited nodes

      let edges = graph[nodeIndex];

      for(let edge of edges) {
        if(!visited[edge.to]) {
          queue.enqueue(nodeIndex, edge.to, edge.weight); // {from: nodeIndex, to: edge.to, weight: edge.weight}
        }
      }
   }

   addEdges(0);

   while(edgeCount !== m && queue.values.length > 0) {
      let minEdge = queue.dequeue();

      let nextNode = minEdge.to;

      if(visited[nextNode]) {
        continue
      }

      mstCost += minEdge.weight;
      edgeCount++
      mstEdges.push(minEdge);

      addEdges(nextNode)

   }

   // No MST exists
   if (edgeCount !== m) {
     return null
   };

   return mstEdges;

}

class node {
    constructor (to, weight)
    {
        this.to = to;
        this.weight = weight;
    }
}


class Graph {
    constructor() {
        this.adjacencyList = [];
    }


    addEdge(src ,dest, weight) {
        let node1 = new node(dest, weight);
        let node2 = new node(src, weight);

        if(!this.adjacencyList[src]) {
          this.adjacencyList[src] = []
        }

        if(!this.adjacencyList[dest]) {
          this.adjacencyList[dest] = []
        }

        this.adjacencyList[src].push(node1);
        this.adjacencyList[dest].push(node2);
}
}


let adjacencyList = new Graph();
adjacencyList.addEdge(0, 1, 4);
adjacencyList.addEdge(0, 7, 8);
adjacencyList.addEdge(1, 2, 8);
adjacencyList.addEdge(1, 7, 11);
adjacencyList.addEdge(2, 3, 7);
adjacencyList.addEdge(2, 8, 2);
adjacencyList.addEdge(2, 5, 4);
adjacencyList.addEdge(3, 4, 9);
adjacencyList.addEdge(3, 5, 14);
adjacencyList.addEdge(4, 5, 10);
adjacencyList.addEdge(5, 6, 2);
adjacencyList.addEdge(6, 7, 1);
adjacencyList.addEdge(6, 8, 6);
adjacencyList.addEdge(7, 8, 7);

console.log(primsAlgorithm2(adjacencyList.adjacencyList))

// Result:

// Min Cost = 37

// [
//   { from: 0, to: 1, weight: 4 },
//   { from: 0, to: 7, weight: 8 },
//   { from: 7, to: 6, weight: 1 },
//   { from: 6, to: 5, weight: 2 },
//   { from: 5, to: 2, weight: 4 },
//   { from: 2, to: 8, weight: 2 },
//   { from: 2, to: 3, weight: 7 },
//   { from: 3, to: 4, weight: 9 }
// ]
