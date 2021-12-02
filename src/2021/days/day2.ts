import { Day } from "../../models/types"

export default {
    solvePartOne: (input: string[]): string => {
        let depth = 0
        let horizontal = 0
        
        for (let i = 0; i < input.length-1; i++) {
            let section = input[i].split(' ')
            if (section[0] === 'forward') {
                horizontal += parseInt(section[1])
            } else if (section[0] === 'down') {
                depth += parseInt(section[1])
            } else if (section[0] === 'up') {
                depth -= parseInt(section[1])
            }
        }
        console.log(depth, horizontal)
        return (depth*horizontal).toString()
    },
    solvePartTwo: (input: string[]): string => {
        let depth = 0
        let horizontal = 0
        let aim = 0
        
        for (let i = 0; i < input.length-1; i++) {
            let section = input[i].split(' ')
            if (section[0] === 'forward') {
                horizontal += parseInt(section[1])
                depth += parseInt(section[1]) * aim
            } else if (section[0] === 'down') {
                aim += parseInt(section[1])
            } else if (section[0] === 'up') {
                aim -= parseInt(section[1])
            }
        }
        console.log(depth, horizontal)
        return (depth*horizontal).toString()
    }
} as Day