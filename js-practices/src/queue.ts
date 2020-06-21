import { createNode, Node } from "./node.ts";

export interface Queue {
  enqueue(v: number): void;
  dequeue(): number | undefined;
  toArray(): number[];
}

export function createQueue(): Queue {
  let root: Node | undefined;
  return {
    enqueue(v: number) {
      if (!root) {
        root = createNode(v);
        return;
      }
      let current = root;
      while (current.getNext()) {
        current = current.getNext() as Node;
        // current =
      }
      current.setNext(v);
    },
    toArray(): number[] {
      const arr: number[] = [];
      if (!root) {
        return arr;
      }
      let current = root;
      while (current) {
        arr.push(current.getValue());
        current = current.getNext() as Node;
      }
      return arr;
    },
    dequeue(): number | undefined {
      if (!root) {
        return;
      }
      const rootValue = root.getValue();
      root = root.getNext();
      return rootValue;
    },
  };
}

// Queue implementation with Dynamic array
export function createArrayQueue(): Queue {
  let head = 0;
  let tail = 0;
  let queue: number[] = [];
  return {
    enqueue(v: number) {
      queue[tail] = v;
      tail++;
    },
    dequeue() {
      if (tail == 0 || head == tail) {
        queue = [];
        return;
      }
      const headValue = queue[head];
      head++;
      return headValue;
    },
    toArray() {
      if (tail == head) {
        return [];
      }
      return queue.slice(head, tail + 1); // NOTE: slice second param exclusive
    },
  };
}

// incorrect implementation of circular queue
// export function createCircularArrayQueue(maxLength = 100): Queue {
//   let head = -1;
//   let tail = -1;
//   const queue = new Float32Array(maxLength);
//   function length() {
//     return tail >= head ? (tail - head) : maxLength - head + tail;
//   }
//   function isFull(): boolean {
//     return length() >= maxLength;
//   }
//   function isEmpty(): boolean {
//     if (tail == -1) {
//       return true;
//     }
//     return length() == 0;
//   }
//   return {
//     enqueue(v: number) {
//       if (isFull()) {
//         throw new Error("queue is full");
//       }
//       if (tail == maxLength - 1) {
//         tail = 0;
//       } else {
//         tail++;
//       }
//       queue[tail] = v;
//     },
//     dequeue() {
//       if (isEmpty()) {
//         return;
//       }
//       head++;
//       const value = queue[head];
//       return value;
//     },
//     toArray() {
//       if (tail == -1) {
//         return [];
//       }
//       return tail > head
//         ? Array.from(queue.slice(head + 1, tail + 1))
//         : Array.from(queue.slice(head + 1)).concat(
//           Array.from(queue.slice(0, tail + 1)),
//         );
//     },
//   };
// }

// Circular Queue
// - a fixed sized array
// - two pointers
// - reuse storage to avoid waste space
/**
 * Respect the true position of H and T. Always keep track of them to make sure they are at the correct
 * position at all times. It's vital for computing length() and enqueue and dequeue methods.
 * It's logical to gives their starting postion to both be 0 and increment during dequeue and enqueue. Next question
 * can be - what does it mean when H == T? the logical conclusion is when H == T, the length of the queue is 0.
 * Hence length() first two lines. In order to implement enqueue/dequeue function we have to know whether
 * there is room to add or remove. So, we wrap up length() with the correct logic handling different H and T
 * positions. It's the key for circular queue since H and T
 * can go back to the beginning of the array. Once length() computes correctly, we can
 * implement enqueue and dequeue. We have to be careful when to set the H or T back to beginning.
 * Other gotchas:
 * - make sure to handle reseting T back to beginning to reset before assgining the value to index, since tail is where the next tail should go
 **/

export function createCircularArrayQueue(maxLength = 100): Queue {
  let head = 0;
  let tail = 0;
  const queue = new Float32Array(maxLength);
  function length() {
    if (tail == head) {
      return 0;
    }
    return tail > head ? (tail - head) : maxLength - head + tail;
  }
  function isFull(): boolean {
    return length() >= maxLength;
  }
  function isEmpty(): boolean {
    return length() == 0;
  }
  return {
    enqueue(v: number) {
      if (isFull()) {
        throw new Error("queue is full");
      }
      let isTailUpdated = false;
      if (tail === maxLength) {
        tail = 0;
        isTailUpdated = true;
      }
      queue[tail] = v;
      if (!isTailUpdated) { // prevent double update
        tail++;
      }
    },
    dequeue() {
      if (isEmpty()) {
        return;
      }
      let isHeadUpdated = false;
      if (head == maxLength) {
        head = 0;
        isHeadUpdated = true;
      }
      const value = queue[head];
      if (!isHeadUpdated) {
        head++;
      }
      return value;
    },
    toArray() {
      if (isEmpty()) {
        return [];
      }
      return tail >= head
        ? Array.from(queue.slice(head, tail))
        : Array.from(queue.slice(head)).concat(
          Array.from(queue.slice(0, tail + 1)),
        );
    },
  };
}
