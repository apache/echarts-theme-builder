<script setup lang="ts">
import { ref } from 'vue'
// Simple fixed sidebar layout without responsive design
import ChartPreviewPanel from './components/ChartPreviewPanel.vue'
import ThemePanel from './components/ThemePanel.vue'
import { useI18n } from 'vue-i18n'
import { useLocalization } from './composables/useLocalization'

// Initialize i18n
const { t } = useI18n()

// Set up language control
const { switchLanguage, currentLanguage } = useLocalization()
const currentLang = ref(currentLanguage)
const onLanguageChange = (lang: string) => {
  switchLanguage(lang)
}

// Get reference to chart preview panel
const chartPreviewRef = ref<InstanceType<typeof ChartPreviewPanel> | null>(null)
</script>

<template>
  <div id="theme-builder">
    <!-- Language Selector -->
    <div class="language-selector">
      <van-radio-group v-model="currentLang" direction="horizontal" @change="onLanguageChange">
        <van-radio name="en">English</van-radio>
        <van-radio name="zh">中文</van-radio>
      </van-radio-group>
    </div>

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
  position: relative;
  --van-button-default-height: auto;
  --van-button-normal-padding: 8px 10px;
}

.language-selector {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
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
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
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
