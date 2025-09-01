<template>
  <div class="chart-preview">
    <div class="preview-header">
      <h3>Chart Preview</h3>
    </div>

    <div class="charts-grid">
      <div
        v-for="(config, index) in displayedCharts"
        :key="config.type + index"
        class="chart-item"
      >
        <div
          :ref="el => setChartRef(el, index)"
          class="chart-container"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getChartConfigs } from '../utils/chartConfigs'
import { useThemeStore } from '../stores/theme'
import type { ECharts } from 'echarts'

const themeStore = useThemeStore()
const chartInstances = ref<ECharts[]>([])
const chartRefs = ref<(HTMLElement | null)[]>([])

// Always display all charts
const displayedCharts = ref(getChartConfigs(4))

// Set chart ref
function setChartRef(el: any, index: number) {
  if (el) {
    chartRefs.value[index] = el as HTMLElement
  }
}

// Register and apply current theme
function registerCurrentTheme() {
  const currentTheme = themeStore.getEChartsTheme(false)
  echarts.registerTheme('customized', currentTheme)
}

// Initialize all charts
function initializeCharts() {
  // Dispose existing charts
  chartInstances.value.forEach(chart => chart.dispose())
  chartInstances.value = []

  // Register current theme
  registerCurrentTheme()

  // Create new chart instances
  displayedCharts.value.forEach((config, index) => {
    const container = chartRefs.value[index]
    if (container) {
      // Initialize chart with theme
      const chart = echarts.init(container, 'customized')
      chart.setOption(config.option)
      chartInstances.value.push(chart)
    }
  })
}

// Update charts when theme changes
function updateCharts() {
  if (chartInstances.value.length === 0) {
    return
  }

  // Get current theme and register with unique ID to force refresh
  const currentTheme = themeStore.getEChartsTheme(false)
  const themeId = `customized-${Date.now()}`
  echarts.registerTheme(themeId, currentTheme)

  // Recreate charts with new theme
  displayedCharts.value.forEach((config, index) => {
    const container = chartRefs.value[index]
    if (container && chartInstances.value[index]) {
      chartInstances.value[index].dispose()
      const chart = echarts.init(container, themeId)
      chart.setOption(config.option)
      chartInstances.value[index] = chart
    }
  })
}// Expose updateCharts method for external calling
defineExpose({
  updateCharts
})

// Resize charts when window resizes
function handleResize() {
  chartInstances.value.forEach(chart => chart.resize())
}

onMounted(() => {
  nextTick(() => {
    initializeCharts()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstances.value.forEach(chart => chart.dispose())
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.chart-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.preview-header h3 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.charts-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 12px;
  overflow-y: auto;
  padding-right: 8px;
}

.chart-item {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.chart-container {
  width: 100%;
  height: 320px;
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .charts-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
