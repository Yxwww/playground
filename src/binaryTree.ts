class Node {
  value: number = NaN;
  left: Node | null = null;
  right: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  root: Node | null = null;
  push(value: number): void {
    const newNode = new Node(value);
    if (this.isRootEmpty()) {
      this._setRoot(newNode);
      return;
    }

    let currentNode = this.root;
    while (currentNode) {
      const currentNodeValue = currentNode.value;
      console.log({ currentNodeValue });
      if (newNode.value < currentNodeValue) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  isRootEmpty() {
    return this.root === null;
  }
  _setRoot(node: Node) {
    this.root = node;
  }
}

const tree = new BinarySearchTree();
tree.push(1);
tree.push(2);
tree.push(3);

console.log(tree?.root?.right?.right);
