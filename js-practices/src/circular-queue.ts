export function createQueue<T>(size: number) {
  let head = 0
  let tail = 0
  const arr = new Array(size)
  function isFull() {
    return tail - head >= size
  }
  function isEmpty() {
    return tail - head <= 0
  }
  return {
    enqueue(v: T) {
      if (isFull()) {
        throw new Error('queue is full')
      }
      arr[tail] = v
      if (tail === size) {
        tail = 0
        return
      }
      tail++
    },
    dequeue(): T | undefined {
      if (isEmpty()) {
        return undefined
      }
      const result = arr[head]
      if (head === size) {
        head = 0
        return result
      }
      head++
      return result
    },
    length() {
      return tail - head
    },
    isFull,
    isEmpty,
    getState() {
      return {
        head,
        tail,
        arr,
        isFull: isFull(),
        isEmpty: isEmpty(),
      }
    },
  }
}

function test() {
  const queue = createQueue(5)
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  queue.enqueue(5)
  console.log('dequeue: ', queue.dequeue())
  console.log('dequeue: ', queue.dequeue())
  console.log('dequeue: ', queue.dequeue())
  console.log('dequeue: ', queue.dequeue())
  console.log('dequeue: ', queue.dequeue())
  console.log(queue.getState())
}
export type Queue = ReturnType<typeof createQueue>
