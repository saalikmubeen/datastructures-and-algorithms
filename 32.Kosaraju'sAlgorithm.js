// Strongly Connected Components

// A directed graph is strongly connected if there is a path between all pairs of vertices.
// A strongly connected component (SCC) of a directed graph is a maximal strongly connected subgraph.

// We can find all strongly connected components in O(V+E) time using Kosaraju’s Algorithm.

// Time Complexity: The Kosaraju's algorithm calls DFS, finds reverse of the graph and again calls DFS.
// DFS takes O(V+E) for a graph represented using adjacency list.
// Reversing a graph also takes O(V+E) time. For reversing the graph, we simple traverse all adjacency lists.


class Graph {

    constructor(vertices) {
       this.vertices = vertices;
       this.adjacencyList = [...Array(vertices)].map((x) => []);
    }

    addEdge(src, dest) {

      if (!this.adjacencyList[src].includes(dest)) {
         this.adjacencyList[src].push(dest);
      }
    }

    dfsUtilForReversedGraph(vertex, visited, set) {
       // Mark the current node as visited;
       visited[vertex] = true;
       set.push(vertex);

       for(let neighbour of this.adjacencyList[vertex]) {
           // Recur for all the vertices(not visited yet) adjacent to this vertex
           if(!visited[neighbour]) {
              this.dfsUtilForReversedGraph(neighbour, visited, set)
           }
       }
    }



     // fillStack: Fill vertices in stack according to their finishing times
    dfsUtil(vertex, visited, stack) {
      // Mark the current node as visited
       visited[vertex]= true

       // Recur for all the vertices adjacent to this vertex
       for(let neighbour of this.adjacencyList[vertex]) {
          if(!visited[neighbour]) {
             this.dfsUtil(neighbour, visited, stack)
          }
       }

       stack.push(vertex);
    }


    // Function that returns reverse (or transpose) of this graph
    getTranspose() {
       let g = new Graph(this.vertices);

        for(let vertex = 0; vertex < this.vertices; vertex++) {

           // Recur for all the vertices adjacent to this vertex
           for(let neighbour of this.adjacencyList[vertex]) {
              g.addEdge(neighbour, vertex)
           }
        }

        return g;
    }


    // The main function that finds all the strongly connected components
    findSCCs() {

      let stack = [];
      let scc = [];

      // Mark all the vertices as not visited (For first DFS)
      let visited = Array(this.vertices).fill(false);


      // Fill vertices in stack according to their finishing times
      for(let vertex = 0; vertex < this.vertices; vertex++) {
          if(!visited[vertex]) {
              this.dfsUtil(vertex, visited, stack)
          }
      }

      // Create a reversed graph
      let g = this.getTranspose()

      // Mark all the vertices as not visited (For second DFS)
      visited = Array(this.vertices).fill(false);

       // Now process all vertices in order defined by Stack
       // Do a DFS based off vertex finish time in decreasing order on reverse graph..
       while(stack.length > 0) {

         let vertex = stack.pop();

         if(visited[vertex]) {
            continue;
         }

         let set = [];

         g.dfsUtilForReversedGraph(vertex, visited, set);
         scc.push(set);
       }

       return scc;
    }

}


let g = new Graph(5)
g.addEdge(1, 0)
g.addEdge(0, 2)
g.addEdge(2, 1)
g.addEdge(0, 3)
g.addEdge(3, 4)

console.log("Following are strongly connected components in given graph:")

console.log(g.findSCCs()) // [ [ 0, 1, 2 ], [ 3 ], [ 4 ] ]
