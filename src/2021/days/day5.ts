import fs = require('fs')
import { Day } from "../../models/types"

enum Coords {
    x,
    y,
    x2,
    y2
}

enum BaseCoords {
    originX = 0,
    originY = 0,
    maxX = 1000,
    maxY = 1000
}

export default {
    solvePartOne: (input: string[]): string => {
        const coordData = formatInput(input)
        let grid = new Array(BaseCoords.maxX*BaseCoords.maxY).fill(0)
        console.log(grid.length)
        let currentCoord = []
        let verticalLines = 0
        let horizontalLines = 0

        for (let coordIndex = 0; coordIndex < coordData.length; coordIndex++) {
            currentCoord = coordData[coordIndex]

            if (currentCoord[Coords.x] === currentCoord[Coords.x2]) {
                verticalLines += 1
                grid = mapVerticalLine(currentCoord, grid)
            } else if (currentCoord[Coords.y] === currentCoord[Coords.y2]) {
                horizontalLines += 1
                grid = mapHorizontalLine(currentCoord, grid)
            } 

        }

        console.log(`Vertical lines ${verticalLines}, horizontal lines ${horizontalLines}`)
        writeGridToFile(grid)
        return determineDangerousHydrothermalVents(grid).toString()
    },
    solvePartTwo: (input: string[]): string => {
        return ''
    }
} as Day

function writeGridToFile(grid: number[]) { // testing purposes
    const gridStringFormat = grid.map((coord, i) => i % BaseCoords.maxX === 0 && i !== 0 ? coord.toString() + '\n' : coord.toString()).join('')

    fs.writeFileSync("grid.txt", gridStringFormat, 'utf-8')
}

function determineDangerousHydrothermalVents(grid: number[]) {
    return grid.filter(dangerValue => dangerValue > 1).length
}

function mapHorizontalLine(coords: number[], grid: number[]): number[] {
    // horizontal, y constant, x variable
    const updatedGrid = [...grid]
    const determineIterations = Math.abs((coords[Coords.x2] - coords[Coords.x])) + 1
    const smallX = Math.min(coords[Coords.x], coords[Coords.x2])

    for (let x = 0; x < determineIterations; x++) {
        updatedGrid[determineHydrothermalVent(smallX + x, coords[Coords.y])] += 1
    }

    return updatedGrid
}

function mapVerticalLine(coords: number[], grid: number[]): number[] {
    // vertical, x constant, y variable
    const updatedGrid = [...grid]
    const determineIterations = Math.abs((coords[Coords.y2] - coords[Coords.y])) + 1
    const smallY = Math.min(coords[Coords.y], coords[Coords.y2])

    for (let y = 0; y < determineIterations; y++) {
        updatedGrid[determineHydrothermalVent(coords[Coords.x], smallY + y)] += 1
    }

    return updatedGrid
}

function formatInput(input: string[]): number[][] { // could transform to Coordinate type object
    return input.map(mapping => mapping.split(" ").filter(val => val !== '->').map(coords => coords.split(',').map(coord => parseInt(coord))).flat()) // can reduce this if I knew better regex
}

function determineHydrothermalVent(x: number, y: number): number {
    return y * BaseCoords.maxY + x
}