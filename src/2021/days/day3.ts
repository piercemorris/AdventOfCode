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
        const oxygenGeneratorRating = convertToDecimal(findRating(input, Mode.common))
        const co2ScrubberRating = convertToDecimal(findRating(input, Mode.least_common))
        return (oxygenGeneratorRating * co2ScrubberRating).toString()
    }
} as Day

enum Mode {
    common,
    least_common
}

function findRating(setBinaries: string[], mode: Mode): string {
    let binaries = setBinaries
    let binariesLength = setBinaries.length
    let bitLength = setBinaries[0].length

    for (let bitIndex = 0; bitIndex < bitLength-1; bitIndex++) {
        let count = 0

        if (binariesLength === 1) return binaries[0]

        for(let binaryIndex = 0; binaryIndex < binariesLength; binaryIndex++) {
            binaries[binaryIndex][bitIndex] === '1' ? count++ : count-- 
        }

        let target = ''
        if (mode === Mode.common) {
            count >= 0 ? target = '1' : target = '0'
            binaries = filter(binaries, bitIndex, target, mode)
        } else {
            count >= 0 ? target = '0' : target = '1'
            binaries = filter(binaries, bitIndex, target, mode)
        }
        binariesLength = binaries.length
    }
    return binaries[0]
}

function filter(numbers: string[], position: number, value: string, mode: Mode): string[] {
    return numbers.filter(binary => binary[position] === value)
}

function convertToDecimal(binary: string): number {
    return parseInt(binary, 2)
}
