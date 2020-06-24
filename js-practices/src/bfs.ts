import {createQueue} from './queue.ts'
function createNode(value: number) {
    return new NodeWithChildren(value);
}

export class NodeWithChildren {
    children: NodeWithChildren[] = [];
    value = NaN;
    constructor(v: number) {
        this.value = v;
    }
    push(values: number[]) {
        this.children = this.children.concat(values.map(createNode))
    }
}

export function doesExist(root: NodeWithChildren, value: number): boolean {
    const queue = createQueue<NodeWithChildren>();
    queue.enqueue(root);
    while(!queue.isEmpty()) {
        const node = queue.dequeue();
        if (node?.value === value) {
            return true
        }
        node?.children.forEach(n => {
            queue.enqueue(n)
        })
    }
    return false;
}


