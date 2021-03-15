<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
document.title = "Zoom Attendance"
</script>

<style>
:root {
  --bg-color: #d4d4d6;
  --snd-bg-color: #e0e0e0;
  --text-color: black;
  overflow: auto;
}
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: Courier;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  cursor: pointer;
}
</style>
