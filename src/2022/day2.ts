
function solveRockPaperScissor(firstPlayer: string, secondPlayer: string) {
  switch (firstPlayer) {
    case 'A':
      if (secondPlayer === 'X') return 4
      if (secondPlayer === 'Y') return 8
      if (secondPlayer === 'Z') return 3
    case 'B':
      if (secondPlayer === 'X') return 1
      if (secondPlayer === 'Y') return 5
      if (secondPlayer === 'Z') return 9
    case 'C':
      if (secondPlayer === 'X') return 7
      if (secondPlayer === 'Y') return 2
      if (secondPlayer === 'Z') return 6
    default:
      return 0
  }
}

function solveRockPaperScissorV2(firstPlayer: string, secondPlayer: string) {
  switch (firstPlayer) {
    case 'A': // rock
      if (secondPlayer === 'X') return 3
      if (secondPlayer === 'Y') return 4
      if (secondPlayer === 'Z') return 8
    case 'B': // paper
      if (secondPlayer === 'X') return 1
      if (secondPlayer === 'Y') return 5
      if (secondPlayer === 'Z') return 9
    case 'C': // scissors
      if (secondPlayer === 'X') return 2
      if (secondPlayer === 'Y') return 6
      if (secondPlayer === 'Z') return 7
    default:
      return 0
  }
}

// X needs to lose, Y needs to draw, Z means to win
// rock 1 paper 2 scissors 3
// lose 0 draw 3 win 6

export default {
  solvePartOne: (input: string[]) => {
    let totalScore = 0
    for(var i = 0; i < input.length; i++) {
      const round = input[i].split(' ')
      totalScore += solveRockPaperScissor(round[0], round[1])
    }
    return totalScore
  },
  solvePartTwo: (input: string[]) => {
    let totalScore = 0
    for(var i = 0; i < input.length; i++) {
      const round = input[i].split(' ')
      totalScore += solveRockPaperScissorV2(round[0], round[1])
    }
    return totalScore
  }
}