<template>
  <div class="app">
    <SudokuGrid />
  </div>
</template>

<script>
import { provide } from 'vue';

export default {
  setup() {
    provide('gridSizes');
    // 他のロジックがあればここに追加
  },
};
</script>

<style>
@import "bootstrap/scss/bootstrap.scss";
</style>
