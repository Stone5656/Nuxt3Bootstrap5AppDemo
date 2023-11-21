<template>
  <div class="sudoku-grid-container">
    <div class="sudoku-grid-button">
      <button @click="fillNumbers" class="button">Fill Numbers</button>
      <button @click="setDifficulty('easy')" class="button">Easy</button>
      <button @click="setDifficulty('medium')" class="button">Medium</button>
      <button @click="setDifficulty('hard')" class="button">Hard</button>
    </div>
    <div class="sudoku-grid" :data-size="gridSizes">
      <div v-for="row in rows" :key="row.index" class="row">
        <div v-for="cell in row.cells" :key="cell.index" :class="getCellClass(row.index, cell.index)">
          <input type="text" v-model="cell.value" maxlength="1" @input="validateMove(row.index, cell.index, cell.value)" />
</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, inject } from 'vue';
import {isValidMove, isComplete as checkIfComplete, isPuzzleValid } from './sudokuSolver';  // sudokuSolver.jsをインポート
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
// 既存のインポートと変数

const getCellClass = (rowindex, colindex) => {
  let classes = 'cell';
  if (gridSizes === 9) {
    if ((rowindex + 1) % 3 === 0 && rowindex !== gridSizes - 1) {
      classes += ' thick-top-border';
    }
    if ((rowindex + 1) % 3 === 0 && rowindex !== gridSizes - 1) {
      classes += ' thick-bottom-border';
    }
    if ((colindex + 1) % 3 === 0 && colindex !== gridSizes - 1) {
      classes += ' thick-right-border';
    }
    if ((rowindex + 1) % 3 === 0 && rowindex !== gridSizes - 1) {
      classes += ' thick-left-border';
    }
  }
  return classes;
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
  border-top: 1px solid #000; /* 上側に薄いボーダー */
  border-left: 1px solid #000; /* 左側に薄いボーダー */
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
.sudoku-grid[data-size="9"] .row:nth-child(3n) .cell {
  border-bottom: 2px solid #000;
}

.sudoku-grid[data-size="9"] .row .cell:nth-child(3n) {
  border-right: 2px solid #000;
}

/* 25x25グリッドの5x5ブロックを強調 */
.sudoku-grid[data-size="25"] .row:nth-child(5n) .cell {
  border-bottom: 2px solid #000;
}

.sudoku-grid[data-size="25"] .row .cell:nth-child(5n) {
  border-right: 2px solid #000;
}

/* 16x16グリッドの4x4ブロックを強調 */
.sudoku-grid[data-size="16"] .row:nth-child(4n) .cell {
  border-bottom: 2px solid #000;
}

.sudoku-grid[data-size="16"] .row .cell:nth-child(4n) {
  border-right: 2px solid #000;
}

/* 最初の行と列のボーダーを太くする */
.sudoku-grid .row:first-child .cell {
  border-top: 2px solid #000;
}

.sudoku-grid .row .cell:first-child {
  border-left: 2px solid #000;
}
</style>