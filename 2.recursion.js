// what's the smallest amount or unit of work I can do to contribute to reach
// the end goal (base case)



// Recursive Version
function countDown(num){
    // base case
    if(num <= 0) {
        console.log("All done!");
        return;
    }
    console.log(num);
    num--;
    countDown(num);
}
countDown(3)

// Iterative Version
function countDown(num){
    for(var i = num; i > 0; i--){
        console.log(i);
    }
    console.log("All done!")
}


function sumRange(num){
   if(num === 1) return 1;
   return num + sumRange(num-1);
}

sumRange(4)
   // return 4 + sumRange(3)
   //               return 3 + sumRange(2)
   //                             return 2 + sumRange(1)
   //                                           return 1
   //
   //   4      +     3         +      2      +     1
   //
   //  10


function factorialIterative(num){
    let total = 1;
    for(let i = num; i > 1; i--){
        total *= i
  }
    return total;
}


function factorialRecursive(num) {
  if (num === 1) {
    return 1
  }

  return num * factorialRecursive(num -1)
}


console.log(factorialRecursive(4));


// string reversal
function reverseStr(str) {
  if(str === "") {
      return ""
  }

  return reverseStr(str.slice(1)) + str[0]
}

reverseStr("hello")


// check if str is a palindrome
function isPalindrome(str) {

    // base case / stopping condition
    if(str.length === 0 || str.length === 1) {
        return true
    }

     // Do some work to shrink the problem space to reach the base case
     if(str[0] === str[str.length -1]) {
         return isPalindrome(str.slice(1, str.length -1))
     }

      // Additional base case to handle non-palindromes
      return false
}

isPalindrome("racecar")


// Helper Method Recursion

function outer(input){

    var outerScopedVariable = []

    function helper(helperInput){
        // modify the outerScopedVariable
        helper(helperInput--)
    }

    helper(input)

    return outerScopedVariable;

}

function collectOddValues(arr){

    let result = []

    function helper(helperInput){
        if(helperInput.length === 0) {
            return;
        }

        if(helperInput[0] % 2 !== 0){
            result.push(helperInput[0])
        }

        helper(helperInput.slice(1))
    }

    helper(arr)

    return result;

}

// Pure Recursion

function collectOddValues2(arr){
    // if we define a variable inside of a recursive function it's going to be reset or reassigned
    // to an empty [] everytime the function is called recursively
    let newArr = [];

    if(arr.length === 0) {
        return newArr;
    }

    if(arr[0] % 2 !== 0){
        newArr.push(arr[0]);
    }

    newArr = newArr.concat(collectOddValues2(arr.slice(1)));
    return newArr;
}

collectOddValues2([1,2,3,4,5])
    // return [1].concat(collectOddValues2([2,3,4,5]))
    //                       return [].concat(collectOddValues2([3,4,5]))
    //                                          return [3].concat(collectOddValues2([4,5]))
    //                                                               return [].concat(collectOddValues2([5]))
    //                                                                                    return [5].concat(collectOddValues2([]))
    //                                                                                                         return []
    //
    //       [1]. concat([].   concat([3].  concat([].   concat([5].   concat([])))))
    //
    //       [1, 3, 5]


// Pure Recursion Tips
// 1. For arrays, use methods like slice, the spread operator, and concat that make copies of arrays so you do not mutate them
// 2. Remember that strings are immutable so you will need to use methods like slice, substr, or substring to make copies of strings
// 3. To make copies of objects use Object.assign, or the spread operator
