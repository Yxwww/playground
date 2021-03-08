import { Queue, createQueue } from '../circular-queue.ts'
const NOTHING = 2147483647
const ROOMS = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
]
function isNothing(v: number) {
  return v === NOTHING
}
function isWall(v: number) {
  return v === -1
}
function isGate(v: number) {
  return v === 0
}

function toVisitedIndex(i: number, j: number) {
  return `${i}-${j}`
}

function wallsAndGates(rooms: number[][]) {
  const queue = createQueue(100)
  const visited: any = {}
  const i = 0,
    j = 0
  const firstRoom = { value: rooms[i][j], coord: [i, j], stepsToGate: -1 }
  visited[toVisitedIndex(i, j)] = true
  queue.enqueue(firstRoom)
  let current: any = firstRoom
  let steps = 0
  while (current) {
    const currentCord = current.coord
    visited[toVisitedIndex(currentCord[0], currentCord[1])] = true
    console.log(current, queue.getState())
    if (isWall(current.value)) {
      // DO nothing
    } else if (isGate(current.value)) {
      // mark
    } else {
      // queue adjacent
      if (
        (j - 1 >= 0 && rooms[i][j - 1]) ??
        !visited[toVisitedIndex(i, j - 1)]
      ) {
        queue.enqueue({ value: rooms[i][j - 1], coord: [i, j - 1] })
      }
      if (
        (i - 1 >= 0 && rooms[i - 1][j]) ??
        !visited[toVisitedIndex(i - 1, j)]
      ) {
        queue.enqueue({ value: rooms[i - 1][j], coord: [i - 1, j] })
      }
      if (rooms[i + 1][j] ?? !visited[toVisitedIndex(i + 1, j)]) {
        queue.enqueue({ value: rooms[i + 1][j], coord: [i + 1, j] })
      }
      if (rooms[i][j + 1] ?? !visited[toVisitedIndex(i, j + 1)]) {
        queue.enqueue({ value: rooms[i][j + 1], coord: [i, j + 1] })
      }
      steps++
    }
    current = queue.dequeue()
  }
  console.log('steps')
}

wallsAndGates(ROOMS)
