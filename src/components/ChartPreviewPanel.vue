<template>
  <div class="chart-preview">
    <div class="preview-header">
      <h3>{{ $t('preview.chartPreview') }}</h3>
    </div>

    <div class="charts-grid">
      <div
        v-for="(config, index) in displayedCharts"
        v-once
        :key="config.type + index"
        class="chart-item"
      >
        <div
          :ref="el => setChartDomRef(el, index)"
          class="chart-container"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, computed, markRaw, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getChartConfigs } from '../utils/chartConfigs'
import { useThemeStore } from '../stores/theme'
import type { ECharts } from 'echarts'
import { useI18n } from 'vue-i18n'

// Debounce function to limit how often a function can be called
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function(this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// Initialize i18n
const { locale } = useI18n()

const themeStore = useThemeStore()
const chartInstances: ECharts[] = []
const chartDoms: (HTMLElement | null)[] = []

// Dynamically generate charts based on seriesCnt
const displayedCharts = computed(() => getChartConfigs(themeStore.theme.seriesCnt))

// Set chart DOM ref
function setChartDomRef(el: any, index: number) {
  chartDoms[index] = el as HTMLElement
}

// Original update charts implementation
function _updateChartsImpl() {
  // Dispose existing charts
  chartInstances.forEach(chart => chart.dispose())
  chartInstances.length = 0

  // re-register theme with the same name
  const currentTheme = themeStore.getEChartsTheme()
  const themeId = 'customized'
  echarts.registerTheme(themeId, currentTheme)

  const chartLocale = locale.value === 'zh' ? 'ZH' : 'EN'
  // Recreate charts with new theme
  nextTick(() => {
    displayedCharts.value.forEach((config, index) => {
      const container = chartDoms[index]
      const chart = markRaw(echarts.init(container, themeId, {
        locale: chartLocale
      }))
      chart.setOption(config.option)
      chartInstances[index] = chart
    })
  })
}

const updateCharts = debounce(_updateChartsImpl, 100)

// Expose updateCharts method for external calling
defineExpose({
  updateCharts
})

// Watch for theme or locale changes and automatically update charts
watch(() => [themeStore.theme, locale.value], updateCharts, { deep: true })

// Resize charts when window resizes
function handleResize() {
  chartInstances.forEach(chart => chart.resize())
}

const debouncedHandleResize = debounce(handleResize, 100)

onMounted(() => {
  updateCharts()
  window.addEventListener('resize', debouncedHandleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedHandleResize)
  chartInstances.forEach(chart => chart.dispose())
  chartDoms.length = chartInstances.length = 0
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
