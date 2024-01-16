<template>
    <nav class="blue-300">
        <ul class="nav-list">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/game">Game</nuxt-link></li>
            <li><nuxt-link to="/content">Content</nuxt-link></li>
        </ul>
    </nav>
</template>
<style scoped>
.nav-list{
    text-align: center;
    height: 10%;
}
.nav-list li{
    font-size: 42px;
    padding-left: 5%;
    list-style: none;
    display: inline-block;
}
.nav-list a{
    text-decoration: none;
}
</style>