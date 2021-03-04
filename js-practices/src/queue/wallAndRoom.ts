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

function getNeighbours(rooms: number[][], currentCoord: Vec2): WNode[] {
  const neighbours: WNode[] = []
  const [curX, curY] = currentCoord
  // console.log('visited', visited)
  // TODO check visited
  if (curX - 1 >= 0 && !visited[`${curX - 1}${curY}`]) {
    neighbours.push(createNode(rooms[curX - 1][curY], [curX - 1, curY]))
  }
  if (curX + 1 < rooms[0].length && !visited[`${curX + 1}${curY}`]) {
    console.log(curX + 1, curY, rooms[curX + 1])
    neighbours.push(createNode(rooms[curX + 1][curY], [curX + 1, curY]))
  }
  if (curY - 1 >= 0 && !visited[`${curX}${curY - 1}`]) {
    neighbours.push(createNode(rooms[curX][curY - 1], [curX, curY - 1]))
  }
  if (curY + 1 < rooms.length && !visited[`${curX}${curY + 1}`]) {
    neighbours.push(createNode(rooms[curX][curY + 1], [curX, curY + 1]))
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
    neighbours.forEach(n => {
      queue.enqueue(n)
    })
    // const neighbours = ;
    current = queue.dequeue()
  }
}

wallsAndGates(rooms)
console.log(`visited ${Object.keys(visited).length}`, visited)
