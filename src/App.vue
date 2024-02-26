<template>
  <div id="app">
    <router-link to="/login"></router-link>
    <router-view />
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

/* 整体滚动条样式 */
body::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* 滚动条滑块样式 */
body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* 滚动条滑块在鼠标悬停时的样式 */

/* 滚动条轨道样式 */
body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
</style>
