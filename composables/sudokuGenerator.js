const { isValidMove, } = useSudokuSolver()
export const useSudokuGenerator = () => {
  async function generateSudoku(gridSize) {
    console.log('Generating sudoku with grid size:', gridSize);

    if (![9, 16, 25].includes(gridSize)) {
      console.error('Invalid grid size:', gridSize);
      return;
    }

    const grid = createSudokuGrid(gridSize);
    if (fillGridRandomly(grid)) {
      removeNumbers(grid, gridSize); // ここで gridSize を使うか、または difficulty に基づいて数値を削除するロジックを調整する
      return grid;
    } else {
      console.error('Failed to generate a valid grid');
      return null;
    }
  }

  function createSudokuGrid(size) {
    const grid = [];
    for (let i = 0; i < size; i++) {
        const cells = [];
        for (let j = 0; j < size; j++) {
            cells.push({ 
                index: j, 
                value: '', 
                possibleValues: new Set([...Array(size).keys()].map(k => k + 1))
            });
        }
        grid.push({ index: i, cells });
    }
    return grid;}
  function propagateConstraints(grid, row, col, value) {
      const size = grid.length;
      const sqrtSize = Math.sqrt(size);
  
      // 行と列の制約を伝播
      for (let i = 0; i < size; i++) {
          grid[row].cells[i].possibleValues.delete(value);
          grid[i].cells[col].possibleValues.delete(value);
      }
  
      // サブグリッドの制約を伝播
      const startRow = Math.floor(row / sqrtSize) * sqrtSize;
      const startCol = Math.floor(col / sqrtSize) * sqrtSize;
      for (let i = 0; i < sqrtSize; i++) {
          for (let j = 0; j < sqrtSize; j++) {
              grid[startRow + i].cells[startCol + j].possibleValues.delete(value);
          }
      }
  }
  function fillGridRandomly(grid, row = 0, col = 0) {
    if (row === grid.length) {
        return true; // グリッドの最後まで到達した場合、成功
    }

    const nextRow = col === grid.length - 1 ? row + 1 : row;
    const nextCol = col === grid.length - 1 ? 0 : col + 1;

    const numbers = shuffleArray(1, grid.length);
    for (let num of numbers) {
        if (isValidMove(grid, row, col, num)) {
            grid[row].cells[col].value = num;
            propagateConstraints(grid, row, col, num); // 制約を伝播

            if (fillGridRandomly(grid, nextRow, nextCol)) {
                return true; // 次のセルに進む
            }

            // バックトラック: 値と制約をリセット
            grid[row].cells[col].value = '';
            resetConstraints(grid, row, col, num);
        }
    }

    return false; 
}
function resetConstraints(grid, row, col, value) {
  const size = grid.length;
  const sqrtSize = Math.sqrt(size);

  // 行と列の制約をリセット
  for (let i = 0; i < size; i++) {
      if (i !== col) {
          grid[row].cells[i].possibleValues.add(value);
      }
      if (i !== row) {
          grid[i].cells[col].possibleValues.add(value);
      }
  }

  // サブグリッドの制約をリセット
  const startRow = Math.floor(row / sqrtSize) * sqrtSize;
  const startCol = Math.floor(col / sqrtSize) * sqrtSize;
  for (let i = 0; i < sqrtSize; i++) {
      for (let j = 0; j < sqrtSize; j++) {
          if (startRow + i !== row || startCol + j !== col) {
              grid[startRow + i].cells[startCol + j].possibleValues.add(value);
          }
      }
  }
}

  function shuffleArray(start, end) {
    const array = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function removeNumbers(grid, difficulty) {
    const totalCells = grid.length * grid.length;
    let cellsToRemove;

    switch (difficulty) {
      case 'easy':
        cellsToRemove = Math.floor(totalCells * 0.2);
        break;
      case 'medium':
        cellsToRemove = Math.floor(totalCells * 0.4);
        break;
      case 'hard':
        cellsToRemove = Math.floor(totalCells * 0.6);
        break;
      default:
        cellsToRemove = Math.floor(totalCells * 0.2); // デフォルトは簡単なレベル
    }

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * grid.length);
      const col = Math.floor(Math.random() * grid.length);

      if (grid[row].cells[col].value !== '') {
        grid[row].cells[col].value = '';
        cellsToRemove--;
      }
    }
  }
  return { generateSudoku, createSudokuGrid, fillGridRandomly, shuffleArray, removeNumbers };
};