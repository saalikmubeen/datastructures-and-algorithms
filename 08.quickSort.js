// Big O of Quicksort

// Time Complexity(Best)     - O(n log n)
// Time Complexity(Average)  - O(n log n)
// Time Complexity(Worst)    - O(n^2)
// Space Complexity          - O(log n)

//  O(n log n) = O(log n) decompositions + O(n) comparisons per decomposition
//  O(n^2)     = O(n) decompositions + O(n) comparisons per decomposition (worst case, if array is already sorted)
//  if we are picking the minimum or maximum everytime as pivot repeatedly, that results in quadratic time

function pivotHelper(arr, start = 0, end = arr.length-1) {
  // We are assuming the pivot is always the first element
   let pivot = arr[start] // element
   let swapIndex = start

   for(let i= start + 1; i <= end; i++) {
      if(arr[i] < pivot) {

        swapIndex++
        [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]]

        // OR
        // [arr[swapIndex + 1], arr[i]] = [arr[i], arr[swapIndex + 1]]
        // swapIndex++
      }
   }

   [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]]
   return swapIndex;
}


function quickSort(arr, left = 0, right = arr.length - 1){

  if(left < right) {
    let pivotIndex = pivotHelper(arr, left, right); // 4

    // left
    quickSort(arr, left, pivotIndex - 1)

    // right
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

// pivotHelper([ 5, 3, 9, 7, 1, 2, 4])
console.log(quickSort([ 5, 3, 9, 7, 1, 2, 4])) // [1, 2, 3, 4, 5, 7, 9]


// Hoare's QuickSelect Algorithm, to find the kth smallest element in the unordered list;
// O(n) best time complexity, O(n^2) worst time complexity
// O(1) space complexity; tail recursion
function quickSelect(arr, k, left = 0, right = arr.length - 1) {

    let pivotIndex = pivotHelper(arr, left, right);
    let indexToFind = k - 1;

    if(pivotIndex === indexToFind) {
        return arr[pivotIndex]
    } else if (pivotIndex < indexToFind) {
        return quickSelect(arr, k, pivotIndex + 1, right)
    } else if (pivotIndex > indexToFind) {
        return quickSelect(arr, indexToFind, left, pivotIndex - 1)
    }
}

console.log(quickSelect([ 5, 3, 9, 7, 1, 2, 4], 7)) // 9
