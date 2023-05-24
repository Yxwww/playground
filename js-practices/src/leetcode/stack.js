const assert = require('assert')


const OPEN_TAG = '[({';
const CLOSE_TAG = '])}';

function isOpenTag(c) {
  return OPEN_TAG.indexOf(c) !== -1
}

function isCloseTag(c) {
  return CLOSE_TAG.indexOf(c) !== -1
}

/**
* @param {string} c
* @returns {string}
*/
function getMatchCloseTag(c) {
  const index = OPEN_TAG.indexOf(c);
  if (index === -1) {
    throw new Error('character is not a tag', c);
  }

  return CLOSE_TAG[index];
}

/**
  * @param {Array<string>} - arr
  * @returns string
  */
function peek(arr) {
  return arr[arr.length - 1]
}

/**
  * @param {string} input
  * @returns {boolean}
  */
function checkValid(input) {
  const stack = [];
  for (let i = 0; i < input.length; i++) {
    const c = input[i]
    // If(isOpenTag(c) || isCloseTag(c)) {
    //   stack.push()
    // }
    if (isOpenTag(c)) {
      stack.push(c);
    } else if (isCloseTag(c)) {
      const last = peek(stack);
      console.log('last', { last, c, stack })
      if (!isOpenTag(last)) {
        return false
      }

      if (getMatchCloseTag(last) !== c) {
        return false
      }

      console.log('popping', last)

      stack.pop();
    }
  }

  console.log('stack', stack, stack.length === 0);
  return stack.length === 0

}

assert.equal(checkValid('{1'), false)
assert.equal(checkValid('[{1}]'), true)
assert.equal(checkValid('[{1}]}'), false)
