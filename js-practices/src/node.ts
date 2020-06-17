export interface Node {
    getValue(): number;
    getNext(): Node | undefined;
    setNext(v: number): void;
    setValue(v: number): void;
    toString(): string;
}

export function createNode(v: number): Node {
    let value:number = v;
    let next: undefined | Node;
    return {
        getNext() {
            return next;
        },
        setNext(v: number) {
            next = createNode(v);
        },
        getValue() {
            return value;
        },
        setValue(v: number) {
            value = v;
        },
        toString() {
            return value.toString();
        }
    }
}
