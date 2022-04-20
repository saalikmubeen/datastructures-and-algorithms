// COMPARISON SORTS

// Average Time Complexity:
// Bubble Sort - O(n^2)
// Insertion Sort - O(n^2)
// Selection Sort - O(n^2)
// Quick Sort - O(n log (n))
// Merge Sort - O(n log (n))

// Can we do better? YES, BUT NOT BY MAKING COMPARISONS

// RADIX SORT:
// Radix sort is a special sorting algorithm that works on lists of numbers
// It never makes comparisons between elements!
// It exploits the fact that information about the size of a number is encoded in the number of digits.
// More digits means a bigger number!

// RADIX SORT BIG O:
// Time Complexity (Best)     - O(nk)
// Time Complexity (Average)  - O(nk)
// Time Complexity (Worst)    - O(nk)
// Space Complexity           - O(n + k)
// n - length of array
// k is the max number of digits, word size


// returns the digit in num at the given place value
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// returns the number of digits in num
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Given an array of numbers, returns the number of digits in the largest number in the list
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}


function radixSort(nums){
    let maxDigitCount = mostDigits(nums);
    for(let k = 0; k < maxDigitCount; k++){

        let digitBuckets = Array.from({length: 10}, () => []);

        for(let i = 0; i < nums.length; i++){
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }

        nums = [].concat(...digitBuckets);
    }

    return nums;
}

console.log(radixSort([23,345,5467,12,2345,9852])) // [12, 23, 345, 2345, 5467, 9852]
