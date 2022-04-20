// Big O of Quicksort

// Time Complexity(Best)     - O(n log n)
// Time Complexity(Average)  - O(n log n)
// Time Complexity(Worst)    - O(n^2)
// Space Complexity          - O(log n)

//  O(n log n) = O(log n) decompositions + O(n) comparisons per decomposition
//  O(n^2)     = O(n) decompositions + O(n) comparisons per decomposition (worst case, if array is already sorted)
//  if we are picking the minimum or maximum everytime as pivot repeatedly, that results in quadratic time

function pivotHelper(arr, start=0, end=arr.length-1) {
   let pivot = arr[0] // element
   let swapIndex = start

   for(let i= start + 1; i < arr.length; i++) {
      if(arr[i] < pivot) {
        swapIndex++
        [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]]
      }
   }

   [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]]
   // console.log(arr);
   return swapIndex;
}


function quickSort(arr, left = 0, right = arr.length-1){
  let pivotIndex = pivotHelper(arr, left, right); // 4

  if(left < right) {
    // left
    quickSort(arr, left, pivotIndex-1)

    // right
    quickSort(arr, pivotIndex+1, right);
  }

  return arr;
}

// pivotHelper([ 5, 3, 9, 7, 1, 2, 4])
console.log(quickSort([ 5, 3, 9, 7, 1, 2, 4])) // [1, 2, 3, 4, 5, 7, 9]
