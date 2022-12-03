
function mapAsciiToPriority(char: string) {
  const charCode = char.charCodeAt(0)
  if (charCode >= 97) return charCode - 96
  else return charCode - 38
}

export default {
  solvePartOne: (input: string[]) => {
    let prioritySum = 0
    for (var i = 0; i < input.length; i++) {
      const rucksack = input[i]
      const middle = Math.floor(rucksack.length / 2)
      const firstCompartment = rucksack.substring(0, middle)
      const secondCompartment = rucksack.substring(middle, rucksack.length)

      for (var x = 0; x < middle; x++) {
        const char = firstCompartment[x]
        if (secondCompartment.indexOf(char) !== -1) {
          prioritySum += mapAsciiToPriority(char)
          break
        }
      }
    }
    return prioritySum
  },
  solvePartTwo: (input: string[]) => {
    let prioritySum = 0
    for (var i = 0; i < input.length; i = i+3) {
      const rucksack = input[i]
      const rucksackTwo = input[i+1]
      const rucksackThree = input[i+2]

      for (var j = 0; j < rucksack.length; j++) {
        const char = rucksack[j]
        if (rucksackTwo.indexOf(char) >= 0 && rucksackThree.indexOf(char) >= 0) {
          prioritySum += mapAsciiToPriority(char)
          break
        }
      }
    }
    return prioritySum
  }
}