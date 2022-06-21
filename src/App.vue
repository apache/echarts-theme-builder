<template>
  <el-container>
    <el-aside width="350px">
      <EConfig @configChange="onConfigChange" ref="config"></EConfig>
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

const preview = ref<EPreview>(null);
const config = ref<EConfig>(null);

setTimeout(() => {
  if (config.value) {
    renderPreview(config.value.getTheme());
  }
});

window.onresize = () => {
  if (preview.value) {
    preview.value.resize();
  }
};

function onConfigChange() {
  renderPreview(config.value.getTheme());
}

function renderPreview(theme: object) {
  preview.value?.render(theme);
}
</script>

<style scoped lang="scss">
#echarts-spa-app {
  font-family: 'Open Sans', 'PingFang SC', Helvetica, Arial, sans-serif;
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
  position: fixed;
  width: 350px;
  padding: 0 15px;
  height: calc(100vh - 50px);
  overflow: auto;
}

.el-main {
  padding: 5px;
  margin-left: 350px;
}

.el-icon {
  margin-right: 3px;
  width: auto;
}

.text-base {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-sm {
  font-size: 1.4rem;
}
</style>
