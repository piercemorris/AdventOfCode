import { readFileForDay } from './utils/util'

async function solveForDay(day: number, year: number): Promise<void> {
    const input = readFileForDay(day)
    const { default: solution } = await import(`./${year}/days/day${day}`)

    const partOneAnswer = solution.solvePartOne(input)
    console.log(`Part 1: ${partOneAnswer}`)
    const partTwoAnswer = solution.solvePartTwo(input)
    console.log(`Part 2: ${partTwoAnswer}`)
}
const year = 2021
const day = 3
solveForDay(day, year)