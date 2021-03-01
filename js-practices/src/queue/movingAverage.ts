import { Queue, createQueue } from '../circular-queue.ts'
class MovingAverage {
  private count: number
  private queue: Queue
  window: number
  constructor(size: number) {
    this.count = 0
    this.queue = createQueue(300)
    this.window = size
  }
  next(v: number) {
    this.queue.enqueue(v)
    const { arr, head, tail } = this.queue.getState()
    const sum = arr
      .slice(Math.max(tail - this.window, 0))
      .reduce((acc, cur) => {
        return (acc += cur)
      }, 0)
    this.count = this.count + 1
    return sum / Math.min(this.window, tail - head)
  }
}
const moving = new MovingAverage(3)
console.log(moving.next(5))
console.log(moving.next(5))
console.log(moving.next(2))
console.log(moving.next(2))
console.log(moving.next(2))
