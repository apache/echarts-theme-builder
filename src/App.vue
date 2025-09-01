<script setup lang="ts">
import { ref } from 'vue'
// Simple fixed sidebar layout without responsive design
import ChartPreviewPanel from './components/ChartPreviewPanel.vue'
import ThemePanel from './components/ThemePanel.vue'

// Get reference to chart preview panel
const chartPreviewRef = ref<InstanceType<typeof ChartPreviewPanel> | null>(null)
</script>

<template>
  <div id="theme-builder">
    <div class="container-fluid" id="content">
      <van-row class="row-container" :gutter="0">
        <van-col span="6" class="theme-config">
          <ThemePanel :chart-preview-ref="chartPreviewRef" />
        </van-col>

        <van-col span="18" class="chart-container">
          <ChartPreviewPanel ref="chartPreviewRef" />
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped>
#theme-builder {
  width: 100%;
  height: 100vh;
}

.container-fluid {
  height: 100%;
  padding: 0;
  width: 100%;
}

.row-container {
  height: 100%;
  display: flex !important;
  flex-direction: row !important;
}

.theme-config {
  height: 100vh;
  overflow-y: auto;
  background-color: #ffffff;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 0;
  box-sizing: border-box;
  flex: 0 0 25%; /* Fixed 25% width */
}

.chart-container {
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  flex: 1; /* Take remaining space */
}

.placeholder {
  padding: 20px;
  text-align: center;
  color: #6c757d;
  border: 2px dashed #dee2e6;
  border-radius: 4px;
  font-size: 16px;
}
</style>
