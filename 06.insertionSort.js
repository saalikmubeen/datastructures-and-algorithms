
// runtime complexity of n^2 (worst case), n (best case)
// O(1) space complexity
// 1, 2, 4, 5, 6, 3,
function insertionSort(arr) {

   // unsorted part
   for(let i = 1; i < arr.length; i++) {
     let current = arr[i];

     let j = i - 1;

     // sorted part
     while(j >= 0 && arr[j] > current) {
         arr[j+1] = arr[j]
         j--
     }

     arr[j + 1] = current
   }

  return arr;
}

console.log(insertionSort([18, 10, 14, 0, 1, 3, 2, 15, 16, 17, -3]))
