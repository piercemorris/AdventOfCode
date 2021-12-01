import { readFileForDay } from './utils/util'

async function solveForDay(dayNumber: number): Promise<void> {
    const input = readFileForDay(dayNumber)
    const { default: day } = await import(`./days/day${dayNumber}`)

    const partOneAnswer = day.solvePartOne(input)
    console.log(`Part 1: ${partOneAnswer}`)
    const partTwoAnswer = day.solvePartTwo(input)
    console.log(`Part 2: ${partTwoAnswer}`)
}

const dayNumber = 1
solveForDay(dayNumber)