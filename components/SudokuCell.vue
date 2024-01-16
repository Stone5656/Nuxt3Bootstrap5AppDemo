<template>
    <div :class="getCellClass">
      <input type="text" v-model="cell.value" :maxlength="maxlength"
             @input="validateMove(rowIndex, colIndex, cell.value)" />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    cell: Object,
    rowIndex: Number,
    colIndex: Number,
    gridSizes: Number,
    validateMove: Function
  });
  
  const maxlength = computed(() => props.gridSizes.toString().length);
  
  const getCellClass = computed(() => {
    let classes = 'cell';
    if (props.gridSizes === 9) {
      if ((props.rowIndex + 1) % 3 === 0 && props.rowIndex !== props.gridSizes - 1) {
        classes += ' thick-top-border';
      }
      if ((props.rowIndex + 1) % 3 === 0 && props.rowIndex !== props.gridSizes - 1) {
        classes += ' thick-bottom-border';
      }
      if ((props.colIndex + 1) % 3 === 0 && props.colIndex !== props.gridSizes - 1) {
        classes += ' thick-right-border';
      }
      if ((props.rowIndex + 1) % 3 === 0 && props.rowIndex !== props.gridSizes - 1) {
        classes += ' thick-left-border';
      }
    }
    return classes;
  });
  </script>

<style scoped>

.sudoku-grid .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    box-sizing: border-box;
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

.blue:hover {
color: blue;
}
</style>