// What is a linked list?
// A data structure that contains a head, tail and length property.
// Linked Lists consist of nodes, and each node has a value and a pointer to another node or null


// Big O of Singly Linked Lists
// Insertion -  O(1)
// Removal -    It depends.... O(1) or O(N)
// Searching -  O(N)
// Access -     O(N)

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}


class SinglyLinkedList {
    constructor() {
      this.head = null
      this.tail = null
      this.length = 0
    }

    push(value) {
      const newNode = new Node(value)

      // if list is empty
      if(!this.head) {
        this.head = this.tail = newNode
        this.length++
        return this
      }

      // there are some existing nodes in the list
      const currentTail = this.tail;
      currentTail.next = newNode
      this.tail = newNode
      this.length++
      return this
    }


    // pop() {
    //
    //   // if there is no element in the list
    //   if(!this.head) {
    //     return null
    //   }
    //
    //   // if there is only one element in the list
    //   if(!this.head.next) {
    //      const currentTail = this.tail;
    //      this.head = this.tail = null;
    //      this.length--
    //      return currentTail
    //   }
    //
    //    let secondLast = this.head;
    //
    //   while(secondLast.next.next) {
    //     secondLast = secondLast.next
    //   }
    //
    //   secondLast.next = null;
    //   let currentTail = this.tail // last
    //   this.tail = secondLast
    //   this.length--
    //
    //   return currentTail;
    // }

    // OR

    pop() {

      // if there is no element in the list
        if(!this.head) {
          return null
        }

        let secondLast = this.head
        let current = this.head; //removeLast

        while(current.next) {
            secondLast = current;
            current = current.next
        }

        secondLast.next = null
        this.tail = secondLast
        this.length--

        // catches the case when there is only one node in the list
        if(this.length === 0) {
          this.head = null
          this.tail = null
        }

        return current
    }

    shift() {
      // if there is no element in the list
      if(!this.head) {
        return null
      }
      // if there is only one element in the list
      if(!this.head.next) {
          const currentHead = this.head
          this.head = this.tail = null
          this.length--
          return currentHead
      }

      const currentHead = this.head;
      const newHead = currentHead.next
      this.head = newHead
      this.length--
      return currentHead
    }

    unshift(value) {
      const newNode = new Node(value);
      const currentHead = this.head;
      newNode.next = currentHead
      this.head = newNode
      this.length++

      // if list was empty
      if(!currentHead) {
          this.tail = newNode
      }

      return this
    }

    get(index) {

      if(index < 0 || index > this.length -1) {
         return null
      }

      let current = this.head;
      let i = 0
      while(i < index) { // OR while(i !== index)
        current = current.next;
        i++
      }

      return current
    }


    set(index, value) {
       const foundNode = this.get(index);

       if(foundNode) {
         foundNode.value = value;
         return true
       }

       return false
    }

    insert(index, value) {
      if(index < 0 || index > this.length) {
        return false
      }

      if(index === this.length) {
        return !!this.push(value)
      }

      if(index === 0) {
        return !!this.unshift(value)
      }

      const newNode = new Node(value);
      let previous = this.get(index - 1)
      let current = previous.next
      previous.next = newNode;
      newNode.next = current;
      this.length++
      return true

    }

    remove(index) {
      if(index < 0 || index >= this.length) {
        return null
      }

      if(index === this.length - 1) {
        return this.pop()
      }

      if(index === 0) {
        return this.shift()
      }

      let previous = this.get(index - 1)
      let toBeRemoved = previous.next;
      let next = toBeRemoved.next;

      previous.next = next
      this.length--
      return toBeRemoved;
    }


    // Reversing the Linked List in place - O(n) time
    // 1 -> 2 -> 3 -> 4 -> 5 -> 6
    reverse() {
       let currentHead = this.head;
       let currentTail = this.tail;

       // flip head and tail
       this.head = currentTail
       this.tail = currentHead;

       let prev = null
       while(currentHead) { // for(var i = 0; i < this.length; i++)
        let next = currentHead.next;
        currentHead.next = prev;
        prev = currentHead
        currentHead = next
       }

       // prev will now contain the new head of the linked list
       return prev;

    }

    // 1 -> 2 -> 3 -> 4 -> 5 -> 6
    // reverseRecursive(head, prev=null) {
    //    if(head === null) {
    //      return prev
    //    }
    //
    //    const next = head.next;
    //    head.next = prev;
    //    // prev = head;
    //    return reverseRecursive(next, head)
    // }

    print() {
      const values = [];
      let current = this.head;

      while(current) {
        values.push(current.value);
        current = current.next;
      }

      console.log(values);
    }

}


const l = new SinglyLinkedList();

l.push(1)
l.push(2)
l.push(3)
l.push(4)
l.push(5)
l.push(6)
// a = l.unshift("hello")
// l.shift()
// let b = l.pop()
// console.log(a)
// console.log(l.head, l.length)
// console.log(l)
// console.log(l.insert(6, "hello"))
// console.log(l.get(2))
// console.log(l.remove(1))
// console.log(l)
// l.print()
// l.reverse()
// l.print()


const l2 = new SinglyLinkedList();
l2.push("a")
l2.push("b")
l2.push("c")
l2.push("d");

function zipperLists(head1, head2) {
    let head = head1;
    let current1 = head1.next;
    let current2 = head2;
    let count = 0;

    while(current1 && current2) {
       if(count % 2 === 0) {
         head1.next = current2
         current2 = current2.next
       } else {
         head1.next = current1;
         current1 = current1.next
       }

       count++
       head1 = head1.next;
    }

    if(current1) {
      head1.next = current1
    }

    if(current2) {
      head1.next = current2
     }

    return head;
}


let zippedList = zipperLists(l.head, l2.head);  // [1, 'a', 2, 'b', 3, 'c', 4, 'd', 5, 6]
console.log(zippedList)


// Floyd's Tortoise And Hare Algorithm
// Cycle Detection Algorithm, Given the head of a linked list, return the node where the cycle begins.
// If there is no cycle, return null.
// O(n) time, O(1) time;
var detectCycle = function(head) {

    let tortoise = head;
    let hare = head;

    while(tortoise?.next && hare?.next?.next) {
        tortoise = tortoise.next;
        hare = hare.next.next;

        if(tortoise === hare) {

            hare = head;
            while(hare !== tortoise) {
                hare = hare.next;
                tortoise = tortoise.next
            }

            return hare
        }
    }

    return null

};


// Naive Implementation -> O(n) time, O(n) space
// let detectCycle = function(head) {


//     let current = head;
//     let visited = new Set();

//     while(current) {

//         if(visited.has(current)) {
//             return current
//         } else {
//             visited.add(current)
//         }

//         current = current.next
//     }

//     return null

// };
