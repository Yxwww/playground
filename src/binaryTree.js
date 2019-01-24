function Node(val){
    this.value = val;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype.push = function push(value) {
    const newNode = new Node(value);
    if (this.isRootEmpty()) {
        this._setRoot(newNode);
        return;
    }

    let currentNode = this.root;
    while(currentNode) {
        const currentNodeValue = currentNode.value;
        console.log({currentNodeValue});
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

BinarySearchTree.prototype.isRootEmpty = function isRootEmpty() {
    return this.root === null;
}

BinarySearchTree.prototype._setRoot = function _setRoot(node) {
    this.root = node;
}


BinarySearchTree.prototype.map = function toString() {
}


const tree = new BinarySearchTree();
tree.push(1);
tree.push(2);
tree.push(3);

console.log(tree.root.right.right)
