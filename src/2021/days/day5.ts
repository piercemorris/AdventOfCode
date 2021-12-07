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

enum Orien {
    pos = 1,
    neg = -1
}

export default {
    solvePartOne: (input: string[]): string => {
        const coordData = formatInput(input)
        let grid = new Array(BaseCoords.maxX*BaseCoords.maxY).fill(0)
        let currentCoord = []

        for (let coordIndex = 0; coordIndex < coordData.length; coordIndex++) {
            currentCoord = coordData[coordIndex]

            if (currentCoord[Coords.x] === currentCoord[Coords.x2]) {
                grid = mapVerticalLine(currentCoord, grid)
            } else if (currentCoord[Coords.y] === currentCoord[Coords.y2]) {
                grid = mapHorizontalLine(currentCoord, grid)
            }
        }
        // writeGridToFile(grid)
        return determineDangerousHydrothermalVents(grid).toString()
    },
    solvePartTwo: (input: string[]): string => {
        const coordData = formatInput(input)
        let grid = new Array(BaseCoords.maxX*BaseCoords.maxY).fill(0)
        let currentCoord = []

        for (let coordIndex = 0; coordIndex < coordData.length; coordIndex++) {
            currentCoord = coordData[coordIndex]

            if (currentCoord[Coords.x] === currentCoord[Coords.x2]) {
                grid = mapVerticalLine(currentCoord, grid)
            } else if (currentCoord[Coords.y] === currentCoord[Coords.y2]) {
                grid = mapHorizontalLine(currentCoord, grid)
            } else {
                grid = mapDiagonalLine(currentCoord, grid)
            }
        }
        // writeGridToFile(grid)
        return determineDangerousHydrothermalVents(grid).toString()
    }
} as Day

function writeGridToFile(grid: number[]) { // testing purposes
    const gridStringFormat = grid.map((coord, i) => i % BaseCoords.maxX === 0 && i !== 0 ? coord.toString() + '\n' : coord.toString()).join('')

    fs.writeFileSync("grid.txt", gridStringFormat, 'utf-8')
}

function determineDangerousHydrothermalVents(grid: number[]) {
    return grid.filter(dangerValue => dangerValue > 1).length
}

function mapDiagonalLine(coords: number[], grid: number[]): number[] {
    let updatedGrid = [...grid]
    const iterations = Math.abs((coords[Coords.x2] - coords[Coords.x])) + 1
    const isGrowingXPlane = coords[Coords.x] < coords[Coords.x2]
    const isGrowingYPlane = coords[Coords.y] < coords[Coords.y2]

    if (isGrowingXPlane && isGrowingYPlane) {
        updatedGrid = mapLine(iterations, coords, Orien.pos, Orien.pos, updatedGrid)
    } else if (!isGrowingXPlane && isGrowingYPlane) {
        updatedGrid = mapLine(iterations, coords, Orien.neg, Orien.pos, updatedGrid)
    } else if (isGrowingXPlane && !isGrowingYPlane) {
        updatedGrid = mapLine(iterations, coords, Orien.pos, Orien.neg, updatedGrid)
    } else if (!isGrowingYPlane && !isGrowingYPlane) {
        updatedGrid = mapLine(iterations, coords, Orien.neg, Orien.neg, updatedGrid)
    }
    return updatedGrid
}

function mapLine(iterations: number, coords: number[], xOrientation: Orien, yOritentation: Orien, grid: number[]): number[] { 
    const updatedGrid = [...grid]
    for (let i = 0; i < iterations; i++) {
        updatedGrid[determineHydrothermalVent(coords[Coords.x] + i*xOrientation, coords[Coords.y] + i*yOritentation)] += 1
    }
    return updatedGrid
}

function mapHorizontalLine(coords: number[], grid: number[]): number[] {
    const updatedGrid = [...grid]
    const determineIterations = Math.abs((coords[Coords.x2] - coords[Coords.x])) + 1
    const smallX = Math.min(coords[Coords.x], coords[Coords.x2])

    for (let x = 0; x < determineIterations; x++) {
        updatedGrid[determineHydrothermalVent(smallX + x, coords[Coords.y])] += 1
    }

    return updatedGrid
}

function mapVerticalLine(coords: number[], grid: number[]): number[] {
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