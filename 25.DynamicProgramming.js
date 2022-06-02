// WHAT IS DYNAMIC PROGRAMMING

// "A method for solving a complex problem by breaking it down into a collection
// of simpler subproblems, solving each of those subproblems just once, and storing their solutions."

// "Using past knowledge to make solving a future problem easier"

// IT ONLY WORKS ON PROBLEMS WITH...
// OPTIMAL SUBSTRUCTURE  &
// OVERLAPPING SUBPROBLEMS

// OVERLAPPING SUBPROBLEMS
// A problem is said to have overlapping subproblems if it can be broken down into subproblems which are reused several times
// e.g, Fibonacci Sequence

// OPTIMAL SUBSTRUCTURE
// A problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems


// recursive - O( 2^n ), more precisely O( 1.6^n ), exponential time complexity
// space complexity is O(n)
function fib(n){
  if(n <= 2) return 1;
  return fib(n-1) + fib(n-2);
}

// WHAT IS THE SUBSTRUCTURE?
// fib(n) = fib(n - 1) + fib(n - 2);


// Two Flavours of Dynamic Programming

// 1. MEMOIZATION - TOP-DOWN APPROACH
// Storing the results of expensive function calls and returning the cached result when the same inputs occur again


// memoized - O(n), linear time complexity
function fib_memo(n, memo=[]){
  if(memo[n] !== undefined) return memo[n]
  if(n <= 2) return 1;
  let res = fib(n-1, memo) + fib(n-2, memo);
  memo[n] = res;
  return res;
}

// function fib_memo(n, memo=[undefined, 1, 1]){
//   if(memo[n] !== undefined) return memo[n];
//   var res = fib(n-1, memo) + fib(n-2, memo);
//   memo[n] = res;
//   return res;
// }


// function fib_memo(n, savedFib={}) {
//    // base case
//    if (n <= 0) { return 0; }
//    if (n <= 2) { return 1; }
//
//    // memoize
//    if (savedFib[n - 1] === undefined) {
//         savedFib[n - 1] = fib(n - 1, savedFib);
//    }
//
//    // memoize
//    if (savedFib[n - 2] === undefined) {
//         savedFib[n - 2] = fib(n - 2, savedFib);
//    }
//
//    return savedFib[n - 1] + savedFib[n - 2];
// }


// Say you are a traveller on a 2D grid. You start at the top left corner and your goal
// is to travel to the bottom right corner. You can only move down or right.
// In how many ways can can you travel to the goal on a grid of width m * n;
// O(2^ n+m) time, O(n+m) space
function gridTraveler(m, n) {
    if(m === 1 && n === 1) return 1;
    if(m === 0 || n === 0) return 0;

    return gridTraveler(m-1, n) + gridTraveler(m, n-1)
    // m-1 represents going down, n-1 represents going right
}

function gridTravelerMemo(m, n, memo={}) {
   let key = `${m},${n}`;

   if(key in memo) return memo[key];
   if(m === 1 && n === 1) return 1;
   if(m === 0 || n === 0) return 0;

   memo[key] = gridTraveler(m-1, n, memo) + gridTraveler(m, n-1, memo);
   return memo[key]
}

gridTraveler(3, 3) // 6


function canConstruct(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === "") return true;

  for (let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let suffix = target.slice(word.length);
      if(canConstruct(suffix, wordBank, memo) === true) {
         memo[targrt] = true;
         return true
      }
    }
  }

  memo[target] = false
  return memo[target];
}

canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]) // true;


// 2. TABULATION - BOTTOM-UP APPROACH
// Storing the result of a previous result in a "table" (usually an array)
// Usually done using iteration
// Better space complexity can be achieved using tabulation


// tabulated
function fib_table(n){
    if(n <= 2) return 1;
    var fibNums = [0,1,1];
    for(var i = 3; i <= n; i++){
        fibNums[i] = fibNums[i-1] + fibNums[i-2];
    }
    return fibNums[n];
}


// function fib_table(n){
//     const table = Array(n+1).fill(0)
//     table[1] = 1
//     for(var i = 0; i <= n; i++){
//         table[i + 1] += table[i];
//         table[i + 2] += table[i];
//     }
//     return table[n];
// }


// function fib_table(n){
//     const lastTwo = [0, 1];
//     let counter = 3;
//
//     while (counter <= n) {
//       const nextFib = last[0] + last[1];
//
//       lastTwo[0] = lastTwo[1];
//       lastTwo[1] = nextFib;
//
//       counter++
//     }
//
//     return n > 1 ? lastTwo[1] : lastTwo[0];
// }

// let calculations = 0;
// function fibonacci(n) { //O(2^n)

//   if (n < 2) {
//     return n
//   }
//   return fibonacci(n-1) + fibonacci(n-2);
// }

// function fibonacciMaster() { //O(n)
//   let cache = {};
//   return function fib(n) {
//     calculations++;
//     if (n in cache) {
//       return cache[n];
//     } else {
//       if (n < 2) {
//         return n;
//       } else {
//         cache[n] = fib(n-1) + fib(n-2);
//         return cache[n];
//       }
//     }
//   }
// }

// function fibonacciMaster2(n) {
//   let answer = [0,1];
//   for ( let i = 2; i <= n; i++) {
//     answer.push(answer[i-2]+ answer[i-1]);
//   }
//   return answer.pop();
// }

// const fasterFib = fibonacciMaster();

// console.log('Slow', fibonacci(35))
// console.log('DP', fasterFib(100));
// console.log('DP2', fibonacciMaster2(100));
// console.log('we did ' + calculations + ' calculations');
