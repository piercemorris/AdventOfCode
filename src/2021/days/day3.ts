import { Day } from "../../models/types"

export default {
    solvePartOne: (input: string[]): string => {
        const length = input.length
        const binLength = input[0].length
        const maxCounts: Array<number> = []

        for (let i = 0; i < length; i++) {
            let binary = input[i].split('') // string
            for (let j = 0; j < binLength; j++) {
                if (!maxCounts[j]) maxCounts[j] = 0
                if (binary[j] === '1') maxCounts[j] += 1
            }
        }

        for (let i = 0; i < binLength; i++) {
            maxCounts[i] = maxCounts[i] <= Math.floor(length/2) ? 0 : 1
        }

        const gamma = parseInt(maxCounts.join(""), 2)
        const epsilon = parseInt(maxCounts.map(bit => bit === 1 ? 0 : 1).join(""), 2)

        return (gamma*epsilon).toString()
    },
    solvePartTwo: (input: string[]): string => {
        return ''
    }
} as Day