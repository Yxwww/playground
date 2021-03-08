import { createQueue } from '../circular-queue.ts'

const rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
]
const result = [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]

type Vec2 = [number, number]
function isEmpty(room: number) {
  return room === 2147483647
}
function isGate(room: number) {
  return room === 0
}
function isWall(room: number) {
  return room === -1
}

function createNode(room: number, coord: Vec2, steps = 10000) {
  return {
    room,
    distance: steps,
    coord,
  }
}

type WNode = ReturnType<typeof createNode>

const visited: { [idx: string]: WNode } = {}

function inRange(v: number, [min, max]: Vec2) {
  return v < max && v >= min
}

function getNeighbours(
  rooms: number[][],
  currentCoord: Vec2,
  steps: number
): WNode[] {
  const neighbours: WNode[] = []
  const [curX, curY] = currentCoord
  const m = rooms[0].length
  const n = rooms.length
  function isXInRange(x: number) {
    return inRange(x, [0, m])
  }
  function isYInRange(y: number) {
    return inRange(y, [0, n])
  }
  function pushNode(x: number, y: number) {
    const room = rooms[y][x]
    neighbours.push(createNode(room, [x, y], steps))
  }

  const leftX = curX - 1
  const leftY = curY
  if (isXInRange(leftX) && isYInRange(leftY) && !visited[`${leftX}${leftY}`]) {
    pushNode(leftX, leftY)
  }
  const rightX = curX + 1
  const rightY = curY
  if (
    !visited[`${rightX}${rightY}`] &&
    isXInRange(rightX) &&
    isYInRange(rightY)
  ) {
    pushNode(rightX, rightY)
  }
  const topX = curX
  const topY = curY - 1
  if (!visited[`${topX}${topY}`] && isXInRange(topX) && isYInRange(topY)) {
    pushNode(topX, topY)
  }
  const bottomX = curX
  const bottomY = curY + 1
  if (
    !visited[`${bottomX}${bottomY}`] &&
    isXInRange(bottomX) &&
    isYInRange(bottomY)
  ) {
    pushNode(bottomX, bottomY)
  }
  return neighbours
}

function wallsAndGates(rooms: number[][]) {
  const queue = createQueue<WNode>(100)
  queue.enqueue(createNode(rooms[0][0], [0, 0], 0))
  let current = queue.dequeue()
  let steps = 0
  while (current) {
    visited[current.coord.join('')] = current
    steps++
    const neighbours = getNeighbours(rooms, current.coord, steps)
    const gateNeighbours = neighbours.filter(n => isGate(n.room))
    const emptyNeighbours = neighbours.filter(n => isEmpty(n.room))
    if (gateNeighbours.length > 0) {
      console.log('found gate near', current.coord)
      Object.entries(visited).forEach(([coord, n]) => {
        console.log(coord, '-', n.distance)
        n.distance = steps - n.distance
      })
      break
    }
    emptyNeighbours.forEach(n => {
      queue.enqueue(n)
    })
    // const neighbours = ;
    current = queue.dequeue()
  }
}

wallsAndGates(rooms)
console.log(
  `visited ${Object.keys(visited).length}`,
  Object.entries(visited).map(([coord, { distance }]) => ({ coord, distance }))
)
