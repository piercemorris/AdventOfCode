import { Day } from "../../models/types"
import { typedKeys } from "../../utils/util"

interface NumberObject {
    [key: number]: number
}

export default {
    solvePartOne: (input: string[]): string => {
        const positions = formatInput(input)
        const medianCrabPosition = calculateMedianCrabPosition(positions)
        return calculateFuelCost(positions, medianCrabPosition).toString()
    },
    solvePartTwo: (input: string[]): string => {
        return ''
    }
} as Day

function calculateMedianCrabPosition(positions: number[]): number {
    return positions.sort((a, b) => a - b)[positions.length/2]
}

function calculateFuelCost(positions: number[], position: number): number {
    let fuel = 0
    for (var i = 0; i < positions.length; i++) {
        fuel += Math.abs(positions[i] - position)
    }
    return fuel
}

function formatInput(input: string[]): number[] {
    return input[0].split(',').map(val => parseInt(val))
}