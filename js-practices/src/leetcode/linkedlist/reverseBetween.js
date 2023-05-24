const assert = require('assert')
class ListNode {
  val;
  next;

  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  toString() {
    return print(this);
  }

  toArray() {
    const result = [];
    let cursor = this;
    while (cursor) {
      result.push(cursor.val);
      cursor = cursor.next
    }

    return result;
  }
}
/**
 * @param {ListNode} head
 * @returns {ListNode}
 */
function reverse(head) {
  if (!head.next) return head;
  let cursor = head;
  let prevA = head;
  // Console.log("reverse", nodeToString(head));
  while (cursor && cursor.next) {
    // Console.log('reverse i', cursor.val, cursor.next?.val)
    const a = cursor;
    const b = cursor.next;
    const { next } = b;
    b.next = prevA;
    a.next = next;
    prevA = b;
    cursor = a;
  }

  console.log("reverse result", nodeToString(prevA));
  return prevA;
}

/**
 * @param {ListNode|null} head
 * @param {number} left
 * @param {number} right
 * @returns {ListNode | null}
 */
function reverseBetween(head, left, right) {
  if (!head.next) return head;
  if (left === right) return head;
  let leftNode; let rightNode;
  let prevLeft = head;
  let afterRight;
  let prev = head;
  let after;
  let cursor = head;
  let count = 1;

  while (cursor) {
    if (count === left) {
      leftNode = cursor;
      prevLeft = prev;
    } else if (count === right) {
      rightNode = cursor;
      afterRight = cursor.next;
    }

    prev = cursor;
    after = cursor.next;
    cursor = cursor.next;
    count++;
  }


  // Console.log("found", {
  //   leftNode,
  //   rightNode,
  //   left,
  //   right,
  //   head,
  //   // AfterRight: afterRight.val,
  // });
  if (rightNode) rightNode.next = null;
  const reversedHead = reverse(leftNode);
  prevLeft.next = reversedHead;

  leftNode.next = afterRight;

  // Console.log('after reverse', { reversedHead, head });

  return head === leftNode ? reversedHead : head;
}

// Const arr = [1, 2, 3, 4];
const arr = [1, 2, 3, 4, 5];
const nodes = arr.map((v) => new ListNode(v));
nodes.reduce((acc, cur) => {
  acc.next = cur;
  return cur;
}, nodes[0]);
const [head] = nodes;

console.log("before", nodeToString(head));
// ForEach(
//   reverseBetween(head, 2, 4),
//   (n, i) => {
//     console.log(i, " - ", n.val);
//   },
//   10
// );
console.log("result", nodeToString());
assert.deepEqual(reverseBetween(head, 1, 2).toArray(), [2, 1, 3, 4, 5]);

/**
 * @param {ListNode} head;
 * @returns void
 */
function forEach(n, cb, max = 100) {
  let cursor = n;
  let count = 0;
  while (cursor) {
    if (count >= max) return;
    cb(cursor, count);

    count++;
    cursor = cursor.next;
  }
}

/**
 * @param {ListNode} head;
 * @returns {string}
 */
function nodeToString(n) {
  let str = "";
  let cursor = n;

  while (cursor) {
    str += `${cursor.val}, `;
    cursor = cursor.next;
  }

  return str;
}

/**
 * @param {ListNode} head - head of a linked list we want to print
 * @returns void
 */
function print(head) {
  console.log("[print]", nodeToString(head));
}
