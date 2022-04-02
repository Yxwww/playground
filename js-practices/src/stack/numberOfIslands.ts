const grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]

function isWater(cell: string) {
  return cell === '0'
}
function isIsland(cell: string) {
  return cell === '1'
}
type Vec2 = [number, number]

function createNode(value: string, coord: Vec2) {
  return {
    value,
    coord,
  }
}

type INode = ReturnType<typeof createNode>

const visited: { [index: string]: INode } = {}

function getNeighbours(grid: string[][], [x, y]: Vec2) {
  const neightbours: INode[] = []

  function pushNode([x, y]: Vec2) {
    if (!visited[[x, y].join('')]) {
      neightbours.push(createNode(grid[y][x], [x, y]))
    }
  }

  const leftX = x - 1
  const leftY = y
  if (grid[leftY] && grid[leftY][leftX]) {
    pushNode([leftX, leftY])
  }

  const rightX = x + 1
  const rightY = y
  if (grid[rightY] && grid[rightY][rightX]) {
    pushNode([rightX, rightY])
  }

  const topX = x
  const topY = y + 1
  if (grid[topY] && grid[topY][topX]) {
    pushNode([topX, topY])
  }

  const bottomX = x
  const bottomY = y - 1
  if (grid[bottomY] && grid[bottomY][bottomX]) {
    pushNode([bottomX, bottomY])
  }

  return neightbours
}

function numIslands(grid: string[][]) {
  let current: INode | undefined = createNode(grid[0][0], [0, 0])
  const stack: INode[] = []

  const islands: { [key: string]: number } = {}
  let islandCount = 0
  let isCounting = false
  while (current) {
    if (!isCounting && isIsland(current.value)) {
      islandCount++
      isCounting = true
    }
    visited[current.coord.join('')] = current
    islands[current.coord.join('')] = islandCount
    const neightbours = getNeighbours(grid, current.coord)
    neightbours
      .filter(({ value }) => isIsland(value))
      .forEach(n => {
        stack.push(n)
      })
    current = stack.pop()
  }
  return {
    islandCount,
    islands,
  }
}

console.log(numIslands(grid))
