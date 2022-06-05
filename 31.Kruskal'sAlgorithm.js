// Kruskal’s Minimum Spanning Tree Algorithm | Greedy Algorithm


// The steps for finding MST using Kruskal’s algorithm

// 1. Sort all the edges in non-decreasing order of their weight.
// 2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far (if the vertices of the edge belong to same set)
// If cycle is not formed, include this edge. Else, discard it.
// 3. Repeat step#2 until there are (V-1) edges in the spanning tree.

// Time Complexity: O(ElogE) or O(ElogV). Sorting of edges takes O(ELogE) time.

class Graph {

    constructor(vertices) {
       this.vertices = vertices
       this.graph = []
       this.parent = [...Array(vertices)].map((x, idx) => idx);
       this.rank = Array(vertices).fill(1);
    }


    addEdge(u, v, w) {
      this.graph.push([u, v, w])
    }

    // Finds Set(parent or representative) of given item x
    find(x) {

       if(this.parent[x] === x) {
         return this.parent[x];
       }

       //Finds the representative of the set that x is an element of

        // we recursively call Find on its parent
       let result = this.find(this.parent[x]);

       // path compression
       // move i's node directly under the representative of this Set
       this.parent[x] = result;

       return this.parent[x];
    }

    // Do union of two sets represented by x and y.
    union(x, y) {

       const xSet = this.find(x);
       const ySet = this.find(y);

       // both x and y belong to same set
       if(xSet === ySet) {
          return
       }


       // Union by Rank
       // Put smaller ranked item under bigger ranked item if ranks are different
       if(this.rank[xSet] < this.rank[ySet]) {
          this.parent[xSet] = ySet
       } else if(this.rank[ySet] < xSet) {
         this.parent[ySet] = xSet
       } else {
         // If ranks are same, then move y under x (doesn't matter which one goes where) and increment rank of x's tree;

         this.parent[ySet] = xSet;
         this.rank[xSet] = this.rank[xSet] + 1;
       }
    }
}



function kruskalsAlgorithm(graph) {
     let vertices = graph.vertices // number of vertices or nodes in the graph;
     let m = vertices - 1 // number of edges in spanning tree

     let mstEdges = [] // length m
     let edgeCount = 0;
     let mstCost = 0;

     // sort the graph in ascending order of edge weight

     graph.graph.sort((a, b) => a[2] - b[2]);


     // Create V(no. of vertices) subsets with single elements(vertex);
     let parent = graph.parent;
     let rank = graph.rank


     let i = 0;
     // Number of edges to be taken is equal to V-1
     while (edgeCount < m) {

       // Pick the smallest edge and increment the index for next iteration;
       let minEdge = graph.graph[i];
       i = i + 1
       let [u, v, w] = minEdge;

       let x = graph.find(u)
       let y = graph.find(v)

       // If including this edge doesn't cause cycle(i.e, x !== y), include it in result
       if(x !== y) {
          mstEdges.push(minEdge);
          mstCost += w
          graph.union(x, y)
          edgeCount += 1
       } // else discard the edge

     }

     console.log(mstCost)
     return mstEdges;
}



g = new Graph(4)
g.addEdge(0, 1, 10)
g.addEdge(0, 2, 6)
g.addEdge(0, 3, 5)
g.addEdge(1, 3, 15)
g.addEdge(2, 3, 4)

console.log(kruskalsAlgorithm(g))

// Result:

// Minimum Cost of Spanning Tree: 19

// [
//   [ 2, 3, 4 ],
//   [ 0, 3, 5 ],
//   [ 0, 1, 10 ]
// ]
