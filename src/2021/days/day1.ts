import { Day } from "../../models/types"
import { inputToInt } from "../../utils/util"

export default {
    solvePartOne: (input: string[]): string => {
        const sonarLevels = inputToInt(input)
        let depthIncreases = 0

        for (let i = 1; i < sonarLevels.length; i++) {
            if (sonarLevels[i-1] < sonarLevels[i]) depthIncreases++
        }

        return depthIncreases.toString()
    },
    solvePartTwo: (input: string[]): string => {
        const sonarLevels = inputToInt(input)
        const threshold = 3
        let depthIncreases = 0

        for (let i=threshold; i<sonarLevels.length-threshold; i++) {
            let window = sonarLevels[i] + sonarLevels[i+1] + sonarLevels[i+2]
            let nextWindow =  sonarLevels[i+1] + sonarLevels[i+2] + sonarLevels[i+3]
    
            if (window < nextWindow) {
                depthIncreases += 1
            }
        }
        return depthIncreases.toString()
    }
} as Day