// 1. Understand the problem
// 2. Explore concrete examples
// 3. Break it down
// 4. Solve / simplify
// 5. Look back and refactor

// 1. Frequency Counter Pattern
// This pattern uses objects or sets to collect values/frequencies of values
// This can often avoid the need for nested loops or O(N^2) operations with arrays / strings

// naive approach, O(n^2)
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    console.log(arr2);
    arr2.splice(correctIndex, 1);
  }
  return true;
}

same([1, 2, 3, 2], [9, 1, 4, 4]);

// frequency counter pattern, O(n)
function same2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }

  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  console.log(frequencyCounter1);
  console.log(frequencyCounter2);

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

same2([1, 2, 3, 2, 5], [9, 1, 4, 4, 11]);

// 2. Multiple Pointers pattern

// Creating pointers or values that correspond to an index or position and move towards the beginning,
// end or middle based on a certain condition
// Very efficient for solving problems with minimal space complexity as well

// naive solution, O(n^2)
function sumZero(arr) {
  // sorted array
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

sumZero([-4, -3, -2, -1, 0, 1, 2, 5]); // [-2, 2]

// Multiple pointer pattern, O(n)
function sumZero2(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else if (sum < 0) {
      left++;
    }
  }
}

console.log(sumZero2([-4, -3, -2, -1, 0, 1, 2, 5]));

function countUniqueValues(arr) {
  // sorted array
  if (arr.length === 0) return 0;

  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  return i + 1;
}

countUniqueValues([1, 2, 2, 5, 7, 7, 99]); // 5

// 3. Sliding Window Pattern

// This pattern involves creating a window which can either be an array or number from one position to another
// Depending on a certain condition, the window either increases or closes (and a new window is created)
// Very useful for keeping track of a subset of data in an array/string etc.

// My Solution 1 - naive approach, O(n^2)
function maxSubArraySum(arr, n) {
  if (n > arr.length) {
    return null;
  }

  let maxSum = -Infinity;

  for (let j = 0; j < arr.length - n + 1; j++) {
    let tempSum = 0;

    for (let k = j; k < j + n; k++) {
      tempSum += arr[k];
    }

    if (tempSum >= maxSum) {
      maxSum = tempSum;
    }
  }

  return maxSum;
}

console.log(maxSubArraySum([1, 2, 3, 4, 5, 8, 9], 3));

// Solution 2 - naive approach
function maxSubarraySum2(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

maxSubarraySum2([2, 6, 9, 2, 1, 8, 5, 6, 3], 3);

// Sliding Window Pattern, O(n)
function maxSubarraySum3(arr, n) {
  let tempSum = 0;
  let maxSum = 0;

  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;

  for (let j = n; j < arr.length; j++) {
    tempSum = tempSum + arr[j] - arr[j - n];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}

console.log(maxSubarraySum3([2, 6, 9, 2, 1, 8, 5, 6, 3, 4, 4], 3));

// 53. Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// Kadane's Algorithm
var maxSubArray = function (nums) {
  let maxSum = nums[0];

  let currentSum = 0;

  for (let num of nums) {
    // make sure we dont't add a previous aggregated sum if it's negative and reset the currentSum to 0
    currentSum = Math.max(currentSum, 0);
    currentSum = currentSum + num;

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

// return the indices of the ends of the subarray
function slidingWindow(nums) {
  let maxSum = nums[0];
  let currentSum = 0;
  let L = 0;
  let maxL = 0,
    maxR = 0;

  for (let R = 0; R < nums.length; R++) {
    if (currentSum < 0) {
      currentSum = 0;
      L = R;
    }

    currentSum = currentSum += nums[R];

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxL = L;
      maxR = R;
    }
  }

  return [maxL, maxR];
}

// 219. Contains Duplicate II
// Given an integer array nums and an integer k, return true if there are two
// distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
var containsNearbyDuplicate = function (nums, k) {
  let window = new Set();

  let L = 0;

  for (let R = 0; R < nums.length; R++) {
    if (R - L > k) {
      window.delete(nums[L]);
      L++;
    }

    if (window.has(nums[R])) {
      return true;
    }

    window.add(nums[R]);
  }

  return false;
};

// 3. Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without duplicate characters.
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Brute force
// var lengthOfLongestSubstring = function(s) {
//     let max = 0
//     for (let i = 0; i < s.length; i++) {
//         let seen = new Set();
//         seen.add(s[i])
//         let length = 1;

//         let j = i + 1;
//         while(j < s.length && !seen.has(s[j])) {
//           seen.add(s[j])
//           length++
//           j++
//         }

//         max = Math.max(max, length)

//     }

//     return max
// };

var lengthOfLongestSubstring = function (s) {
  let max = 0;
  let seen = new Set();
  let left = 0,
    right = 0;

  while (right < s.length) {
    let c = s[right];

    if (!seen.has(c)) {
      right++;
      seen.add(c);
      max = Math.max(max, right - left);
    } else {
      while (seen.has(c)) {
        seen.delete(s[left]);
        left++;
      }
    }
  }

  return max;
};

// 209. Minimum Size Subarray Sum
// Given an array of positive integers nums and a positive integer target, return the
// minimal length of a subarray whose sum is greater than or equal to target.
// If there is no such subarray, return 0 instead:  O(n)
function shortestSubarray(nums, target) {
  let L = 0,
    total = 0;
  let length = Infinity;

  for (let R = 0; R < nums.length; R++) {
    total += nums[R];
    while (total >= target) {
      length = Math.min(R - L + 1, length);
      total -= nums[L];
      L++;
    }
  }

  if (length == Infinity) {
    return 0;
  }
  return length;
}

// 4. Divide and Conquer pattern

// This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
// This pattern can tremendously decrease time complexity

// 5. Prefix Sum

class PrefixSum {
  constructor(nums) {
    this.prefix = new Array();
    let total = 0;
    for (let n of nums) {
      total += n;
      this.prefix.push(total);
    }
  }

  rangeSum(left, right) {
    let preRight = this.prefix[right];
    let preLeft = left > 0 ? this.prefix[left - 1] : 0;
    return preRight - preLeft;
  }
}
