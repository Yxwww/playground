export interface Node<T> {
  getValue(): T;
  getNext(): Node<T> | undefined;
  setNext(v: T): void;
  setValue(v: T): void;
  toString(): string;
}

export function createNode<T>(v: T): Node<T> {
  let value: T = v;
  let next: undefined | Node<T>;
  return {
    getNext() {
      return next;
    },
    setNext(v: T) {
      next = createNode(v);
    },
    getValue() {
      return value;
    },
    setValue(v: T) {
      value = v;
    },
  };
}
