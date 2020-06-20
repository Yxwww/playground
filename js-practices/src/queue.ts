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

// Circular Queue
// - a fixed sized array
// - two pointers
// - reuse storage to avoid waste space
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



export function createCircularArrayQueue(maxLength = 100): Queue {
  let head = -1;
  let tail = -1;
  let next = tail + 1;
  let nextHead = head + 1;
  const queue = new Float32Array(maxLength);
  function length() {
      if (tail== -1) {
          return 0
      }
    return tail >= head ? (tail  - head) : maxLength - head + tail;
  }
  function isFull(): boolean {
      return length() >= maxLength;
  }
  function isEmpty(): boolean {
    console.log('isEmpty', {head, tail}, length());
    return length() == 0;
  }
  return {
    enqueue(v: number) {
      if (isFull()) {
        throw new Error("queue is full");
      }

      console.log('enqueue', v, 'index',next);
      queue[next] = v;
      tail = next;
      next ++
      if (next === maxLength) {
          next = 0;
      }
    },
    dequeue() {
      if (isEmpty()) {
        return;
      }
      const value = queue[nextHead];
      head = nextHead;
      nextHead ++
      return value;
    },
    toArray() {
      console.log('toArray',{head, tail}, length(), queue.slice(0, 10));
      return tail >= head
        ? Array.from(queue.slice(head+1, tail + 1))
        : Array.from(queue.slice(head)).concat(
          Array.from(queue.slice(0, tail)),
        );
    },
  };
}
