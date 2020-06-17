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
        }
    }
}

// tests

Deno.test("hello world", () => {
    const queue = createQueue();

    queue.push(5)
    queue.push(1)
    queue.push(6)


    const x = 1 + 4;
    assertEquals(queue.toArray(), [5, 1, 6]);
});
