<template>
    <div class="sudoku-grid" :data-size="gridSizes">
      <div v-for="row in rows" :key="row.index" class="row">
        <SudokuCell
          v-for="cell in row.cells"
          :key="cell.index"
          :cell="cell"
          :rowIndex="row.index"
          :colIndex="cell.index"
          :gridSizes="gridSizes"
          :validateMove="validateMove"
        />
      </div>
    </div>
  </template>
  
<script setup>
import SudokuCell from './SudokuCell.vue';

const rows = inject('rows');
const gridSizes = inject('gridSizes');
const validateMove = inject('validateMove');

</script>

<style scoped>
.sudoku-grid .row {
    display: flex;
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