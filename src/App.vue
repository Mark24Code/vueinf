<template>
  <div id="app">
    <Note></Note>
  </div>
</template>

<script>
import Note from './components/Note'

export default {
  name: 'app',
  components: {
    Note
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100%;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
