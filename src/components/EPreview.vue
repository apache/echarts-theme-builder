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

defineExpose({
  render
});

const charts: echarts.ECharts[] = [];

const options = getPreviewOptions(4);
// setTimeout(() => {
//   for (let i = 0; i < options.length; ++i) {
//     const option = options[i];
//     const el = document.getElementById('chart-' + i);
//     if (el) {
//       const chart = echarts.init(el);
//       chart.setOption(option as any);
//       charts.push(chart);
//     }
//   }
// });

function render(theme: object) {
  console.log(theme);
  echarts.registerTheme('custom', theme);
  for (let i = 0; i < options.length; ++i) {
    if (charts[i]) {
      charts[i].dispose();
    }
    const el = document.getElementById('chart-' + i);
    if (el) {
      charts[i] = echarts.init(el, 'custom');
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
