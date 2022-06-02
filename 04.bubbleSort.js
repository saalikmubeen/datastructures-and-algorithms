// Largest numbers bubbles to the end of the list until we have a sorted list.

// function bubbleSort(arr) {
//
//   for(let i = 0; i < arr.length; i++) {
//
//     for(let j = 0; j < arr.length - i; j++) {
//
//         if(arr[j] > arr[j + 1]) {
//           let larger = arr[j];
//           arr[j] = arr[j + 1]
//           arr[j + 1] = larger
//         }
//     }
//
//   }
//
//    return arr;
// }


// runtime complexity of n^2 (worst case), n (best case)
// O(1) space complexity
function bubbleSort(arr) {

  for(let i = arr.length; i > 0; i--) {

    for(let j = 0; j < i - 1; j++) {

        if(arr[j] > arr[j + 1]) {
          let larger = arr[j];
          arr[j] = arr[j + 1]
          arr[j + 1] = larger
        }
    }

  }

   return arr;
}


// OPTIMIZED
function bubbleSortOptimised(arr) {
  let noSwaps;
  for(let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for(let j = 0; j < i - 1; j++) {
        if(arr[j] > arr[j + 1]) {

          let larger = arr[j];
          arr[j] = arr[j + 1]
          arr[j + 1] = larger;

          noSwaps = false;
        }
    }

    if(noSwaps) break;
  }

   return arr;
}


console.log(bubbleSortOptimised([18, 10, 14, 15, 16, 17]))


// OR
function bubbleSort2(arr) {

   let isSorted = false;
   let counter = 0;

   while(!isSorted) {
     isSorted = true;
     for (let i = 0; i < arr.length - counter; i++) {
        if(arr[i] > arr[i+1]) {

          let larger = arr[j];
          arr[j] = arr[j + 1]
          arr[j + 1] = larger;

          isSorted = false;
        }
     }

     counter += 1;
   }

   return arr;
}
