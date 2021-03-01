class BFSNode {
  value = NaN;
  left: BFSNode | undefined;
  right: BFSNode | undefined;
  constructor(value: number) {
    this.value = value;
  }
}

export class BinarySearchTree {
  root: BFSNode | undefined;
  push(value: number): void {
    if (this.isRootEmpty()) {
      const newNode = new BFSNode(value);
      this.setRoot(newNode);
      return;
    }
    let currentNode = this.root;
    while (currentNode) {
      const { value: current } = currentNode;
      if (value <= current) {
        if (!currentNode.left) {
          currentNode.left = new BFSNode(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new BFSNode(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  private isRootEmpty() {
    return typeof this.root === "undefined";
  }
  private setRoot(N: BFSNode) {
    this.root = N;
  }
  walk(cb: (node: T) => void) {
      if(this.isRootEmpty()) {
          return;
      }
      const result = [];
      do {
          result.push([this.root.left, this.root.right])
      } while()
  }
}

const tree = new BinarySearchTree();
tree.push(1);
tree.push(2);
tree.push(3);
tree.push(0.5);

console.log(tree.root?.left);
