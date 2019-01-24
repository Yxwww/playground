class LNode {
    next=null;
    value=null;
    constructor(num) {
        this.value = num;
    }

    appendToTail(num) {
        const newNode = new LNode(num);
        let n = this;
        while(n.next !== null) {
            n = n.next;
        }
        n.next = newNode;
    }

    each(cb) {
        let n = this;
        while((n !== null)) {
            cb(n);
            n = n.next;
        }
    }
}

const newNode = new LNode(1);
newNode.appendToTail(2)
newNode.appendToTail(3)
newNode.each(((n) => {
    console.log(n.value)
}));



