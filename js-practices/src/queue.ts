import {createNode, Node} from "./node.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function createQueue() {
    let root: Node | undefined;
    return {
        push(v: number) {
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
        pop(): number | undefined {
            if (!root) {
                return;
            }
            const rootValue = root.getValue();
            root = root.getNext()
            return rootValue;
        }
    }
}

// tests

Deno.test("push should work as expected", () => {
    const queue = createQueue();
    queue.push(5)
    queue.push(1)
    queue.push(6)
    assertEquals(queue.toArray(), [5, 1, 6]);
});

Deno.test("pop should follow FIFO", () => {
    const queue = createQueue();
    queue.push(1)
    queue.push(2)
    queue.push(3)
    assertEquals(queue.pop(), 1);
    assertEquals(queue.toArray(), [2, 3]);
});
