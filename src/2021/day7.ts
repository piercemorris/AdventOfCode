import { Day } from "../models/types"

export default {
    solvePartOne: (input: string[]): string => {
        const positions = formatInput(input)
        const medianCrabPosition = calculateMedianCrabPosition(positions)
        return calculateFuelCost(positions, medianCrabPosition).toString()
    },
    solvePartTwo: (input: string[]): string => {
        const positions = formatInput(input)
        const averageCrabPosition = calculateAverageCrabPosition(positions)
        let averages = [averageCrabPosition-1, averageCrabPosition, averageCrabPosition+1]
        averages = averages.map(average => calculateIncreasingFuelCost(positions, average))
        return averages.join(",")
    }
} as Day

function calculateMedianCrabPosition(positions: number[]): number {
    return positions.sort((a, b) => a - b)[positions.length/2]
}

function calculateAverageCrabPosition(positions: number[]): number {
    return Math.round(positions.reduce((prev, curr) => prev + curr)/positions.length)
}

function calculateIncreasingFuelCost(positions: number[], position: number): number {
    let fuel = 0
    for (var i = 0; i < positions.length; i++) {
        const difference = Math.abs(positions[i] - position)
        fuel += (difference*(difference+1))/2
    }
    return fuel
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