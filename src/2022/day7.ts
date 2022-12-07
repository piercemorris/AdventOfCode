type Folder = {
  [key: string]: number
}

function traverseInput(input: string[]) {
  let filesystem: Folder = {}
  let path: string[] = []

  for (var i = 0; i < input.length; i++) {
    const commands: string[] = input[i].split(' ')
    const arg = commands[0] // $ dir <number>
    const arg2 = commands[1] // / cd ls <filename> 
    const arg3 = commands[2] ?? '' // .. <filename>

    if (arg + arg2 === "$cd") {
      if (arg3 === '..') {
        path.pop()
      } else {
        path.length === 0 ? path.push(arg3) : path.push(path.at(-1) + arg3 + '/')

        if (path[path.length-1] in filesystem === false) {
          filesystem[path[path.length-1]] = 0
        }
      }
    } else if (arg+arg2 !== "$ls" && arg !== "dir") {
      for (const folder of path) {
        filesystem[folder] += parseInt(arg)
      }
    }
  }
  return filesystem
}

export default {
  solvePartOne: (input: string[]) => {
    const filesystem = traverseInput(input)
    return  Object.values(filesystem)
      .filter((x) => x <= 100000)
      .reduce((x, c, _) => x + c)
  },
  solvePartTwo: (input: string[]) => {
    const filesystem = traverseInput(input)
    const target = 30000000 - (70000000 - filesystem["/"]);
    return  Object.values(filesystem)
      .filter((x) => x > target)
      .sort((x, y) => x - y)[0]
  }
}