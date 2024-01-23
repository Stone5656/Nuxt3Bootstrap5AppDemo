<template>
    <nav class="blue-300">
        <ul class="nav-list">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/game">Game</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
        </ul>
    </nav>
</template>
<style scoped>
.nav-list{
    text-align: center;
    height: 10%;
    padding: 0;
}
.nav-list li{
    font-size: 42px;
    padding-left: 2.5%;
    padding-right: 2.5%;
    list-style: none;
    display: inline-block;
}
.nav-list a{
    text-decoration: none;
    text-shadow: 0 0 10px #fff;
    color: #fff;
}
@media (max-width: 959px) {
    .nav-list{
        text-align: center;
        height: 8%;
        padding: 0;
    }
    .nav-list a{
    text-decoration: none;
    text-shadow: 0 0 8px #000;
    color: #fff;
    font-size: 32px;
    }
}
@media (max-width: 480px) {
    .nav-list{
        text-align: center;
        height: 5%;
        padding: 0;
    }
    .nav-list a{
    text-decoration: none;
    text-shadow: 0 0 5px #000;
    color: #fff;
    font-size: 24px;
    }
}
</style>