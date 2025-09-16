<script setup lang="ts">
import { ref } from 'vue'
// Simple fixed sidebar layout without responsive design
import ChartPreviewPanel from './components/ChartPreviewPanel.vue'
import ThemePanel from './components/ThemePanel.vue'
import { useLocalization } from './composables/useLocalization'
import { RadioGroup as VanRadioGroup, Radio as VanRadio, Row as VanRow, Col as VanCol } from 'vant'

// Set up language control
const { switchLanguage, currentLanguage, getAvailableLanguages } = useLocalization()
const currentLang = ref(currentLanguage)
const availableLocales = getAvailableLanguages()
// Only show language selector in dev/preview mode
const showLanguageSelector = availableLocales.length > 0

const onLanguageChange = (lang: string) => {
  switchLanguage(lang)
}

// Get reference to chart preview panel
const chartPreviewRef = ref<InstanceType<typeof ChartPreviewPanel> | null>(null)
</script>

<template>
  <div id="theme-builder">
    <!-- Language Selector - only shown in dev/preview mode -->
    <div v-if="showLanguageSelector" class="language-selector">
      <VanRadioGroup v-model="currentLang" direction="horizontal" @change="onLanguageChange">
        <VanRadio name="en">English</VanRadio>
        <VanRadio name="zh">中文</VanRadio>
      </VanRadioGroup>
    </div>

    <div class="container-fluid" id="content">
      <VanRow class="row-container" :gutter="0">
        <VanCol span="6" class="theme-config">
          <ThemePanel :chart-preview-ref="chartPreviewRef" />
        </VanCol>

        <VanCol span="18" class="chart-container">
          <ChartPreviewPanel ref="chartPreviewRef" />
        </VanCol>
      </VanRow>
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
