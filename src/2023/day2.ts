
// 12 red cubes, 13 green cubes, and 14 blue cubes

export default {
  solvePartOne: (input: string[]) => {
    let sumOfIds = 0
    for (let i = 0; i < input.length; i++) {
      let isValidGame = true;
      const line = input[i];
      const gameId = line.split(':')[0].split(' ')[1].trim()
      const gameSets = line.split(':')[1].split(';')

      for (let j = 0; j < gameSets.length; j++) {
        console.log('gameSets', gameSets[j])
        const setConfig = gameSets[j].split(',')
        for (let z = 0; z < setConfig.length; z++) {
          const set = setConfig[z].trim();
          const amount = set.split(' ')[0]
          const color = set.split(' ')[1].trim()

          console.log(color, amount)


          if (color === 'red' && parseInt(amount) > 12 || color === 'green' && parseInt(amount) > 13 || color === 'blue' && parseInt(amount) > 14) {
            isValidGame = false
          }
          console.log('isValid?', isValidGame)
        }
      }

      if (isValidGame) sumOfIds += parseInt(gameId)
      isValidGame = true
    }

    return sumOfIds
  },
  solvePartTwo: (input: string[]) => {
    let powerOfCubes = 0
    for (let i = 0; i < input.length; i++) {
      const line = input[i];
      const gameId = line.split(':')[0].split(' ')[1].trim()
      const gameSets = line.split(':')[1].split(';')

      let minRed = 0
      let minGreen = 0
      let minBlue = 0

      for (let j = 0; j < gameSets.length; j++) {
        const setConfig = gameSets[j].split(',')
        for (let z = 0; z < setConfig.length; z++) {
          const set = setConfig[z].trim();
          const amount = parseInt(set.split(' ')[0])
          const color = set.split(' ')[1].trim()

          if (color === 'blue' && amount > minBlue) {
            minBlue = amount
          }

          if (color === 'red' && amount > minRed) {
            minRed = amount
          }

          if (color === 'green' && amount > minGreen) {
            minGreen = amount
          }
        }
      }

      powerOfCubes += minRed * minGreen * minBlue
    }

    return powerOfCubes
  }
}