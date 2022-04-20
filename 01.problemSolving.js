// 1. Understand the problem
// 2. Explore concrete examples
// 3. Break it down
// 4. Solve / simplify
// 5. Look back and refactor


// 1. Frequency Counter Pattern
// This pattern uses objects or sets to collect values/frequencies of values
// This can often avoid the need for nested loops or O(N^2) operations with arrays / strings

// naive approach, O(n^2)
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(let i = 0; i < arr1.length; i++){
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if(correctIndex === -1) {
            return false;
        }
        console.log(arr2);
        arr2.splice(correctIndex,1)
    }
    return true;
}

same([1,2,3,2], [9,1,4,4])


// frequency counter pattern, O(n)
function same2(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}

    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }

    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
    }

    console.log(frequencyCounter1);
    console.log(frequencyCounter2);

    for(let key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    }
    return true
}

same2([1,2,3,2,5], [9,1,4,4,11])

// 2. Multiple Pointers pattern

// Creating pointers or values that correspond to an index or position and move towards the beginning,
// end or middle based on a certain condition
// Very efficient for solving problems with minimal space complexity as well

// naive solution, O(n^2)
function sumZero(arr){ // sorted array
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}


sumZero([-4,-3,-2,-1,0,1,2,5]) // [-2, 2]

// Multiple pointer pattern, O(n)
function sumZero2(arr) {
  let left = 0;
  let right = arr.length-1;

  while(left < right) {
    const sum = arr[left] + arr[right]

    if(sum === 0) {
      return [arr[left], arr[right]]
    } else if (sum > 0) {
      right--
    } else if (sum < 0) {
      left++
    }
  }
}


console.log(sumZero2([-4,-3,-2,-1,0,1,2,5]))


function countUniqueValues(arr){ // sorted array
  if (arr.length === 0) return 0;

   let i = 0;

   for( let j = 1; j < arr.length; j++) {
     if(arr[i] !== arr[j]) {
        i++
        arr[i] = arr[j]
     }
   }

  return i + 1

}

countUniqueValues([1,2,2,5,7,7,99]) // 5


// 3. Sliding Window Pattern

// This pattern involves creating a window which can either be an array or number from one position to another
// Depending on a certain condition, the window either increases or closes (and a new window is created)
// Very useful for keeping track of a subset of data in an array/string etc.

// My Solution 1 - naive approach, O(n^2)
function maxSubArraySum(arr, n) {
  if ( n > arr.length){
    return null;
  }

   let maxSum = -Infinity;

  for(let j = 0; j < arr.length -n + 1; j++) {
    let tempSum = 0

    for (let k = j; k < j + n; k++) {
      tempSum += arr[k];
    }

    if (tempSum >= maxSum) {
      maxSum = tempSum
    }
  }

   return maxSum
}


console.log(maxSubArraySum([1, 2, 3, 4, 5, 8, 9], 3))

// Solution 2 - naive approach
function maxSubarraySum2(arr, num) {
  if ( num > arr.length){
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i ++){
    temp = 0;
    for (let j = 0; j < num; j++){
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

maxSubarraySum2([2,6,9,2,1,8,5,6,3],3)


// Sliding Window Pattern, O(n)
function maxSubarraySum3(arr, n) {
  let tempSum = 0;
  let maxSum = 0;

  for(let i=0; i < n; i++) {
    maxSum += arr[i]
  }

  tempSum=maxSum;

  for(let j=n; j < arr.length; j++) {
    tempSum = tempSum + arr[j] - arr[j - n]
    maxSum = Math.max(maxSum, tempSum)
  }

  return maxSum
}

console.log(maxSubarraySum3([2,6,9,2,1,8,5,6,3, 4, 4],3))


// 4. Divide and Conquer pattern

// This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
// This pattern can tremendously decrease time complexity
