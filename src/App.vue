<template>
  <el-container>
    <el-aside width="350px">
      <EConfig @configChange="onConfigChange"></EConfig>
    </el-aside>
    <el-main>
      <EPreview ref="preview"></EPreview>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EConfig from './components/EConfig.vue';
import EPreview from './components/EPreview.vue';

let preview = ref<EPreview>(null);

function onConfigChange() {
  console.log('onConfigChange', preview);
  preview.value?.render();
}
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
