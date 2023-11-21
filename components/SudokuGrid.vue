<template>
  <div class="sudoku-grid-container">
    <div class="sudoku-grid-button">
      <button @click="fillNumbers" class="button">Fill Numbers</button>
      <button @click="setDifficulty('easy')" class="button">Easy</button>
      <button @click="setDifficulty('medium')" class="button">Medium</button>
      <button @click="setDifficulty('hard')" class="button">Hard</button>
    </div>
    <SudokuGridRow />
  </div>
</template>


<script setup>
import SudokuGridSystem from './SudokuGridSystem.vue';
import { ref, watch, inject } from 'vue';
import { isValidMove, isComplete as checkIfComplete, isPuzzleValid } from './sudokuSolver';  // sudokuSolver.jsをインポート
import { generateSudoku, createSudokuGrid } from './sudokuGenerator'; // ここを変更

const gridSizes = ref(inject('gridSizes') || 9);
const rows = ref(createSudokuGrid(gridSizes)); // ref を使用して初期化
const currentDifficulty = ref(gridSizes); // 例として 'easy' をデフォルト値とする


watch(rows, () => {
  if (checkIfComplete(rows.value) && isPuzzleValid(rows.value)) {
    alert("Congratulations! You have completed the puzzle.");
    puzzleCompleted.value = true
  }
}, { deep: true });

const puzzleCompleted = ref(false);

const validateMove = (rowIndex, colIndex, value) => {
  if (!isValidMove(rows.value, rowIndex, colIndex, value)) {
    alert("Invalid move!");
  }
};

const fillNumbers = async () => {
  const newGrid = await generateSudoku(currentDifficulty.value);
  rows.value = newGrid; // 新しいグリッドを割り当てる
};

const setDifficulty = (level) => {
  console.log('Setting difficulty to:', level);
  currentDifficulty.value = level; // 難易度を更新
  if (level === 'easy') {
    gridSizes.value = 9;
  } else if (level === 'medium') {
    gridSizes.value = 16;
  } else if (level === 'hard') {
    gridSizes.value = 25;
  }
  fillNumbers(); // 新しいグリッドを生成
};
provide('rows', rows);
provide('gridSizes', gridSizes);
provide('validateMove', validateMove);

</script>

<style scoped>
.sudoku-grid-container {
  display: flex;
  /* フレックスボックスを使用 */
  justify-content: center;
  /* 水平方向の中央に配置 */
  align-items: center;
  /* 垂直方向の中央に配置 */
  height: 100vh;
  /* コンテナの高さをビューポートの高さに設定 */
}

.sudoku-grid-button{
  display: flex;
  flex-flow: column;
  margin-right: 5rem;
}
</style>