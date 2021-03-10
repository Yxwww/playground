import { createQueue } from '../circular-queue.ts'

const initial = '0000'
const deadEnds = ['0201', '0101', '0102', '1212', '2002']
const deadEndsMap = new Set([...deadEnds])
const target = '0202'

// const initial = '00'
// const deadEnds = ['11']
// const deadEndsMap = new Set([...deadEnds])
// const target = '02'

// for 0000, neighbours are: 1000, 9000, 0100, 0900,
type MoveTuple = [string, string]
function makeMove(value: string, index: number): MoveTuple {
  const arr = value.split('')
  const cell = Number(value[index])
  // handle incResult
  const incUpdate = ((cell + 1) % 10).toString()
  const decUpdate = (cell - 1 < 0 ? 9 : cell - 1).toString() // 0 - 1 = 9
  const incArrResult = [...arr]
  const decArrResult = [...arr]
  incArrResult[index] = incUpdate
  decArrResult[index] = decUpdate
  return [incArrResult.join(''), decArrResult.join('')]
}

function forEach(str: string, cb: (arg: string, index: number) => void) {
  for (var i = 0; i < str.length; i++) {
    cb(str[i], i)
  }
}

function computeNeighbours(current: string): MoveTuple[] {
  const moves: MoveTuple[] = []
  forEach(current, (_, index) => {
    const move = makeMove(current, index)
    moves.push(move)
  })
  return moves
}

interface N {
  n: string
  steps: number
}

function openTheLock() {
  let result = -1
  let moves = 0

  const queue = createQueue<N>(100000)
  // const stack: string[] = []
  const visited: { [key: string]: boolean } = {}

  let current: N | undefined = { n: initial, steps: 0 }
  while (current) {
    visited[current.n] = true
    const { steps } = current
    if (current.n === target) {
      result = steps
    }
    const neighbours = computeNeighbours(current.n)

    neighbours.forEach(tuple => {
      tuple.forEach(n => {
        if (typeof visited[n] === 'undefined' && !deadEndsMap.has(n)) {
          queue.enqueue({ n, steps: steps + 1 })
        }
      })
    })
    current = queue.dequeue()
  }

  return result
}

console.log(openTheLock())
