//
// Merge Sort
// It's a combination of two things - merging and sorting!
// Exploits the fact that arrays of 0 or 1 element are always sorted
// Works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array
// O(n log n) -> Best, average and worst time complexity | O(logn) decompositions and O(n) comparisons per decomposition
// O(n) -> space complexity



// [1, 2],  [5, 8, 9, 10]
// function mergeSortedArrays(arr1, arr2) {
//    let mergedArr = []
//
//   while(arr1.length > 0 && arr2.length > 0) {
//      if(arr1[0] > arr2[0]) {
//        mergedArr.push(arr2[0])
//        arr2.splice(0, 1)
//      } else if (arr1[0] < arr2[0]) {
//        mergedArr.push(arr1[0])
//        arr1.splice(0, 1)
//      }
//
//      console.log(arr1, arr2)
//   }
//
//   while (arr1.length > 0) {
//     mergedArr.push(arr1[0])
//     arr1.splice(0, 1)
//   }
//
//   while (arr2.length > 0) {
//     mergedArr.push(arr2[0])
//     arr2.splice(0, 1)
//   }
//
//   return mergedArr
// }


// This function runs in O(n + m) time and O(n + m) space and should not modify the parameters passed to it.
function mergeSortedArrays(arr1, arr2){
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr2[j] > arr1[i]){
            results.push(arr1[i]);
            i++;
        } else { //  arr1[i] >= arr2[j]
            results.push(arr2[j])
            j++;
        }
    }

    // push remaining elements
    while(i < arr1.length) {
        results.push(arr1[i])
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j])
        j++;
    }
    return results;
}

// console.log(mergeSortedArrays([100,200], [1,2,3,5,6]))


function mergeSort(arr) {

  if(arr.length === 1) {
    return arr
  }

  const center = Math.floor(arr.length / 2);
  const left = arr.slice(0, center);
  const right = arr.slice(center);

  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([18, 10, 14, 15, 16, 17]))
