const assert = require("assert");

const arr1 = [1, 5, 9];
const arr2 = [2, 3, 20];
const result = [1, 2, 3, 5, 9, 20];

/**
 * @param {number[]}
 * @param {number[]}
 */
function combine(arr1, arr2) {
  let i = 0;
  let j = 0;
  const arr1L = arr1.length;
  const arr2L = arr2.length;
  const result = [];

  while (i < arr1L && j < arr2L) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  if (i === arr1L) {
    return result.concat(arr2.slice(j));
  }

  if (j === arr2L) {
    return result.concat(arr1.slice(i));
  }
}

assert.deepEqual(combine(arr1, arr2), result);
console.log("good", combine(arr1, arr2));
