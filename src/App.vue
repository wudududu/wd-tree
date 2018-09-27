<template>
  <div id="app">
    <wd-tree />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import wdTree from './components/wd-tree'
export default {
  name: 'App',
  components: {
    HelloWorld,
    wdTree
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
