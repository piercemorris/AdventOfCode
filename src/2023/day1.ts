
export default {
  solvePartOne: (input: string[]) => {
    let total = 0

    for (const line of input) {
      let firstNumber = ''
      let lastNumber = ''

      for (const char of line) {
        if (!isNaN(parseInt(char))) {
          if (firstNumber === '') {
            firstNumber = char
          }
          lastNumber = char
        }
      }

      if (firstNumber && lastNumber) {
        total = total + parseInt(firstNumber + lastNumber)
      }
    }
    return total // 55621
  },
  solvePartTwo: (input: string[]) => {
    let total = 0

    for (const line of input) {
      let firstNumber = undefined
      let lastNumber = ''

      for (var i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line[i]))) {
          if (firstNumber === undefined) {
            firstNumber = line[i]
          }
          lastNumber = line[i]
        }

        let stringNumber = ''
        if (line[i] === 'o' && line[i + 1] === 'n' && line[i + 2] === 'e') {
          stringNumber = '1'
        } else if (line[i] === 't' && line[i + 1] === 'w' && line[i + 2] === 'o') {
          stringNumber = '2'
        } else if (line[i] === 't' && line[i + 1] === 'h' && line[i + 2] === 'r' && line[i + 3] === 'e' && line[i + 4] === 'e') {
          stringNumber = '3'
        } else if (line[i] === 'f' && line[i + 1] === 'o' && line[i + 2] === 'u' && line[i + 3] === 'r') {
          stringNumber = '4'
        } else if (line[i] === 'f' && line[i + 1] === 'i' && line[i + 2] === 'v' && line[i + 3] === 'e') {
          stringNumber = '5'
        } else if (line[i] === 's' && line[i + 1] === 'i' && line[i + 2] === 'x') { 
          stringNumber = '6'
        } else if (line[i] === 's' && line[i + 1] === 'e' && line[i + 2] === 'v' && line[i + 3] === 'e' && line[i + 4] === 'n') { 
          stringNumber = '7'
        } else if (line[i] === 'e' && line[i + 1] === 'i' && line[i + 2] === 'g' && line[i + 3] === 'h' && line[i + 4] === 't') { 
          stringNumber = '8'
        } else if (line[i] === 'n' && line[i + 1] === 'i' && line[i + 2] === 'n' && line[i + 3] === 'e') { 
          stringNumber = '9'
        }

        if (stringNumber !== '') {
          if (firstNumber === undefined) {
            firstNumber = stringNumber
          }
  
          lastNumber = stringNumber
        }
      }

      if (firstNumber && lastNumber) {
        total = total + parseInt(firstNumber + lastNumber)
      }
    }
    return total // 53592
  }
}