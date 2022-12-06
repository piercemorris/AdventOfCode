
function uniqueChars(code: string[]) {
  return !code.some((v, i) => code.indexOf(v) < i);
}

export default {
  solvePartOne: (input: string[]) => {
    const chars = input[0].split('')
    let index = 0
    let string = []

    for (var i = 0; i < chars.length; i++) {
      string.push(chars[i])
      if (string.length === 4) {
        if (uniqueChars(string)) {
          index = i + 1
          break
        }
        string.shift()
      }
    }

    return index
  },
  solvePartTwo: (input: string[]) => {
    const chars = input[0].split('')
    let index = 0
    let string = []

    for (var i = 0; i < chars.length; i++) {
      string.push(chars[i])
      if (string.length === 14) {
        if (uniqueChars(string)) {
          index = i + 1
          break
        }
        string.shift()
      }
    }
    return index
  }
}