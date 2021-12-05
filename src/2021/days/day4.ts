import { Day } from "../../models/types"

type Bingo = {
    numbersToDraw: number[],
    boards: number[][][]
}

export default {
    solvePartOne: (input: string[]): string => {
        const { numbersToDraw, boards } = formatInput(input)
        let drawnNumbers = []
        let score = 0

        for(let i = 0; i < numbersToDraw.length; i++) {
            drawnNumbers.push(numbersToDraw[i])
            score = checkBoardsForWin(boards, drawnNumbers)
            if (score > 0) break
        }

        return score.toString()
    },
    solvePartTwo: (input: string[]): string => {
        const { numbersToDraw, boards } = formatInput(input)
        let drawnNumbers = []
        let score = 0
        let remainingBoards = [...boards]

        for(let i = 0; i < numbersToDraw.length; i++) {
            drawnNumbers.push(numbersToDraw[i])
            const data = calculateLastWinningBoard(remainingBoards, drawnNumbers)
            remainingBoards = data.remainingBoards
            if (data.isFinished) break
        }

        score = calculateWinningScore(remainingBoards[0], drawnNumbers)

        return score.toString()
    }
} as Day

function calculateWinningScore(board: number[][], drawnNumbers: number[]): number {
    let tally = 0
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if(!drawnNumbers.includes(board[y][x])) {
                tally += board[y][x]
            }
        }
    }

    return tally*drawnNumbers[drawnNumbers.length-1]
}

function calculateLastWinningBoard(boards: number[][][], drawnNumbers: number[]) {
    const remainingBoards = [...boards]
    for(let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        for (var i = 0; i < boards[0].length; i++) {
            const board = boards[boardIndex]
            const row = board[i]
            const column = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]]
            const isRow = isDrawnMatches(drawnNumbers, row)
            const isColumn =  isDrawnMatches(drawnNumbers, column)

            if (isRow || isColumn) {
                if (remainingBoards.length === 1) {
                    return  { remainingBoards, isFinished: true }
                } else {
                    const index = remainingBoards.indexOf(board)
                    remainingBoards.splice(index, 1)
                    break
                }
            }
        }
    }
    return { remainingBoards, isFinished: false }
}

function checkBoardsForWin(boards: number[][][], drawnNumbers: number[]): number {
    for(let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        for (var i = 0; i < boards[0].length; i++) {
            const board = boards[boardIndex]
            const row = board[i]
            const column = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]] // hardcoded for 5 (fix)
            const isRow = isDrawnMatches(drawnNumbers, row)
            const isColumn =  isDrawnMatches(drawnNumbers, column)

            if (isRow) {
                return calculateWinningScore(board, drawnNumbers)
            }

            if (isColumn) {
                return calculateWinningScore(board, drawnNumbers)
            }
        }
    }
    return 0
}

function isDrawnMatches(drawnNumbers: number[], targets: number[]) {
    return targets.every(target => drawnNumbers.includes(target))
}

function formatInput(input: string[]): Bingo {
    const numbersToDraw = input[0].split(',').map(val => parseInt(val))
    const boards = []
    let tempBoard = []

    for (let i = 2; i < input.length; i++) {
        if (input[i] === '') {
            boards.push(tempBoard)
            tempBoard = []
            continue
        }

        tempBoard.push(input[i].split(' ').filter(val => val !== '').map(val => parseInt(val)))
    }

    return { numbersToDraw, boards }
}
