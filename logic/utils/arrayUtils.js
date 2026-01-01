export function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}


/**
 * Returns true if arr exactly contains sub
 * 
 * @param {Array} arr - Array which contains sub
 * @param {Array} sub - Sub array
 * @returns {boolean} - arr contains sub
 */

export function containsSubarray(arr, sub) {
  const n = arr.length;
  const m = sub.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    for (; j < m; j++) {
      if (arr[i + j] !== sub[j]) break;
    }
    if (j === m) return true;
  }
  return false;
}

/**
 * Returns the longest contiguous subarray that appears in both arrays
 * 
 * @param {Array} arr1 - First array to search
 * @param {Array} arr2 - Seconds array to search
 * @returns {Array} - Longest contiguous subarray
 */

export function longestCommonSubarray(arr1, arr2) {
  const m = arr1.length;
  const n = arr2.length;

  // DP table, initialized to 0
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  let maxLength = 0;
  let endIndex = 0; // end index in arr1 of the longest common subarray

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;

        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i;
        }
      }
    }
  }

  return arr1.slice(endIndex - maxLength, endIndex);
}

/**
 * Sort an array by comparing item values in a dictionary
 * Dictionary must be one to one
 * 
 * @param {Array} arr - Array to be sorted
 * @param {Object} dict - The value lookup dictionary
 * @returns {Array} - Sorted array
 */

export function sortByDictValues(arr, dict) {
  const reverse = Object.fromEntries(
    Object.entries(dict).map(([k, v]) => [v, k])
  );

  const valueArray = arr.map(item => dict[item]);

  const sortedValueArray = mergeSort(valueArray, 0, valueArray.length - 1)

  return sortedValueArray.map(item => reverse[item]);
}