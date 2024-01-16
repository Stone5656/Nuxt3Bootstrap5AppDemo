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
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 700px;
}

.sudoku-grid-button{
  display: flex;
  flex-flow: column;
  margin-right: 5rem;
  box-shadow: 0 0 10px #fff;
}
</style>