<template>
  <div class="sudoku-grid-container">
    <button @click="fillNumbers" class="button">Fill Numbers</button> <!-- ボタンを追加 -->
    <div class="sudoku-grid">
      <div v-for="row in rows" :key="row.index" class="row">
        <div v-for="cell in row.cells" :key="cell.index" class="cell">
          <input type="text" v-model="cell.value" maxlength="2" @input="validateMove(row.index, cell.index, cell.value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue';
import { isValidMove,isComplete as checkIfComplete } from './sudokuSolver';  // sudokuSolver.jsをインポート
import {generateSudoku} from './sudokuGenerator'

const rows = ref(createSudokuGrid(100));

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

const validateMove = (row, col, value) => {
  if (!isValidMove(rows, row, col, value)) {
    console.error('Invalid move');
    // ここでユーザーに無効な動きであることを通知するか、入力をリセットするなどの処理を行います。
  }
};
watch(rows, () => {
  isPuzzleComplete.value = checkIfComplete(rows.value);  // 関数名を変更
});

const isPuzzleComplete = ref(false);  // 変数名を変更
const fillNumbers = () => {
  generateSudoku(rows.value);  // ボタンがクリックされたら、generateSudoku関数を呼び出す
};
</script>

<style scoped>
.sudoku-grid-container {
  display: flex; /* フレックスボックスを使用 */
  justify-content: center; /* 水平方向の中央に配置 */
  align-items: center; /* 垂直方向の中央に配置 */
  height: 100vh; /* コンテナの高さをビューポートの高さに設定 */
}
.sudoku-grid .row {
  display: flex;
}
.sudoku-grid .cell {
  display: flex; /* Flexboxを有効にする */
  justify-content: center; /* 水平方向に中央に配置 */
  align-items: center; /* 垂直方向に中央に配置 */
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  box-sizing: border-box; /* ボーダーとパディングを要素のサイズに含める */
  padding: 0;
}

.sudoku-grid .cell input {
  width: calc(100% - 2px); /* ボーダーとパディングの分を減算 */
  height: calc(100% - 2px); /* ボーダーとパディングの分を減算 */
  border: none;
  text-align: center;
  font-size: 0.8em; /* フォントサイズを調整 */
  box-sizing: border-box; /* ボーダーとパディングを要素のサイズに含める */
  padding: 0;
}
</style>