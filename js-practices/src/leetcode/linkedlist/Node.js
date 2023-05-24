class Node {
  next;
  value;
  constructor(v) {
    this.value = v;
  }

  toString() {
    return "n -" + this.value;
  }
}

const n = new Node(5);
console.log("print n", n);
console.log(`with template literal ${n}`);
