import { Day } from "../../models/types"

type Bingo = {
    drawnNumbers: string[],
    boards: string[][][]
}

export default {
    solvePartOne: (input: string[]): string => {
        const data = decodeInput(input)
        console.log(data)
        return ''
    },
    solvePartTwo: (input: string[]): string => {
        return ''
    }
} as Day

function decodeInput(input: string[]): Bingo {
    const drawnNumbers = input[0].split(',')
    const boards = []
    let tempBoard = []

    for (let i = 2; i < input.length; i++) {
        if (input[i] === '') {
            boards.push(tempBoard)
            tempBoard = []
            continue
        }

        tempBoard.push(input[i].split(' ').filter(val => val !== ''))
    }

    return { drawnNumbers, boards }
}

function checkWinningBoard() {

}