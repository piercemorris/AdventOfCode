const testInput = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390'
]

export default {
  solvePartOne: (input: string[]) => {
    const treeGrid = input
    let isVisibleLineL: boolean[] = []
    let isVisibleLineR: boolean[] = []
    let isVisibleLineT: boolean[] = []
    let isVisibleLineB: boolean[] = []
    
    const isVisibleGridL = []
    const isVisibleGridR = []
    const isVisibleGridT = []
    const isVisibleGridB = []

    let visibleTrees = 0

    for (var y = 0; y < treeGrid.length; y++) {
      const line = treeGrid[y].split('')
      isVisibleLineL = []
      isVisibleLineR = []
      isVisibleLineT = []
      isVisibleLineB = []
      let tallestTreeR = -1
      let tallestTreeL = -1
      let tallestTreeT = -1
      let tallestTreeB = -1

      for (var x = 0; x < line.length; x++) {
        const currentL = parseInt(line[x])
        const currentR = parseInt(line[(line.length-1)-x])
        const currentT = parseInt(treeGrid[x][y])
        const currentB = parseInt(treeGrid[(line.length-1)-x][y])

        if (currentL > tallestTreeL) {
          tallestTreeL = currentL
          isVisibleLineL.push(true)
        } else {
          isVisibleLineL.push(false)
        }

        if (currentR > tallestTreeR) {
          tallestTreeR = currentR
          isVisibleLineR.push(true)
        } else {
          isVisibleLineR.push(false)
        }

        if (currentT > tallestTreeT) {
          tallestTreeT = currentT
          isVisibleLineT.push(true)
        } else {
          isVisibleLineT.push(false)
        }
        
        if (currentB > tallestTreeB) {
          tallestTreeB = currentB
          isVisibleLineB.push(true)
        } else {
          isVisibleLineB.push(false)
        }
      }
      isVisibleGridL.push(isVisibleLineL)
      isVisibleGridR.push(isVisibleLineR.reverse())
      isVisibleGridT.push(isVisibleLineT)
      isVisibleGridB.push(isVisibleLineB.reverse())
    }

    for (var y = 0; y < treeGrid.length; y++) {
      for (var x = 0; x < treeGrid[0].length; x++) {
        if (isVisibleGridL[y][x] || isVisibleGridR[y][x] || isVisibleGridT[x][y] || isVisibleGridB[x][y]) {
          visibleTrees += 1
        }
      }
    }
    return visibleTrees
  },
  solvePartTwo: (input: string[]) => {
    const treeGrid = input
    let highestScenicScore = 0


    const scenicScores: number[][] = []

    for (var row = 0; row < treeGrid[0].length; row++) {
      const currentRow = treeGrid[row].split('')

      const rowScenicScores: number[] = []


      for (var col = 0; col < currentRow.length; col++) {
        const currentTreeHeight = currentRow[col]
        let scoreL = 0
        let scoreR = 0
        let scoreT = 0
        let scoreB = 0
        
        // left
        for (var left = col-1; left >= 0; left--) {
          scoreL++
          if (currentRow[left] >= currentTreeHeight) break
        }

        // right
        for (var right = col+1; right < treeGrid.length; right++) {
          scoreR++
          if (currentRow[right] >= currentTreeHeight) break
        }

        // top
        for (var top = row-1; top >= 0; top--) {
          scoreT++
          if (treeGrid[top].split('')[col] >= currentTreeHeight) break
        }

        // bottom
        for (var bot = row+1; bot < treeGrid.length; bot++) {
          scoreB++
          if (treeGrid[bot].split('')[col] >= currentTreeHeight) break
        }

        let total = scoreL * scoreR * scoreT * scoreB

        rowScenicScores.push(total)
        highestScenicScore = total > highestScenicScore ? total : highestScenicScore
      }

      scenicScores.push(rowScenicScores)
    } 

    return highestScenicScore
  }
}