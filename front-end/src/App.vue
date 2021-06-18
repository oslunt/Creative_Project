<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/About">About</router-link> |
      <router-link to="/Blog">Blog</router-link>
    </div>
    <router-view />
    <div class="footer">
      <a href="https://github.com/oslunt">github</a>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: white;
  font-size: 22px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.router-link-exact-active:hover {
  color: #2c3e50;
  background-color: white;
}

#nav a:hover {
  background-color: #42b983;
  color: #2c3e50;
}

.footer {
  background-color: #2c3e50;
  color: white;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 20px;
  padding-top: 15px;
}

.footer a:visited {
  color: white;
}

.footer a:hover {
  color: #42b983;
}
</style>
