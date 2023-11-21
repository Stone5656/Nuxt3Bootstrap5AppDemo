<template>
    <div class="sudoku-grid" :data-size="gridSizes">
        <div v-for="row in rows" :key="row.index" class="row">
            <div v-for="cell in row.cells" :key="cell.index" :class="getCellClass(row.index, cell.index)">
                <input type="text" v-model="cell.value" :maxlength="gridSizes.toString().length"
                    @input="validateMove(row.index, cell.index, cell.value)" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, inject } from 'vue';

const rows = inject('rows');
const gridSizes = inject('gridSizes');
const validateMove = inject('validateMove');

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
    border-top: 1px solid #000;
    /* 上側に薄いボーダー */
    border-left: 1px solid #000;
    /* 左側に薄いボーダー */
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
}</style>