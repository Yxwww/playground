export function createStack<T>() {
    const array: T[] = [];
    return {
        push(item: T) {
            array.push(item);
        },
        pop() {
            return array.pop()
        },
        getState() {
            return {
                array
            }
        }

    }
}

const stack = createStack();
stack.push(2)
stack.push(3);
console.log('popped', stack.pop());
console.log('state', stack.getState());
