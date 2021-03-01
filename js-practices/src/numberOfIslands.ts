import { createQueue } from './circular-queue.ts'
const input = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]

function computeIsWater(value: string) {
  return value === '0'
}

export function numIsland(grid: string[][]) {
  const queue = createQueue<{ isWater: boolean; coordinate: [number, number] }>(
    100
  )
  const islands = []
  queue.enqueue({
    isWater: computeIsWater(grid[0][0]),
    coordinate: [0, 0],
  })
  let current = queue.dequeue()
  let currentIsland: [number, number][] = []

  while (current) {
    // get neighbour
    if (!current.isWater) {
      if (!currentIsland) {
        currentIsland = []
        islands.push(currentIsland)
      }
      currentIsland.push(current.coordinate)
    } else {
    }
    current = queue.dequeue()
  }
}

numIsland(input)
