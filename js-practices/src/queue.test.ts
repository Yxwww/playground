import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import {
  createQueue,
  createArrayQueue,
  createCircularArrayQueue,
  Queue,
  createQueueAnswer,
} from "./queue.ts";

function runTests(queueCreator: () => Queue) {
  Deno.test(`${queueCreator.name} should be initialized to be empty`, () => {
    const queue = queueCreator();
    assertEquals(queue.toArray(), []);
    assertEquals(queue.length(), 0);
  });

  Deno.test(`${queueCreator.name} enqueue should work as expected`, () => {
    const queue = queueCreator();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assertEquals(queue.toArray(), [1, 2, 3]);
    assertEquals(queue.length(), 3);
  });

  Deno.test(`${queueCreator.name} dequeue should follow FIFO`, () => {
    const queue = queueCreator();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assertEquals(queue.dequeue(), 1);
    assertEquals(queue.toArray(), [2, 3]);
    assertEquals(queue.length(), 2);
  });
  //
  Deno.test(`${queueCreator.name} dequeue should return undefined if array is empty`, () => {
    const queue = queueCreator();
    queue.enqueue(1);
    assertEquals(queue.dequeue(), 1);
    assertEquals(queue.dequeue(), undefined);
    assertEquals(queue.toArray(), []);
    assertEquals(queue.length(), 0);
  });
}

[
  createQueue,
  createArrayQueue,
  createCircularArrayQueue,
  createQueueAnswer,
].forEach(runTests);

function circularQueueTest(queueCreator: (size: number) => Queue) {
  Deno.test(`${queueCreator.name} .enqueue throw when array is full`, () => {
    const circularQueue = queueCreator(3);
    circularQueue.enqueue(1);
    circularQueue.enqueue(2);
    circularQueue.enqueue(3);
    assertThrows(() => {
      circularQueue.enqueue(4);
    });
  });

  Deno.test(`${queueCreator.name} .enqueue circle back to beginning`, () => {
    const circularQueue = queueCreator(3);
    circularQueue.enqueue(1);
    circularQueue.enqueue(2);
    circularQueue.enqueue(3);
    circularQueue.dequeue();
    circularQueue.enqueue(4);
    assertEquals(circularQueue.toArray(), [2, 3, 4]);
  });
  Deno.test(`${queueCreator.name} .dequeue circle back to beginning`, () => {
    const circularQueue = queueCreator(3);
    circularQueue.enqueue(1);
    circularQueue.enqueue(2);
    circularQueue.enqueue(3);
    circularQueue.dequeue();
    circularQueue.dequeue();
    circularQueue.dequeue();
    circularQueue.enqueue(4);
    circularQueue.dequeue();
    assertEquals(circularQueue.toArray(), []);
  });
}

circularQueueTest(createCircularArrayQueue);
circularQueueTest(createQueueAnswer);
