// WHAT IS A TREE?
// A data structure that consists of nodes in a parent / child relationship
// Lists - linear
// Trees - nonlinear

// TREE TERMINOLOGY
// Root - The top node in a tree.
// Child -A node directly connected to another node when moving away from the Root.
// Parent - The converse notion of a child.
// Siblings -A group of nodes with the same parent.
// Leaf - A node with no children.
// Edge - The connection(arrow) between one node and another.

// Lots of different applications!
// HTML DOM
// Network Routing
// Abstract Syntax Tree
// Artificial Intelligence
// Folders in Operating Systems
// Computer File Systems

// Binary trees are special case of trees where each node can have a maximum of 2 children; 0, 1 or 2
// Binary Search Trees(BSTs) are special case of Binary trees and are sorted in a particular way,
// ensuring that every node's left hand child is less than the parent node's value, and that
// every node's right hand child is greater than the parent

// Big O of BST
// Insertion  -  O(log n)
// Searching  -  O(log n)
// O(log n) :  Double the number of nodes, You only increase the number of steps to insert/find by 1
// 2x number of nodes: 1 extra step
// 4x number of nodes: 2 extra steps
// 8x number of nodes: 3 extra steps
// *NOT guaranteed!

// Tree Traversal - Visit every node once

// Two ways:
// Breadth-first Search (BFS)
// Depth-first Search   (DFS)  -> InOrder, PreOrder and PostOrder

// visit the node, traverse the left and traverse the right
// PreOrder -> visit the node first(i.e, add it to the list), then traverse the entire left and then traverse the entire right (NLR)
// PostOrder -> visit the node after. Traverse the left and the right and then visit the node(i.e, add it to the list) (LRN)
// InOrder -> traverse the entire left side, then visit the node(i.e, add it to the list) and then traverse the entire right (LNR)

