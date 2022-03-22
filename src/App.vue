<template>
  <el-container>
    <el-aside width="350px">
      <EConfig></EConfig>
    </el-aside>
    <el-main> </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import EConfig from './components/EConfig.vue';
</script>

<style scoped lang="scss">
#echarts-spa-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 14px;
}

.el-aside {
  padding: 0 15px;
  height: calc(100vh - 50px);
  overflow: auto;
}

.el-main {
  padding: 5px;
}

.text-base {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-sm {
  font-size: 1.4rem;
}
</style>
