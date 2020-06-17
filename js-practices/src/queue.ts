import {createNode, Node} from "./node.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function createQueue() {
    let root: Node | undefined;
    return {
        enqueue(v: number) {
            if (!root) {
                root = createNode(v);
                return;
            }
            let current = root;
            while(current.getNext()) {
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
            while(current) {
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
            root = root.getNext()
            return rootValue;
        }
    }
}

function createArrayQueue() {
    let head = 0;
    let tail = -1;
    let queue: number[] = [];
    return {
        enqueue(v: number) {
            tail ++;
            queue[tail] = v;
        },
        dequeue() {
            if (tail == -1) {
                return;
            }
            if (head == tail) {
                const value = queue[head]
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
            console.log('toArray ', head, tail);
            return queue.slice(head, tail+1); // NOTE: slice second param exclusive
        }
    }
}

// tests

function runTests(queueCreator: () => any) {
    Deno.test(`${queueCreator.name} enqueue should work as expected`, () => {
        const queue = queueCreator();
        queue.enqueue(1)
        queue.enqueue(2)
        queue.enqueue(3)
        assertEquals(queue.toArray(), [1,2,3]);
    });

    Deno.test(`${queueCreator.name} dequeue should follow FIFO`, () => {
        const queue = queueCreator();
        queue.enqueue(1)
        queue.enqueue(2)
        queue.enqueue(3)
        assertEquals(queue.dequeue(), 1);
        assertEquals(queue.toArray(), [2, 3]);
    });
}

[createQueue, createArrayQueue].forEach(runTests)

