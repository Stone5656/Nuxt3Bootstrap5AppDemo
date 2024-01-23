<template>
  <div class="container home">
    <Navbar />
    <button class="homebutton"><NuxtLink to="/game">GameStart</NuxtLink></button>
  </div>
</template>
<style scoped>
.home{
  background-image: url(/start_bg.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  max-width: 1980px;
  max-height: 1000px;
}
.homebutton{
  border-radius: 30px;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  font-size: 62px;
  border: 2px solid #fff;
  background-color: #0a052c;
  box-shadow: 0 0 10px #fff;
}
.homebutton a{
  text-decoration: none;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px #fff;
}
</style>