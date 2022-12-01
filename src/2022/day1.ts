
export default {
  solvePartOne: (input: string[]) => {
    let tempCalorie = 0
    let maxCalorie = 0

    for(var i = 0; i < input.length; i++) {
      if (input[i] === '') {
        if (tempCalorie > maxCalorie) {
          maxCalorie = tempCalorie
        }
      tempCalorie = 0
      } else {
        tempCalorie += parseInt(input[i])
      }
    }

    return maxCalorie
  },
  solvePartTwo: (input: string[]) => {
    let elfCalories = []
    let tempCalorie = 0

    for(var i = 0; i < input.length; i++) {
      if (input[i] === '') {
        elfCalories.push(tempCalorie)
        tempCalorie = 0
      } else {
        tempCalorie += parseInt(input[i])
      }
    }

    elfCalories.sort((a, b) => b - a)

    return `Top 3: ${elfCalories[0]+elfCalories[1]+elfCalories[2]}`
  }
}