interface Compartments {
  [key: string]: string[]
}

function megaPop(compartments: Compartments, from: number, quantity: number): string[] {
  const tempCompartment: string[] = []
  for (var i = 0; i < quantity; i++) {
    if (compartments[from].length > 0) {
      const removedElement = compartments[from].pop()
      if (typeof(removedElement) === 'string')  tempCompartment.push(removedElement)
    }
  }
  return tempCompartment
}

function megaPopOrderPreserve(compartments: Compartments, from: number, quantity: number): string[] {
  const tempCompartment: string[] = []
  for (var i = 0; i < quantity; i++) {
    if (compartments[from].length > 0) {
      const removedElement = compartments[from].pop()
      if (typeof(removedElement) === 'string')  tempCompartment.push(removedElement)
    }
  }
  return tempCompartment.reverse()
}

function megaPush(compartments: Compartments, to: number, stack: string[]): Compartments {
  stack.forEach(crate => compartments[to].push(crate))
  return compartments
}

export default {
  solvePartOne: (input: string[]) => {
    let initialStack: Compartments = {
      1: ['S', 'Z', 'P', 'D', 'L', 'B', 'F', 'C'],
      2: ['N', 'V', 'G', 'P', 'H', 'W', 'B'],
      3: ['F', 'W', 'B', 'J', 'G'],
      4: ['G', 'J', 'N', 'F', 'L', 'W', 'C', 'S'],
      5: ['W', 'J', 'L', 'T', 'P', 'M', 'S', 'H'],
      6: ['B', 'C', 'W', 'G', 'F', 'S'],
      7: ['H', 'T', 'P', 'M', 'Q', 'B', 'W'],
      8: ['F', 'S', 'W', 'T'],
      9: ['N', 'C', 'R'],
    }

    for (var i = 10; i < input.length; i++) {
      // console.log(`Initial stack: ${JSON.stringify(initialStack)}`)
      const commands = input[i].split(' ')
      const move = parseInt(commands[1])
      const from = parseInt(commands[3])
      const to = parseInt(commands[5])
      const temp = megaPop(initialStack, from, move)
      initialStack = megaPush(initialStack, to, temp)
      // console.log(`New stack: ${JSON.stringify(initialStack)}`)
    }
    let highestCrate = ''
    Object.values(initialStack).map(crates => highestCrate += crates[crates.length-1])
    return highestCrate
  },
  solvePartTwo: (input: string[]) => {
    let initialStack: Compartments = {
      1: ['S', 'Z', 'P', 'D', 'L', 'B', 'F', 'C'],
      2: ['N', 'V', 'G', 'P', 'H', 'W', 'B'],
      3: ['F', 'W', 'B', 'J', 'G'],
      4: ['G', 'J', 'N', 'F', 'L', 'W', 'C', 'S'],
      5: ['W', 'J', 'L', 'T', 'P', 'M', 'S', 'H'],
      6: ['B', 'C', 'W', 'G', 'F', 'S'],
      7: ['H', 'T', 'P', 'M', 'Q', 'B', 'W'],
      8: ['F', 'S', 'W', 'T'],
      9: ['N', 'C', 'R'],
    }

    for (var i = 10; i < input.length; i++) {
      // console.log(`Initial stack: ${JSON.stringify(initialStack)}`)
      const commands = input[i].split(' ')
      const move = parseInt(commands[1])
      const from = parseInt(commands[3])
      const to = parseInt(commands[5])
      const temp = megaPopOrderPreserve(initialStack, from, move)
      initialStack = megaPush(initialStack, to, temp)
      // console.log(`New stack: ${JSON.stringify(initialStack)}`)
    }
    let highestCrate = ''
    Object.values(initialStack).map(crates => highestCrate += crates[crates.length-1])
    return highestCrate
  }
}