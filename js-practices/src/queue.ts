import { createNode, Node } from "./node.ts";

export interface Queue {
  enqueue(v: number): void;
  dequeue(v: number): number | undefined;
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

export function createArrayQueue(): Queue {
  let head = 0;
  let tail = -1;
  let queue: number[] = [];
  return {
    enqueue(v: number) {
      tail++;
      queue[tail] = v;
    },
    dequeue() {
      if (tail == -1) {
        return;
      }
      if (head == tail) {
        const value = queue[head];
        queue = [];
        return value;
      }
      const headValue = queue[head];
      head++;
      return headValue;
    },
    toArray() {
      if (tail == -1) {
        return [];
      }
      console.log("toArray ", head, tail);
      return queue.slice(head, tail + 1); // NOTE: slice second param exclusive
    },
  };
}
