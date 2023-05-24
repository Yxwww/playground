/**
 * Implement fibonacci with recursion
 * @param {number} last -  number of the last item;
 */
function fibonacci(n) {
  /**
   * @param {number} last -  number of the last item;
   * @param {number} secondLast
   * @param {number} iteration count
   * @returns {number}
   */
  function iterate(last, secondLast, i) {
    if (i >= n - 1) return last + secondLast;
    return iterate(last + secondLast, last, i + 1);
  }

  return iterate(0, 1, 0);
}
console.log("first", altFibonacci(10));

function altFibonacci(n) {
  if (n <= 1) {
    return n;
  }

  const last = altFibonacci(n - 1);
  const secondLast = altFibonacci(n - 2);
  return last + secondLast;
}

console.log("alternative", altFibonacci(10));
