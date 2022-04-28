<template>
  <el-row>
    <el-col
      :xs="24"
      :lg="12"
      :xl="8"
      v-for="(option, index) in options"
      v-bind:key="option"
      class="chart-col"
    >
      <div class="chart-container" :id="'chart-' + index"></div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { getPreviewOptions } from '../data/previews';
import { Theme } from '../data/themeConfigs';

defineExpose({
  render
});

let options = getPreviewOptions(4);
const charts: echarts.ECharts[] = [];

function render(theme: Theme) {
  echarts.registerTheme(theme.name, theme.config);
  options = getPreviewOptions(theme.groupCount || 4) as any;
  for (let i = 0; i < options.length; ++i) {
    if (charts[i]) {
      charts[i].dispose();
    }
    const el = document.getElementById('chart-' + i);
    if (el) {
      charts[i] = echarts.init(el, theme.name);
      charts[i].setOption(options[i] as any);
    }
  }
}
</script>

<style scoped>
.chart-col {
  padding: 10px 20px;
}
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
