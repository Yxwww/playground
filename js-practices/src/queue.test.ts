import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { createQueue, createArrayQueue } from "./queue.ts";

function runTests(queueCreator: () => any) {
  Deno.test(`${queueCreator.name} enqueue should work as expected`, () => {
    const queue = queueCreator();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assertEquals(queue.toArray(), [1, 2, 3]);
  });

  Deno.test(`${queueCreator.name} dequeue should follow FIFO`, () => {
    const queue = queueCreator();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    assertEquals(queue.dequeue(), 1);
    assertEquals(queue.toArray(), [2, 3]);
  });
}

[createQueue, createArrayQueue].forEach(runTests);
