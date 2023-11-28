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
        cells.push({ index: j, value: '' });
      }
      grid.push({ index: i, cells });
    }
    return grid;
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
        if (fillGridRandomly(grid, nextRow, nextCol)) {
          return true; // 次のセルに進む
        }
        grid[row].cells[col].value = ''; // バックトラック
      }
    }

    return false; // このセルに適切な数字が見つからない場合
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