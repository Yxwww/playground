import { createQueue } from '../circular-queue.ts'
function isEmpty(room: number) {
  return room === 2147483647
}
function isGate(room: number) {
  return room === 0
}
function isWall(room: number) {
  return room === -1
}
const rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
]
const result = [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]

type Vec2 = [number, number]

function createNode(room: number, coord: Vec2) {
  return {
    room,
    distance: room,
    coord,
  }
}

type WNode = ReturnType<typeof createNode>

const visited: { [idx: string]: WNode } = {}

function inRange(v: number, [min, max]: Vec2) {
  return v < max && v >= min
}

function getNeighbours(rooms: number[][], currentCoord: Vec2): WNode[] {
  const neighbours: WNode[] = []
  const [curY, curX] = currentCoord
  const m = rooms[0].length
  const n = rooms.length
  function isXInRange(x: number) {
    return inRange(x, [0, m])
  }
  function isYInRange(y: number) {
    return inRange(y, [0, n])
  }
  function pushNode(x: number, y: number) {
    neighbours.push(createNode(rooms[y][x], [y, x]))
  }

  const leftX = curX - 1
  const leftY = curY
  if (isXInRange(leftX) && isYInRange(leftY) && !visited[`${leftY}${leftX}`]) {
    pushNode(leftX, leftY)
  }
  const rightX = curX + 1
  const rightY = curY
  console.log({ rightX, rightY })
  if (
    !visited[`${rightY}${rightX}`] &&
    isXInRange(rightX) &&
    isYInRange(rightY)
  ) {
    pushNode(rightX, rightY)
  }
  const topX = curX
  const topY = curY + 1
  if (!visited[`${topY}${topX}`] && isXInRange(topX) && isYInRange(topY)) {
    pushNode(topX, topY)
  }
  const bottomX = curX
  const bottomY = curY - 1
  if (
    !visited[`${bottomY}${bottomX}`] &&
    isXInRange(bottomX) &&
    isYInRange(bottomY)
  ) {
    pushNode(bottomX, bottomY)
  }
  return neighbours
}

function wallsAndGates(rooms: number[][]) {
  const queue = createQueue<WNode>(100)
  queue.enqueue(createNode(rooms[0][0], [0, 0]))
  let current = queue.dequeue()
  while (current) {
    visited[current.coord.join('')] = current
    const neighbours = getNeighbours(rooms, current.coord)
    console.log('neighbours', neighbours)
    neighbours.forEach(n => {
      queue.enqueue(n)
    })
    // const neighbours = ;
    current = queue.dequeue()
  }
}

wallsAndGates(rooms)
console.log(`visited ${Object.keys(visited).length}`, visited)
