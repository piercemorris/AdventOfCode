import fs = require('fs')

export function readFile(fileName: string): string[] {
    return fs.readFileSync(fileName, 'utf8').toString().split('\n')
}

export function readFileForDay(day: number, year: number): string[] {
    return readFile(`data/${year}/day${day}/input.txt`)
}

export function inputToInt(input: string[]): number[] {
    return input.map(val => parseInt(val))
}

export function typedKeys<T>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[];
}