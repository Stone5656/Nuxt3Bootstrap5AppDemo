<template>
  <div class="sudoku-grid-container">
    <div class="sudoku-grid-button">
      <button @click="fillNumbers" class="button">Fill Numbers</button>
      <button @click="setDifficulty('easy')" class="button">Easy</button>
      <button @click="setDifficulty('medium')" class="button">Medium</button>
      <button @click="setDifficulty('hard')" class="button">Hard</button>
    </div>
    <div class="sudoku-grid">
      <div v-for="row in rows" :key="row.index" class="row">
        <div v-for="cell in row.cells" :key="cell.index" class="cell" :class="{
          'highlight-number': selectedNumber === cell.value,
          'highlight-cell': selectedRow === row.index || selectedCol === cell.index
        }" @click="selectCell(row.index, cell.index, cell.value)">
          <input type="text" v-model="cell.value" maxlength="2"
            @input="validateMove(row.index, cell.index, cell.value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import { isValidMove, isComplete as checkIfComplete } from './sudokuSolver';  // sudokuSolver.jsをインポート
import { generateSudoku, createSudokuGrid } from './sudokuGenerator'; // ここを変更

const gridSizes = inject('gridSizes') || 9; // デフォルト値を設定
const rows = ref(createSudokuGrid(gridSizes)); // ref を使用して初期化
const currentDifficulty = ref(gridSizes); // 例として 'easy' をデフォルト値とする

const selectedRow = ref(-1);  // 選択したセルの行
const selectedCol = ref(-1);  // 選択したセルの列
const selectedNumber = ref('');  // 選択したセルの値

const selectCell = (row, col, value) => {
  selectedRow.value = row;
  selectedCol.value = col;
  selectedNumber.value = value;
};

const validateMove = (row, col, value) => {
  if (!isValidMove(rows.value, row, col, value)) { // rows.value を使用
    console.error('Invalid move');
    // 無効な動きを通知する処理
  }
};

watch(rows, () => {
  isPuzzleComplete.value = checkIfComplete(rows.value); // rows.value を使用
});

const isPuzzleComplete = ref(false);  // 変数名を変更

const fillNumbers = () => {
  rows.value = generateSudoku(currentDifficulty.value); // 現在の難易度を渡す
};

const setDifficulty = (level) => {
  console.log('Setting difficulty to:', level);
  switch (level) {
    case 'easy':
    case 'medium':
    case 'hard':
      rows.value = generateSudoku(level); // 新しいグリッドを割り当てる
      break;
    default:
      console.error('Unknown difficulty level:', level);
  }
};
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

.sudoku-grid .row {
  display: flex;
}

.sudoku-grid .cell {
  display: flex;
  /* Flexboxを有効にする */
  justify-content: center;
  /* 水平方向に中央に配置 */
  align-items: center;
  /* 垂直方向に中央に配置 */
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  box-sizing: border-box;
  /* ボーダーとパディングを要素のサイズに含める */
  padding: 0;
}

.sudoku-grid .cell input {
  width: calc(100% - 2px);
  /* ボーダーとパディングの分を減算 */
  height: calc(100% - 2px);
  /* ボーダーとパディングの分を減算 */
  border: none;
  text-align: center;
  font-size: 0.8em;
  /* フォントサイズを調整 */
  box-sizing: border-box;
  /* ボーダーとパディングを要素のサイズに含める */
  padding: 0;
}

.cell.highlight-number {
  background-color: rgb(28, 28, 235);
  color: white;
}

/* 選択したセルの行と列をハイライト */
.cell.highlight-cell {
  background-color: rgba(0, 0, 255, 0.2);
}</style>