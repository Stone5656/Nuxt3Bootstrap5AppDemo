<template>
  <div class="sudoku-grid-container">
    <div class="sudoku-grid-button">
      <button @click="fillNumbers" class="button">Fill Numbers</button>
      <button @click="setDifficulty('easy')" class="button">Easy</button>
      <button @click="setDifficulty('medium')" class="button">Medium</button>
      <button @click="setDifficulty('hard')" class="button">Hard</button>
    </div>
    <SudokuRow />
  </div>
</template>


<script setup>
import SudokuRow from './SudokuRow.vue';

const { rows, gridSizes, validateMove, setDifficulty } = useSudokuLogic();

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