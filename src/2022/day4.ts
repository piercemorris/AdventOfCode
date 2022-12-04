
export default {
  solvePartOne: (input: string[]) => {
    let completeOverlaps = 0
    for (var i = 0; i < input.length; i++) {
      const sections = input[i].split(',')
      const firstElve = sections[0].split('-')
      const secondElve = sections[1].split('-')

      if (parseInt(firstElve[0]) <= parseInt(secondElve[0]) && 
        parseInt(firstElve[1]) >= parseInt(secondElve[1])) {
          completeOverlaps += 1
      } else if (parseInt(firstElve[0]) >= parseInt(secondElve[0]) && 
        parseInt(firstElve[1]) <= parseInt(secondElve[1])) {
          completeOverlaps += 1
      }
    }
    return completeOverlaps
  },
  solvePartTwo: (input: string[]) => {
    let completeOverlaps = 0
    for (var i = 0; i < input.length; i++) {
      const sections = input[i].split(',')
      const firstElve = sections[0].split('-')
      const secondElve = sections[1].split('-')

      if (parseInt(firstElve[0]) <= parseInt(secondElve[0]) && 
        parseInt(firstElve[1]) >= parseInt(secondElve[0])) {
          completeOverlaps += 1
      } else if (parseInt(firstElve[0]) >= parseInt(secondElve[0]) && 
        parseInt(firstElve[0]) <= parseInt(secondElve[1])) {
          completeOverlaps += 1
      }
    }
    return completeOverlaps
  }
}