// Linear Search - O(n)
function linearSearch(arr, val){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === val) return i;
    }
    return -1;
}

linearSearch([34,51,1,2,3,45,56,687], 100)


// Binary Search - O( log(n) )
// Binary search is a much faster form of search
// Rather than eliminating one element at a time, you can eliminate half of the remaining elements at a time (Divide and Conquer)
// Binary search only works on sorted arrays!

function binarySearch(arr, ele) {
    let start = 0;
    let end = arr.length -1
    let middle = Math.floor((start + end) / 2)


    while(arr[middle] !== ele && start <= end) {

      if(ele > arr[middle]) {
         start = middle + 1
      } else if (ele < arr[middle]) {
        end = middle - 1
      }

      middle = Math.floor((start + end) / 2)
    }

     if( arr[middle] === ele) {
       return middle
     } else {
       return -1
     }
}


// const binarySearch = (nums, target) => {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     const foundVal = nums[mid];
//     if (foundVal === target) {
//       return mid;
//     } else if (foundVal < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//
//   return null;
// };

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 100], 10))


// Recursive
function binarySearchRecursive(arr, ele, left=0, right=arr.length-1) {

      if(left > right)  {
          return -1
      }

    const midPoint = Math.floor((left + right) / 2)

    if(arr[midPoint] === ele) {
        return midPoint
    }

    if(ele > arr[midPoint]) {
          return binarySearch(arr, ele, midPoint + 1, right)
    }

    if(num < arr[midPoint]) {
        return binarySearch(arr, ele, left, midPoint -1)
    }
}


// naive algorithm or approach, )(n*m)
function subStrSearch(long, short){
  // saalik
  // ali
  let matches = {}
  for(let i = 0; i < long.length; i++) {

    for(let j = 0; j < short.length; j++) {

      if (short[j] !== long[i+j]) {
        break
      }

      if(j === short.length - 1) {
        matches[short] = (matches[short] || 0) + 1
      }

    }

  }
    return matches
}


console.log(subStrSearch("there are many students there", "re"))


// Building the Table
function matchTable(word) {
  let arr = Array.from({ length: word.length }).fill(0);
  let suffixEnd = 1;
  let prefixEnd = 0;
  while (suffixEnd < word.length) {
    if (word[suffixEnd] === word[prefixEnd]) {
      // we can build a longer prefix based on this suffix
      // store the length of this longest prefix
      // move prefixEnd and suffixEnd
      prefixEnd += 1;
      arr[suffixEnd] = prefixEnd;
      suffixEnd += 1;
    } else if (word[suffixEnd] !== word[prefixEnd] && prefixEnd !== 0) {
      // there's a mismatch, so we can't build a larger prefix
      // move the prefixEnd to the position of the next largest prefix
      prefixEnd = arr[prefixEnd - 1];
    } else {
      // we can't build a proper prefix with any of the proper suffixes
      // let's move on
      arr[suffixEnd] = 0;
      suffixEnd += 1;
    }
  }
  return arr;
}

// KMP Algorithm - O(n + m) time, O(m) space
// KMP provides a linear time algorithm for searches in strings
function kmpSearch(long, short) {
  let table = matchTable(short);
  let shortIdx = 0;
  let longIdx = 0;
  let count = 0;
  while (longIdx < long.length - short.length + shortIdx + 1) {
    if (short[shortIdx] !== long[longIdx]) {
      // we found a mismatch :(
      // if we just started searching the short, move the long pointer
      // otherwise, move the short pointer to the end of the next potential prefix
      // that will lead to a match
      if (shortIdx === 0) longIdx += 1;
      else shortIdx = table[shortIdx - 1];
    } else {
      // we found a match! shift both pointers
      shortIdx += 1;
      longIdx += 1;
      // then check to see if we've found the substring in the large string
      if (shortIdx === short.length) {
        // we found a substring! increment the count
        // then move the short pointer to the end of the next potential prefix
        count++;
        shortIdx = table[shortIdx - 1];
      }
    }
  }
  return count;
}
