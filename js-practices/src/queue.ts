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
export function createCircularArrayQueue(maxLength = 100): Queue {
  let head = 0;
  let tail = 0;
  let next = 0; // can avoid having this counter ?
  const queue = new Float32Array(maxLength);
  function length() {
    return tail >= head ? tail - head : maxLength - head + tail;
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
      console.log("enqueue", tail, v);
      tail = next;
      queue[tail] = v;
      if (tail == maxLength - 1) {
        next = 0;
      } else {
        next++;
      }
    },
    dequeue() {
      if (isEmpty()) {
        return;
      }
      const value = queue[head];
      head++;
      return value;
    },
    toArray() {
      return tail >= head
        ? Array.from(queue.slice(head, tail))
        : Array.from(queue.slice(0, tail + 1)).concat(
          Array.from(queue.slice(head)),
        );
    },
  };
}
