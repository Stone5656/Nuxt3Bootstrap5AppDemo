import Navbar from '~/components/Navbar.vue';
<template>
  <div class="container home">
    <Navbar />
  </div>
</template>
<style scoped>
.home{
  background-image: url(~/public/start_bg.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  max-width: 1980px;
  max-height: 1000px;
}
</style>