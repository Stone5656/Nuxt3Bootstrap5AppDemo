<template>
  <div class="container home">
    <Navbar />
    <SudokuGrid />
  </div>
</template>
<script>
export default {
  setup() {
    provide('gridSizes');
  },
};
</script>

<style scoped>
.home{
  background-image: url(/start_bg.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  max-width: 1980px;
}
</style>