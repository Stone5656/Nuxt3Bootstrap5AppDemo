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
  console.log(gridSize)

  const grid = createSudokuGrid(gridSize);
  fillGridRandomly(grid); // ここでグリッドにランダムな数字を配置

  return grid;
}


export function createSudokuGrid(size) {
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
function fillGridRandomly(grid) {
  grid.forEach(row => {
    row.cells.forEach(cell => {
      // 1からグリッドサイズまでのランダムな数字を生成
      const randomNumber = Math.ceil(Math.random() * grid.length);
      cell.value = randomNumber;
    });
  });
}