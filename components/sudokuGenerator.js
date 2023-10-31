export function generateSudoku(difficulty) {
  console.log('Generating sudoku with difficulty:', difficulty);
  const gridSizes = {
    easy: 9,
    medium: 16,
    hard: 25 // 例として25x25をハードに設定
  };

  const gridSize = gridSizes[difficulty];
  if (!gridSize) {
    console.error('Invalid difficulty level:', difficulty);
    return;
  }

  const grid = createSudokuGrid(gridSize); // グリッドサイズに基づいて数独を生成

  return grid;
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

module.exports = createSudokuGrid;