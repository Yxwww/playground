import { createQueue } from './circular-queue.ts'

class BFSNode {
  value = NaN
  left: BFSNode | undefined
  right: BFSNode | undefined
  constructor(value: number) {
    this.value = value
  }
}

export class BinarySearchTree {
  root: BFSNode | undefined
  push(value: number): void {
    if (this.isRootEmpty()) {
      const newNode = new BFSNode(value)
      this.setRoot(newNode)
      return
    }
    let currentNode = this.root
    while (currentNode) {
      const { value: current } = currentNode
      if (value <= current) {
        if (!currentNode.left) {
          currentNode.left = new BFSNode(value)
          break
        } else {
          currentNode = currentNode.left
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new BFSNode(value)
          break
        } else {
          currentNode = currentNode.right
        }
      }
    }
  }
  private isRootEmpty() {
    return typeof this.root === 'undefined'
  }
  private setRoot(N: BFSNode) {
    this.root = N
  }
  traverseBFS() {
    let current = this.root
    const queue = createQueue<BFSNode>(100)
    while (current) {
      console.log('current:', current.value)
      if (current.left) {
        queue.enqueue(current.left)
      }
      if (current.right) {
        queue.enqueue(current.right)
      }
      current = queue.dequeue()
    }
  }
  traverseDFS() {
    let current = this.root
    const stack: BFSNode[] = []
    while (current) {
      console.log(current.value)
      if (current.left) {
        stack.push(current.left)
      }
      if (current.right) {
        stack.push(current.right)
      }
      current = stack.pop()
    }
  }
}

const tree = new BinarySearchTree()
tree.push(1)
tree.push(2)
tree.push(1.5)
tree.push(3)
tree.push(0.5)
tree.push(0.75)

tree.traverseDFS()
