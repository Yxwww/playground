import {createNode, Node} from "./node.ts";

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

const queue = createQueue();

queue.push(5)
queue.push(1)
queue.push(6)

console.log(queue.toArray())
