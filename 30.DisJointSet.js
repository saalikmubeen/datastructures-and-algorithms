// Applications of DisJoint Sets:

// Kruskal’s Minimum Spanning Tree Algorithm.
// Job Sequencing Problem.
// Cycle Detection

// 1. ARRAY Representation:

 // Data Structures used:
 // 1. Parent Array : An array of integers, called parent[]. If we are dealing with n items, i’th element of the array
 // represents the i’th item. More precisely, the i’th element of the array is the parent of the i’th item.
 // These relationships create one, or more, virtual trees
// 2. Rank Array : An array of integers called rank[]. Size of this array is same as the parent array.
// If i is a representative of a set, rank[i] is the height of the tree representing the set.

class DisJointSet {

   constructor(n) {
      this.rank =  Array(n).fill(1);
      this.parent = [...Array(n)].map((x, idx) => idx);
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



set = new DisJointSet(5)
set.union(0, 2)
set.union(4, 2)
set.union(3, 1)

if (set.find(4) === set.find(0)) {
   console.log('Belongs to same set')
} else {
   console.log("Belongs to different sets")
}

if (set.find(1) === set.find(0)) {
   console.log('Belongs to same set')
} else {
   console.log("Belongs to different sets")
}


// 2. Tree Representation

class Node {
     constructor(data, rank) {
        this.data = data
        this.parent = this;
        this.rank = rank
     }
}

class DisJointSet2 {

    constructor() {
       this.map = {};
    }

    makeSet(data) {
       let node = new Node(data, 0);
       this.map[data] = node;
    }



    find(data) {
        let node = this.map[data];

        if(node.parent.data === data) {
           return node.parent
        }

        node.parent = this.find(node.parent.data);

        return node.parent
    }

    union(x, y) {
       let xNode = this.map[x];
       let yNode = this.map[y];

       let xSet = this.find(xNode.data);
       let ySet = this.find(yNode.data);

        // if they are part of same set do nothing
       if(xSet.data === ySet.data) {
         return;
       }

       // else whoever's rank is higher becomes parent of other
       if(xSet.rank < ySet.rank) {
         xSet.parent = ySet;
       } else if(ySet.rank < xSet.rank) {
         ySet.parent = xSet;
       } else {
           ySet.parent = xSet;
           xSet.rank = xSet.rank + 1
       }
    }

}


ds = new DisJointSet2();
ds.makeSet(1);
ds.makeSet(2);
ds.makeSet(3);
ds.makeSet(4);
ds.makeSet(5);
ds.makeSet(6);
ds.makeSet(7);

ds.union(1, 2);
ds.union(2, 3);
ds.union(4, 5);
ds.union(6, 7);
ds.union(5, 6);
ds.union(3, 7);

console.log(ds.find(1)); // node with data 4
console.log(ds.find(2)); // node with data 4
console.log(ds.find(3)); // node with data 4
console.log(ds.find(4)); // node with data 4
console.log(ds.find(5)); // node with data 4
console.log(ds.find(6)); // node with data 4
console.log(ds.find(7)); // node with data 4 
