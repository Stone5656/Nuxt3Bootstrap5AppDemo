import { isValidMove } from './sudokuSolver';

export function generateSudoku(grid) {
    console.log(grid)
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].cells.length; col++) {
      const num = Math.floor(Math.random() * 100);  // 1から100の間でランダムな数字を生成
      if (isValidMove(grid, row, col, num)) {
        grid[row].cells[col].value = num;  // ルールに違反しない場合は、数字をグリッドに配置
      }
    }
  }
}