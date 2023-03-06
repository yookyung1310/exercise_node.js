<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Header></Header>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <div class="container">
      <router-view />
    </div>

    <!-- <router-view /> -->
    <Footer />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Header from './components/common/MyHeader';
import Footer from './components/common/MyFooter';

export default {
  name: 'App',
  components: {
    Header,
    // HelloWorld,
    Footer
  }
}
</script>

//css 수정
<style>
html,
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  color: #43b984;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.wrap {
  width: 100%;
}

.container {
  width: 800px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

.btn {
  padding: 10px;
  background: #34445c;
  color: #fff;
}
</style>
