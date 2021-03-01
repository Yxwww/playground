import { createQueue, Queue } from './circular-queue.ts'
// function createNode(value: number) {
//   return new NodeWithChildren(value)
// }

// export class NodeWithChildren {
//   children: NodeWithChildren[] = []
//   value = NaN
//   constructor(v: number) {
//     this.value = v
//   }
//   push(values: number[]) {
//     this.children = this.children.concat(values.map(createNode))
//   }
// }
//
// export function doesExist(root: NodeWithChildren, value: number): boolean {
//   const queue = createQueue<NodeWithChildren>()
//   queue.enqueue(root)
//   while (!queue.isEmpty()) {
//     const node = queue.dequeue()
//     if (node?.value === value) {
//       return true
//     }
//     node?.children.forEach((n) => {
//       queue.enqueue(n)
//     })
//   }
//   return false
// }
// function createNode(value: number) {
//   let children: number[] = []
//   return {
//     push(number: number[]) {
//       children = children.concat(number)
//     },
//     children() {
//       return children
//     },
//     print() {
//       console.log('Node ', value, ' - ', children)
//     },
//   }
// }
// const node = createNode(5)
// const secondLevel = createNode(5)
class BNode {
  value: number
  left: BNode | undefined
  right: BNode | undefined
  constructor(v: number) {
    this.value = v
  }
}
class BTree {
  root: BNode
  constructor(v: number) {
    this.root = new BNode(v)
  }
  push(value: number): void {
    const foundPosition = this.findPushPos(this.root, value)
    if (foundPosition.isLeft) {
      foundPosition.node.left = new BNode(value)
    } else {
      foundPosition.node.right = new BNode(value)
    }
  }
  print() {
    const current = this.root
    const result = []
    const queue = createQueue(current.value)
    while (current.left || current.right) {
      if (current.left) {
        queue.enqueue(current.left.value)
      }
      if (current.right) {
        queue.enqueue(current.right.value)
      }
    }
  }

  bfs(target: number) {
    const queue = createQueue<BNode | undefined>(500)
    const data = []
    let steps = 0
    queue.enqueue(this.root)
    let current = queue.dequeue()
    while (current) {
      steps++
      if (current.value === target) {
        return steps
      }
      if (current.left?.value === target) {
        return steps
      } else {
        queue.enqueue(current.left)
      }
      if (current.right?.value === target) {
        return steps
      } else {
        queue.enqueue(current.right)
      }
      current = queue.dequeue()
    }
    return {
      steps,
    }
  }

  findPushPos(
    node: BNode,
    v: number
  ): {
    node: BNode
    isLeft: boolean
  } {
    if (node.value < v) {
      if (node.left) {
        return this.findPushPos(node.left, v)
      } else {
        return {
          node,
          isLeft: true,
        }
      }
    } else {
      if (node.right) {
        return this.findPushPos(node.right, v)
      } else {
        return {
          node,
          isLeft: false,
        }
      }
    }
  }
}

const tree = new BTree(5)
tree.push(6)
tree.push(4)
tree.push(3)
tree.push(2)
console.log(tree.bfs(2))

// export function bfs(node: Nodetarget: number) {
//     let steps = 0;
//
//
//
// }
