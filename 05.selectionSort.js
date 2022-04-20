

// runtime complexity of n^2 (worst case), n^2 (best case)
// O(1) space complexity
function selectionSort(arr) {

  for(let i = 0; i < arr.length; i++) {

    let indexOfMin = i;

    for(let j = i + 1; j < arr.length; j++) {

       if(arr[j] < arr[indexOfMin]) {
         indexOfMin = j;
       }

    }

    if(indexOfMin !== i) {
      let min = arr[indexOfMin];
      arr[indexOfMin] =  arr[i]
      arr[i] = min
    }

  }

  return arr;
}


console.log(selectionSort([18, 10, 14, 0, 1, 3, 2, 15, 16, 17, -3]))