// DFS uses a stack (push and pop) and BFS uses a queue(push and shift)

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    let current = this.root;

    if (!current) {
      this.root = newNode;
      return this;
    }

    while (true) {
      if (value === current.value) {
        return null;
      }

      // check if the value is greater than the current node value
      if (value > current.value) {
        // check if there is a right value
        if (current.right) {
          current = current.right;
        } else {
          // if there is not a right node, then insert the node
          current.right = newNode;
          return this;
        }
      } else if (value < current.value) {
        // check if there is a left value
        if (current.left) {
          current = current.left;
        } else {
          current.left = newNode;
          return this;
        }
      }
    }
  }

  insertRecursive(root, val) {
    if (!root) {
      return new Node(value);
    }

    if (val > root.value) {
      root.right = this.insertRecursive(root.right, val);
    } else if (val < root.value) {
      root.left = this.insertRecursive(root.left, val);
    }

    return root;
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (value > current.value) {
        current = current.right;
      } else if (value < current.value) {
        current = current.left;
      } else {
        // value = current.value
        return current;
      }
    }

    return null;
  }

  // recursive
  contains(value, root = this.root) {
    if (root === null) return false;
    if (value === root.value) return true;
    return (
      this.contains(value, root.left) ||
      this.contains(value, root.right)
    );
  }

  minValueNode() {
    let current = this.root;
    if (!current) return null;

    while (current && current.left) {
      current = current.left;
    }

    return current;
  }

  minValueOfASubtree(node) {
    if (!node) return null;

    while (node && node.left) {
      node = node.left;
    }

    return node;
  }

  findMaxValueOfASubtree(node) {
    if (!node) return null;

    while (node && node.right) {
      node = node.right;
    }

    return node;
  }

  remove(root, value) {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.remove(root.left, value);
    } else if (value > root.value) {
      root.right = this.remove(root.right, value);
    } else {
      // Node with only one child or no child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      } else {
        // Node with two children: Get the inorder successor (smallest in the right subtree)
        const minNodeVal = this.minValueOfASubtree(root.right);

        // Copy the inorder successor's content to this node
        root.value = minNodeVal.value;

        // Delete the inorder successor
        root.right = this.remove(root.right, minNodeVal.value);
      }
    }

    return root;
  }

  removeIterative(value) {
    let current = this.root;
    let parent = null;

    while (current) {
      if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      } else {
        // Node with only one child or no child
        if (!current.left) {
          if (parent) {
            parent.left = current.right;
          } else {
            this.root = current.right;
          }
        } else if (!current.right) {
          if (parent) {
            parent.left = current.left;
          } else {
            this.root = current.left;
          }
        } else {
          // Node with two children: Get the inorder successor
          const minNodeVal = this.minValueOfASubtree(current.right);
          current.value = minNodeVal.value;
          this.removeIterative(minNodeVal.value);
        }
        return true;
      }
    }

    return false;
  }

  // Level Order Traversal
  BFS() {
    let current = this.root;
    if (!current) return null;

    const queue = [current];
    const results = [];

    while (queue.length) {
      let node = queue.shift();
      results.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return results;
  }

  DFSPreOrderIterative() {
    let current = this.root;
    if (!current) return null;

    const stack = [current];
    const results = [];

    while (stack.length) {
      let node = stack.shift();
      results.push(node.value);
      if (node.right) stack.unshift(node.right);
      if (node.left) stack.unshift(node.left);
    }

    return results;
  }

  DFSPreOrder() {
    if (!this.root) return null;

    const results = [];

    function traverse(node) {
      results.push(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return results;
  }

  DFSPostOrderIterative() {
    let current = this.root;
    if (!current) return null;

    const stack = [current];
    const results = [];

    while (stack.length) {
      let node = stack.pop();
      results.unshift(node.value);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    return results;
  }

  DFSPostOrder() {
    if (!this.root) return null;

    const results = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      results.push(node);
    }

    traverse(this.root);
    return results;
  }

  DFSInOrderIterative() {
    let current = this.root;
    if (!current) return null;

    const stack = [];
    const results = [];

    while (true) {
      if (current !== null) {
        stack.push(current);
        current = current.left;
      } else {
        if (stack.length === 0) {
          break;
        }
        current = stack.pop();
        results.push(current.value);
        current = current.right;
      }
    }

    return results;
  }

  DFSInOrder() {
    if (!this.root) return null;

    const results = []; // this will be an array of node values in sorted order i.e from smallest to largest
    // inorder traversal gives us sorted order of the nodes in a BST
    // i.e, if we do an inorder traversal of a BST, we will get the values in sorted order

    function traverse(node) {
      if (node.left) traverse(node.left);
      results.push(node.value);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return results;
  }

  // OR
  // DFSInOrder2(root) {
  //   if (!root) return null;

  //   this.DFSInOrder2(root.left);
  //   console.log(root.value);
  //   this.DFSInOrder2(root.right);
  // }

  printAllLeafs(root = this.root) {
    if (root === null) return null;

    if (root.left === null && root.right === null) {
      console.log(root.value);
    }

    if (root.left !== null) {
      this.printAllLeafs(root.left);
    }

    if (root.right !== null) {
      this.printAllLeafs(root.right);
    }
  }

  sumAll(node = this.root) {
    if (node === null) return 0;

    return (
      node.value + this.sumAll(node.left) + this.sumAll(node.right)
    );
  }

  maxRootToLeafSum(root = this.root) {
    if (root === null) return -Infinity;
    if (root.left === null && root.right === null) return root.value;
    return (
      root.value +
      Math.max(
        this.maxRootToLeafSum(root.left),
        this.maxRootToLeafSum(root.right)
      )
    );
  }
}

//      10
//   5     13
// 2  7  11  16

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(10);
tree.insert(7);
console.log(tree.contains(11));
console.log(tree.sumAll());
console.log(tree.maxRootToLeafSum()); // 39
// tree.printAllLeafs()                   //  [2, 7, 11, 16]
// console.log(tree.find(13))
// console.log(tree.BFS())              // [10, 5, 13, 2, 7, 11, 16]
// console.log(tree.DFSPreOrder())      // [10, 5, 2, 7, 13, 11, 16] -> Can be used to "export" a tree structure
// so that it is easily reconstructed or copied
// console.log(tree.DFSPostOrder())     // [2, 7, 5, 11, 16, 13, 10]
// console.log(tree.DFSInOrder())       // [2, 5, 7, 10, 11, 13, 16] -> Notice we get all nodes in the tree in their underlying order

// Validate if Binary Search Tree is Valid;
let isValidBST = function (root, min = -Infinity, max = Infinity) {
  if (root.val >= max) return false;
  if (root.val <= min) return false;

  if (root.left) {
    if (!isValidBST(root.left, min, root.val)) {
      return false;
    }
  }

  if (root.right) {
    if (!isValidBST(root.right, root.val, max)) {
      return false;
    }
  }

  return true;
};

// OR

let isValidBST2 = function (tree, min = -Infinity, max = Infinity) {
  if (tree === null) {
    return true;
  }

  if (tree.val < min || tree.val > max) {
    return false;
  }

  let isLeftValid = isValidBST2(tree.left, min, tree.val);
  let isRightValid = isValidBST2(tree.right, tree.val, max);

  return isLeftValid && isRightValid;
};

// Invert a binary tree -> Given the root of a binary tree, invert the tree, and return its root.
let invertTree = function (root) {
  if (root === null) {
    return root;
  }

  let left = root.left;
  let right = root.right;

  root.left = right;
  root.right = left;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};

let invertTreeIterative = function (root) {
  let queue = [root];

  while (queue.length > 0) {
    let current = queue.shift();

    if (current === null) {
      continue;
    }

    // swap left and right;
    let left = current.left;
    current.left = current.right;
    current.right = left;

    queue.push(current.left);
    queue.push(current.right);
  }
};
