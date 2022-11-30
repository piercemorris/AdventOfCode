import { Day } from "../models/types"

type StateMap = {
    '0': number,
    '1': number,
    '2': number,
    '3': number,
    '4': number,
    '5': number,
    '6': number,
    '7': number,
    '8': number
}

export default {
    solvePartOne: (input: string[]): string => {
        let newLanternfish = formatInput(input)
        const days = 80

        for (let day = 0; day < days; day++) {
            newLanternfish = dayCycle(newLanternfish)
        }

        return newLanternfish.length.toString()
    },
    solvePartTwo: (input: string[]): string => {
        let newLanternfish = formatInput(input)
        let initialState = mapInputToState(newLanternfish)
        const days = 256
        for (let day = 0; day < days; day++) {
            initialState = newDayCycle(initialState)
        }

        return calculateNewFish(initialState).toString()
    }
} as Day

function typedKeys<T>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[];
}

function calculateNewFish(state: StateMap): number {
    let fish = 0
    typedKeys(state).forEach(key => {
        fish += state[key]
    })
    return fish
}

function newDayCycle(initialState: StateMap): StateMap {
    let newFish: StateMap = {...initialState}
    const newFishToAdd = initialState['0']

    typedKeys(newFish).forEach(key => {
        if (key !== '8') {
            const keyUp = (parseInt(key) + 1).toString() as keyof StateMap
            newFish[key] = newFish[keyUp]
        }
    })

    newFish['6'] += newFishToAdd
    newFish['8'] = newFishToAdd
    return newFish

}

function formatInput(input: string[]): number[] {
    return input[0].split(',').map(val => parseInt(val))
}

function getNumberOfDaysRemaining(input: number[], days: number): number {
    return input.filter(val => val === days).length
}

function dayCycle(lanternfish: number[]): number[] {
    let fishToAdd = 0
    let fishes = [...lanternfish]

    for (let fishIndex = 0; fishIndex < lanternfish.length; fishIndex++) {
        if (fishes[fishIndex] === 0) {
            fishes[fishIndex] = 6
            fishToAdd++
        } else {
            fishes[fishIndex] -= 1
        }
    }

    for (let newFish = 0; newFish < fishToAdd; newFish++) {
        fishes.push(8)
    }

    return fishes
}

function mapInputToState(input: number[]): StateMap {
    return {
        0: getNumberOfDaysRemaining(input, 0),
        1: getNumberOfDaysRemaining(input, 1),
        2: getNumberOfDaysRemaining(input, 2),
        3: getNumberOfDaysRemaining(input, 3),
        4: getNumberOfDaysRemaining(input, 4),
        5: getNumberOfDaysRemaining(input, 5),
        6: getNumberOfDaysRemaining(input, 6),
        7: getNumberOfDaysRemaining(input, 7),
        8: getNumberOfDaysRemaining(input, 8)
    }
}