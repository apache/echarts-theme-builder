<template>
  <div class="theme-panel">
    <!-- Functions Section -->
    <van-collapse v-model="activeNames">
      <van-collapse-item :title="$t('panel.functions')" name="functions">
        <div class="panel-content">
          <!-- Action Buttons -->
          <div class="action-buttons">
            <van-button type="primary" @click="downloadTheme">
              <van-icon name="down" />
              {{ $t('panel.download') }}
            </van-button>
            <van-button @click="importConfig">
              <van-icon name="upgrade" />
              {{ $t('panel.import') }}
            </van-button>
            <van-button @click="exportConfig">
              <van-icon name="share" />
              {{ $t('panel.export') }}
            </van-button>
            <!-- showThemeCode 按钮已删除 -->
          </div>

          <div class="action-buttons">
            <van-button @click="refreshCharts">
              <van-icon name="replay" />
              {{ $t('common.refresh') }}
            </van-button>
            <van-button @click="resetTheme">
              <van-icon name="revoke" />
              {{ $t('common.reset') }}
            </van-button>
          </div>

          <div class="action-buttons">
            <van-button @click="showHelp">
              <van-icon name="info-o" />
              {{ $t('common.help') }}
            </van-button>
            <van-button @click="openSourceCode">
              <van-icon name="link-o" />
              {{ $t('panel.sourceCode') }}
            </van-button>
          </div>

          <!-- Theme Name and Series Count -->
          <van-field
            v-model.trim="themeName"
            :label="$t('panel.themeName')"
            :placeholder="$t('panel.themePlaceholder')"
          />

          <van-field
            v-model="theme.seriesCnt"
            type="number"
            inputmode="numeric"
            :min="1"
            :max="12"
            :label="$t('panel.seriesCount')"
            :placeholder="$t('panel.seriesPlaceholder')"
          />

          <!-- Predefined Themes -->
          <div class="predefined-themes">
            <h4>{{ $t('panel.preDefinedThemes') }}</h4>
            <div class="theme-grid">
              <div
                v-for="(themeItem, index) in preDefinedThemes"
                :key="themeItem.name"
                class="theme-item"
                :class="themeStore.activePreDefinedThemeIndex.value === index ? 'active' : ''"
                :style="{ backgroundColor: themeItem.background }"
                :title="themeItem.name"
                @click="selectPreDefinedTheme(index)"
              >
                <div
                  v-for="color in themeItem.theme"
                  :key="color"
                  class="color-dot"
                  :style="{ backgroundColor: color }"
                />
              </div>
              <div
                class="theme-item new-theme"
                :title="$t('panel.extractFromImageTitle')"
                @click="uploadImageInputRef?.click()"
              >
                <van-icon name="plus" />
                <span>{{ $t('panel.extractFromImage') }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-collapse-item>

      <!-- Basic Configuration -->
      <van-collapse-item :title="$t('panel.basicConfig')" name="basic">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.backgroundColor"
            :label="$t('colors.background')"
          />
          <ColorPicker
            v-model="theme.titleColor"
            :label="$t('colors.title')"
          />
          <ColorPicker
            v-model="theme.subtitleColor"
            :label="$t('colors.subtitle')"
          />
          <ColorList
            v-model="theme.color"
            :label="$t('colors.theme')"
          />
          <ColorPicker
            v-model="theme.markTextColor"
            :label="$t('colors.markText')"
          />
          <van-field
            v-model.number="theme.borderWidth"
            type="number"
            :label="$t('colors.borderWidth')"
          />
          <ColorPicker
            v-model="theme.borderColor"
            :label="$t('colors.border')"
          />
        </div>
      </van-collapse-item>

      <!-- Visual Map -->
      <van-collapse-item :title="$t('panel.visualMap')" name="visualMap">
        <div class="panel-content">
          <ColorList
            v-model="theme.visualMapColor"
            :label="$t('colors.visualMapColor')"
          />
        </div>
      </van-collapse-item>

      <!-- Grid Layout -->
      <van-collapse-item :title="$t('panel.grid')" name="grid">
        <div class="panel-content">
          <van-field
            v-model="gridLeft"
            :label="$t('position.left')"
            @blur="validateGridValue('left')"
          />
          <van-field
            v-model="gridRight"
            :label="$t('position.right')"
            @blur="validateGridValue('right')"
          />
          <van-field
            v-model="gridTop"
            :label="$t('position.top')"
            @blur="validateGridValue('top')"
          />
          <van-field
            v-model="gridBottom"
            :label="$t('position.bottom')"
            @blur="validateGridValue('bottom')"
          />
        </div>
      </van-collapse-item>

      <!-- Coordinate Axis -->
      <van-collapse-item :title="$t('panel.axis')" name="axis">
        <div class="panel-content">
          <van-field :label="$t('panel.axis')">
            <template #input>
              <van-checkbox v-model="theme.axisSeperateSetting" @change="onAxisSettingChange">
                {{ $t('panel.separateAxisSetting') }}
              </van-checkbox>
            </template>
          </van-field>

          <div
            v-for="(axis, index) in theme.axis"
            :key="index"
            class="axis-group"
          >
            <h4 v-if="axis.type !== 'all'">{{ $t(`axis.${axis.type}Axis`) }}</h4>

            <ColorPicker
              v-model="axis.axisLineColor"
              :label="$t('colors.axisLine')"
              :can-disable="true"
              v-model:enabled="axis.axisLineShow"
            />
            <ColorPicker
              v-model="axis.axisTickColor"
              :label="$t('colors.axisTick')"
              :can-disable="true"
              v-model:enabled="axis.axisTickShow"
            />
            <ColorList
              v-model="axis.splitLineColor"
              :label="$t('colors.splitLine')"
              :can-disable="true"
              v-model:enabled="axis.splitLineShow"
            />
            <ColorList
              v-model="axis.splitAreaColor"
              :label="$t('colors.splitArea')"
              :can-disable="true"
              v-model:enabled="axis.splitAreaShow"
            />
            <ColorPicker
              v-model="axis.axisLabelColor"
              :label="$t('colors.axisLabel')"
              :can-disable="true"
              v-model:enabled="axis.axisLabelShow"
            />
          </div>
        </div>
      </van-collapse-item>

      <!-- Legend -->
      <van-collapse-item :title="$t('panel.legend')" name="legend">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.legendTextColor"
            :label="$t('colors.legendText')"
          />

          <h4>{{ $t('panel.legendPosition') }}</h4>
          <van-field
            v-model="legendLeft"
            :label="$t('position.left')"
            @blur="validateLegendValue('left')"
          />
          <van-field
            v-model="legendRight"
            :label="$t('position.right')"
            @blur="validateLegendValue('right')"
          />
          <van-field
            v-model="legendTop"
            :label="$t('position.top')"
            @blur="validateLegendValue('top')"
          />
          <van-field
            v-model="legendBottom"
            :label="$t('position.bottom')"
            @blur="validateLegendValue('bottom')"
          />
        </div>
      </van-collapse-item>

      <!-- Toolbox -->
      <van-collapse-item :title="$t('panel.toolbox')" name="toolbox">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.toolboxColor"
            :label="$t('colors.toolbox')"
          />
          <ColorPicker
            v-model="theme.toolboxEmphasisColor"
            :label="$t('colors.toolboxEmphasis')"
          />
        </div>
      </van-collapse-item>

      <!-- Tooltip -->
      <van-collapse-item :title="$t('panel.tooltip')" name="tooltip">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.tooltipAxisColor"
            :label="$t('tooltip.axisPointer')"
          />
          <van-field
            v-model.number="theme.tooltipAxisWidth"
            type="number"
            :label="$t('tooltip.axisPointerWidth')"
          />
        </div>
      </van-collapse-item>

      <!-- Timeline -->
      <van-collapse-item :title="$t('panel.timeline')" name="timeline">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.timelineItemColor"
            :label="$t('timeline.item')"
          />
          <ColorPicker
            v-model="theme.timelineItemColorE"
            :label="$t('timeline.itemHover')"
          />
          <ColorPicker
            v-model="theme.timelineCheckColor"
            :label="$t('timeline.itemSelected')"
          />
          <ColorPicker
            v-model="theme.timelineCheckBorderColor"
            :label="$t('timeline.itemSelectedBorder')"
          />
          <van-field
            v-model.number="theme.timelineItemBorderWidth"
            type="number"
            :label="$t('timeline.itemBorderWidth')"
          />
          <ColorPicker
            v-model="theme.timelineLineColor"
            :label="$t('timeline.mainAxis')"
          />
          <van-field
            v-model.number="theme.timelineLineWidth"
            type="number"
            :label="$t('timeline.mainAxisWidth')"
          />
          <ColorPicker
            v-model="theme.timelineControlColor"
            :label="$t('timeline.controlFill')"
          />
          <ColorPicker
            v-model="theme.timelineControlBorderColor"
            :label="$t('timeline.controlBorder')"
          />
          <van-field
            v-model.number="theme.timelineControlBorderWidth"
            type="number"
            :label="$t('timeline.controlBorderWidth')"
          />
          <ColorPicker
            v-model="theme.timelineLabelColor"
            :label="$t('timeline.label')"
          />
        </div>
      </van-collapse-item>

      <!-- Line Chart -->
      <van-collapse-item :title="$t('panel.lineChart')" name="line">
        <div class="panel-content">
          <van-field :label="$t('lineChart.smooth')">
            <template #input>
              <van-checkbox v-model="theme.lineSmooth">
                {{ $t('lineChart.smooth') }}
              </van-checkbox>
            </template>
          </van-field>

          <van-field
            v-model.number="theme.lineWidth"
            type="number"
            :label="$t('lineChart.lineWidth')"
          />
          <van-field
            v-model.number="theme.symbolBorderWidth"
            type="number"
            :label="$t('lineChart.symbolBorder')"
          />
          <van-field
            v-model.number="theme.symbolSize"
            type="number"
            :label="$t('lineChart.symbolSize')"
          />

          <van-field :label="$t('lineChart.symbolShape')">
            <template #input>
              <van-radio-group v-model="theme.symbol" direction="horizontal">
                <van-radio name="circle">{{ $t('lineChart.circle') }}</van-radio>
                <van-radio name="emptyCircle">{{ $t('lineChart.emptyCircle') }}</van-radio>
                <van-radio name="rect">{{ $t('lineChart.rect') }}</van-radio>
                <van-radio name="emptyRect">{{ $t('lineChart.emptyRect') }}</van-radio>
                <van-radio name="roundRect">{{ $t('lineChart.roundRect') }}</van-radio>
                <van-radio name="emptyRoundRect">{{ $t('lineChart.emptyRoundRect') }}</van-radio>
                <van-radio name="triangle">{{ $t('lineChart.triangle') }}</van-radio>
                <van-radio name="emptyTriangle">{{ $t('lineChart.emptyTriangle') }}</van-radio>
                <van-radio name="diamond">{{ $t('lineChart.diamond') }}</van-radio>
                <van-radio name="emptyDiamond">{{ $t('lineChart.emptyDiamond') }}</van-radio>
                <van-radio name="pin">{{ $t('lineChart.pin') }}</van-radio>
                <van-radio name="emptyPin">{{ $t('lineChart.emptyPin') }}</van-radio>
                <van-radio name="arrow">{{ $t('lineChart.arrow') }}</van-radio>
                <van-radio name="emptyArrow">{{ $t('lineChart.emptyArrow') }}</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
      </van-collapse-item>

      <!-- Graph -->
      <van-collapse-item :title="$t('panel.graph')" name="graph">
        <div class="panel-content">
          <van-field
            v-model.number="theme.graphLineWidth"
            type="number"
            :label="$t('graph.lineWidth')"
          />
          <ColorPicker
            v-model="theme.graphLineColor"
            :label="$t('graph.lineColor')"
          />
        </div>
      </van-collapse-item>

      <!-- Map -->
      <van-collapse-item :title="$t('panel.map')" name="map">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.mapAreaColor"
            :label="$t('map.areaColor')"
          />
          <ColorPicker
            v-model="theme.mapBorderColor"
            :label="$t('map.borderColor')"
          />
          <van-field
            v-model.number="theme.mapBorderWidth"
            type="number"
            :label="$t('map.borderWidth')"
          />
          <ColorPicker
            v-model="theme.mapLabelColor"
            :label="$t('map.labelColor')"
          />
          <ColorPicker
            v-model="theme.mapAreaColorE"
            :label="$t('map.areaHoverColor')"
          />
          <ColorPicker
            v-model="theme.mapBorderColorE"
            :label="$t('map.borderHoverColor')"
          />
          <van-field
            v-model.number="theme.mapBorderWidthE"
            type="number"
            :label="$t('map.borderHoverWidth')"
          />
          <ColorPicker
            v-model="theme.mapLabelColorE"
            :label="$t('map.labelHoverColor')"
          />
        </div>
      </van-collapse-item>

      <!-- K Line Chart -->
      <van-collapse-item :title="$t('panel.kline')" name="kline">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.kColor"
            :label="$t('kline.upColor')"
          />
          <ColorPicker
            v-model="theme.kColor0"
            :label="$t('kline.downColor')"
          />
          <ColorPicker
            v-model="theme.kBorderColor"
            :label="$t('kline.upBorderColor')"
          />
          <ColorPicker
            v-model="theme.kBorderColor0"
            :label="$t('kline.downBorderColor')"
          />
          <van-field
            v-model.number="theme.kBorderWidth"
            type="number"
            :label="$t('kline.borderWidth')"
          />
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- Hidden file input for import -->
    <input
      ref="importFileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileImport"
    />

    <input
      ref="uploadImageInput"
      type="file"
      accept="image/jpeg, image/png, image/webp, image/avif, image/apng, image/svg+xml"
      style="display: none"
      @change="handleImageUpload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useThemeStore } from '../stores/theme'
import { PRE_DEFINED_THEMES } from '../stores/theme'
import ColorPicker from './ColorPicker.vue'
import ColorList from './ColorList.vue'
import type ChartPreviewPanel from './ChartPreviewPanel.vue'
import { downloadJsonFile, downloadJsFile } from '../utils/download'
import { showToast, showDialog, showLoadingToast } from 'vant'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import ColorThief from 'colorthief'

// Initialize i18n and localization
const { t } = useI18n()

// Props
interface Props {
  chartPreviewRef?: InstanceType<typeof ChartPreviewPanel> | null
}
const props = defineProps<Props>()

// Component state
const activeNames = ref(['functions'])
const importFileInputRef = useTemplateRef('importFileInput')
const uploadImageInputRef = useTemplateRef('uploadImageInput')

// Theme store
const themeStore = useThemeStore()
const { theme, themeName } = themeStore

// Predefined themes
const preDefinedThemes = PRE_DEFINED_THEMES

// Grid layout reactive properties
const gridLeft = ref(String(theme.gridLeft))
const gridRight = ref(String(theme.gridRight))
const gridTop = ref(String(theme.gridTop))
const gridBottom = ref(String(theme.gridBottom))

// Legend position reactive properties
const legendLeft = ref(String(theme.legendLeft))
const legendRight = ref(String(theme.legendRight))
const legendTop = ref(String(theme.legendTop))
const legendBottom = ref(String(theme.legendBottom))

// Legend value validation function
const validateLegendValue = (position: 'left' | 'right' | 'top' | 'bottom') => {
  let valueRef;

  switch (position) {
    case 'left':
      valueRef = legendLeft;
      break;
    case 'right':
      valueRef = legendRight;
      break;
    case 'top':
      valueRef = legendTop;
      break;
    case 'bottom':
      valueRef = legendBottom;
      break;
  }

  const inputValue = valueRef.value.trim();

  // Check if the value is a valid position value (number, percentage, or special value)
  const isValid =
    // Empty string - will be converted to auto in setOption
    inputValue === '' ||
    // Valid number
    /^[0-9]+$/.test(inputValue) ||
    // Valid percentage (e.g. 10%, 10.5%)
    /^[0-9]+(\.[0-9]+)?%$/.test(inputValue) ||
    // Special values for legend position
    inputValue === 'auto' ||
    inputValue === 'center' ||
    inputValue === 'left' ||
    inputValue === 'right' ||
    inputValue === 'top' ||
    inputValue === 'bottom';

  if (isValid) {
    // For numeric values, convert to number if it's a pure number
    const finalValue = inputValue === '' ?
                       position === 'bottom' ? 10 :
                       position === 'left' ? 'center' : 'auto' :
                       (/^[0-9]+$/.test(inputValue)) ? parseInt(inputValue, 10) : inputValue;

    // Update the corresponding theme property
    switch (position) {
      case 'left':
        theme.legendLeft = finalValue;
        break;
      case 'right':
        theme.legendRight = finalValue;
        break;
      case 'top':
        theme.legendTop = finalValue;
        break;
      case 'bottom':
        theme.legendBottom = finalValue;
        break;
    }
  } else {
    // If invalid, reset to default values
    let defaultValue;
    switch (position) {
      case 'left':
        defaultValue = 'center';
        break;
      case 'bottom':
        defaultValue = 10;
        break;
      default:
        defaultValue = 'auto';
    }

    valueRef.value = String(defaultValue);

    // Set the theme property to default value
    switch (position) {
      case 'left':
        theme.legendLeft = 'center';
        break;
      case 'right':
        theme.legendRight = 'auto';
        break;
      case 'top':
        theme.legendTop = 'auto';
        break;
      case 'bottom':
        theme.legendBottom = 10;
        break;
    }
  }
}

// Grid value validation function
const validateGridValue = (position: 'left' | 'right' | 'top' | 'bottom') => {
  let valueRef;

  switch (position) {
    case 'left':
      valueRef = gridLeft;
      break;
    case 'right':
      valueRef = gridRight;
      break;
    case 'top':
      valueRef = gridTop;
      break;
    case 'bottom':
      valueRef = gridBottom;
      break;
  }

  const inputValue = valueRef.value.trim();

  // Check if the value is a number or a percentage string
  const isValid =
    // Empty string - will be converted to undefined in setOption
    inputValue === '' ||
    // Valid number
    /^[0-9]+$/.test(inputValue) ||
    // Valid percentage (e.g. 10%, 10.5%)
    /^[0-9]+(\.[0-9]+)?%$/.test(inputValue);

  if (isValid) {
    // Update the theme property with the validated value
    // For numeric values, convert to number if it's a pure number
    // Empty strings will use default values defined in themeGenerator.ts
    const finalValue = inputValue === '' ?
                       (position === 'left' || position === 'right' ? '10%' : 60) :
                       (/^[0-9]+$/.test(inputValue)) ? parseInt(inputValue, 10) : inputValue;

    // Update the corresponding theme property
    switch (position) {
      case 'left':
        theme.gridLeft = finalValue;
        break;
      case 'right':
        theme.gridRight = finalValue;
        break;
      case 'top':
        theme.gridTop = finalValue;
        break;
      case 'bottom':
        theme.gridBottom = finalValue;
        break;
    }
  } else {
    // If invalid, reset to default values
    const defaultValue = position === 'left' || position === 'right' ? '10%' : 60;
    valueRef.value = String(defaultValue);

    // Set the theme property to default value
    switch (position) {
      case 'left':
        theme.gridLeft = '10%';
        break;
      case 'right':
        theme.gridRight = '10%';
        break;
      case 'top':
        theme.gridTop = 60;
        break;
      case 'bottom':
        theme.gridBottom = 60;
        break;
    }
  }
}

// Methods
const downloadTheme = async () => {
  try {
    const themeConfig = themeStore.getEChartsTheme()
    const jsContent = themeStore.getThemeJsFile()
    const filename = themeName.value && echarts.format.encodeHTML(themeName.value) || 'customized'

    // Show format selection dialog using action sheet style
    try {
      await showDialog({
        title: t('modals.formatSelection'),
        message: t('modals.formatSelectionMsg'),
        showCancelButton: true,
        confirmButtonText: t('modals.jsFormat'),
        cancelButtonText: t('modals.jsonFormat'),
        closeOnClickOverlay: true
      })

      // User chose JavaScript
      downloadJsFile(jsContent, filename)
      showUsageInstructions('js', filename)
    } catch {
      // User chose JSON (clicked cancel button)
      downloadJsonFile(themeConfig, filename)
      showUsageInstructions('json', filename)
    }
  } catch (error) {
    console.error('Download failed:', error)
    showToast({
      message: t('modals.downloadFailed'),
      type: 'fail'
    })
  }
}

const showUsageInstructions = (format: 'js' | 'json', filename: string) => {
  if (format === 'js') {
    showDialog({
      title: t('modals.jsUsageTitle'),
      message: `<div style="text-align: left; padding: 5px 0;">
          <ol style="margin: 0; line-height: 1; list-style: inside decimal;">
            <li>${t('modals.jsUsageStep1').replace('__filename__', `<code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: Monaco, monospace;">${filename}.js</code>`)}</li>
            <li>${t('modals.jsUsageStep2')}<br/><code style="background: #f0f0f0; padding: 4px 8px; border-radius: 3px; font-family: Monaco, monospace; display: inline-block; margin-top: 6px;">&lt;script src="${filename}.js"&gt;&lt;/script&gt;</code></li>
            <li>${t('modals.jsUsageStep3')}<br/><code style="background: #f0f0f0; padding: 4px 8px; border-radius: 3px; font-family: Monaco, monospace; display: inline-block; margin-top: 6px;">echarts.init(dom, '${filename}')</code></li>
          </ol>
          <p style="margin: 0; color: #666; font-size: 14px; line-height: 1; background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 3px solid var(--van-primary-color);">${t('modals.jsUsageTip')}</p>
        </div>`,
      allowHtml: true,
      confirmButtonText: t('common.ok'),
      closeOnClickOverlay: true
    })
  } else {
    showDialog({
      title: t('modals.jsonUsageTitle'),
      message: `<div style="text-align: left; padding: 5px 0;">
          <ol style="margin: 0; line-height: 1; list-style: inside decimal;">
            <li>${t('modals.jsonUsageStep1').replace('__filename__', `<code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: Monaco, monospace;">${filename}.json</code>`)}</li>
            <li>${t('modals.jsonUsageStep2')}<br/><code style="background: #f0f0f0; padding: 4px 8px; border-radius: 3px; font-family: Monaco, monospace; display: inline-block; margin-top: 6px;">const obj = JSON.parse(data)</code></li>
            <li>${t('modals.jsonUsageStep3')}<br/><code style="background: #f0f0f0; padding: 4px 8px; border-radius: 3px; font-family: Monaco, monospace; display: inline-block; margin-top: 6px;">echarts.registerTheme('${filename}', obj)</code></li>
            <li>${t('modals.jsonUsageStep4')}<br/><code style="background: #f0f0f0; padding: 4px 8px; border-radius: 3px; font-family: Monaco, monospace; display: inline-block; margin-top: 6px;">echarts.init(dom, '${filename}')</code></li>
          </ol>
          <p style="margin: 0; color: #666; font-size: 14px; line-height: 1; background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 3px solid var(--van-primary-color);">${t('modals.jsonUsageTip')}</p>
        </div>`,
      allowHtml: true,
      confirmButtonText: t('common.ok'),
      closeOnClickOverlay: true
    })
  }
}

const importConfig = () => {
  importFileInputRef.value?.click()
}

const exportConfig = async () => {
  try {
    const configData = themeStore.getThemeConfigForDownload()
    const filename = `${themeName.value && echarts.format.encodeHTML(themeName.value) || 'customized'}.project`

    downloadJsonFile(configData, filename)

    showToast({
      message: t('modals.exportSuccess'),
      type: 'success'
    })
  } catch (error) {
    console.error('Export failed:', error)
    showToast({
      message: t('modals.exportFailed'),
      type: 'fail'
    })
  }
}

const refreshCharts = () => {
  if (props.chartPreviewRef?.updateCharts) {
    props.chartPreviewRef.updateCharts()
    showToast({
      message: t('modals.chartsRefreshed'),
      type: 'success'
    })
  }
}

const resetTheme = async () => {
  try {
    await showDialog({
      title: t('common.reset'),
      message: t('modals.resetConfirm'),
    })

    themeStore.resetTheme()
    showToast({
      message: t('modals.themeReset'),
      type: 'success'
    })
  } catch {
    // User cancelled
  }
}

const showHelp = () => {
  showDialog({
    title: t('modals.helpTitle'),
    message: `<div class="modal-body">
            <h4>${t('modals.helpContent.whatIs')}</h4>
            <p>${t('modals.helpContent.whatIsDesc1')}</p>
            <p>${t('modals.helpContent.whatIsDesc2')}</p>
            <p>${t('modals.helpContent.whatIsDesc3')}</p>

            <h4>${t('modals.helpContent.importExport')}</h4>
            <p>${t('modals.helpContent.importExportDesc')}</p>
          </div>`,
    allowHtml: true,
    confirmButtonText: t('common.gotIt')
  })
}

const openSourceCode = () => {
  window.open('https://github.com/apache/echarts-theme-builder', '_blank', 'noopener,noreferrer')
}

const selectPreDefinedTheme = async (index: number) => {
  if (themeStore.activePreDefinedThemeIndex.value === index) {
    // Already selected
    return
  }
  try {
    await themeStore.loadPreDefinedTheme(index)

    // Manually trigger chart update
    if (props.chartPreviewRef?.updateCharts) {
      props.chartPreviewRef.updateCharts()
    }
  } catch (error) {
    console.error('Error selecting predefined theme:', error)
  }
}

const onAxisSettingChange = () => {
  themeStore.updateAxisSetting()
}

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Check file extension
  const extension = file.name.slice(file.name.lastIndexOf('.'))
  if (extension !== '.json') {
    showToast({
      message: t('modals.selectJsonFile'),
      type: 'fail'
    })
    target.value = ''
    return
  }

  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const result = e.target?.result as string
        const data = JSON.parse(result)

        // Validate imported data
        if (!data.themeName && !data.version && !data.theme) {
          showToast({
            message: t('modals.useExportedFile'),
            type: 'fail'
          })
          return
        }

        // Check version compatibility
        if (data.version && data.version < 1) {
          try {
            await showDialog({
              title: t('modals.importThemeTitle'),
              message: t('modals.oldVersionPrompt'),
            })
          } catch {
            return // User cancelled
          }
        }

        themeStore.importTheme(result)

        // Update charts if reference is available
        if (props.chartPreviewRef?.updateCharts) {
          props.chartPreviewRef.updateCharts()
        }

        showToast({
          message: t('modals.importSuccess'),
          type: 'success'
        })
      } catch (error) {
        console.error('Import error:', error)
        showToast({
          message: t('modals.invalidFormat'),
          type: 'fail'
        })
      }
    }

    reader.onerror = () => {
      showToast({
        message: t('modals.fileReadFailed'),
        type: 'fail'
      })
    }

    reader.readAsText(file)
  } catch (error) {
    console.error('File import failed:', error)
    showToast({
      message: t('modals.fileReadFailed'),
      type: 'fail'
    })
  }

  // Clear input
  target.value = ''
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const loader = showLoadingToast({
    message: t('modals.extractingColors'),
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
    wordBreak: 'break-word',
    className: 'ec-loading-toast'
  })

  let imgURL: string | undefined;
  try {
    imgURL = URL.createObjectURL(file)

    const img = new Image()
    img.src = imgURL

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = (e) => {
        console.error('Failed to load image')
        reject(e)
      }
    })

    const colorThief = new ColorThief()
    const colors = colorThief.getPalette(img, 10, 1).map(
      (rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    )

    loader.close()

    themeName.value = 'image-based'
    theme.color = colors
    // PENDING
    theme.visualMapColor = colors.slice(0, 2)

    props.chartPreviewRef?.updateCharts()

    themeStore.activePreDefinedThemeIndex.value = null
  } catch (e) {
    console.error('Failed to extract image color:', e)
    showToast({
      message: t('modals.extractColorFailed'),
      type: 'fail'
    })
  } finally {
    imgURL && URL.revokeObjectURL(imgURL)
    target.value = ''
  }
}
</script>

<style scoped>
.theme-panel {
  height: 100%;
  overflow-y: auto;
}

.panel-content {
  padding: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.action-buttons .van-button {
  flex: 1;
  min-width: 80px;
  font-size: 13px;
}

.predefined-themes {
  margin-top: 16px;
}

.predefined-themes h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #323233;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.theme-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: auto;
  box-sizing: border-box;
  height: 32px;
  margin-bottom: 5px;
  overflow: hidden;
  border: 1px solid #eee;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 2px;
}

.theme-item:hover,
.theme-item.active {
  border-color: var(--van-primary-color);
  box-shadow: 0 0 4px var(--van-primary-color);
}

.new-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: auto;
  font-size: 85%;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
}

.color-dot {
  width: 20px;
  height: 20px;
  margin: 0 2px 4px 2px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.axis-group {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebedf0;
}

.axis-group h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: rgb(41, 60, 85);
}

@media (max-width: 1200px) {
  .new-theme span {
    display: none;
  }
}

/* Custom Vant styles */
:deep(.van-collapse) {
  border: none;
  background: #fff;
}

:deep(.van-collapse-item) {
  border-top: 1px solid #ccc;
  background: #fff;
}

:deep(.van-collapse-item:first-child) {
  border-top: none;
}

:deep(.van-collapse-item__title) {
  padding: 10px 16px;
  background-color: #fff;
  font-weight: 500;
  border: none;
  transition: background-color 0.3s;
}

:deep(.van-collapse-item__title:hover) {
  background-color: #f7f8fa;
}

:deep(.van-collapse-item__content) {
  padding: 0;
  border-top: none;
  background: #fff;
}

:deep(.van-collapse-item__wrapper) {
  border: none;
  overflow: hidden;
  transition: height 0.3s ease;
}

:deep(.van-field) {
  padding: 8px 16px;
  border-bottom: 1px solid #f7f8fa;
}

:deep(.van-field:last-child) {
  border-bottom: none;
}

:deep(.van-field__label) {
  width: 80px;
  font-size: 13px;
  color: #323233;
  text-align: right;
  padding-right: 8px;
}

:deep(.van-field__control) {
  font-size: 13px;
}

:deep(.van-radio-group) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 8px 0;
}

:deep(.van-radio) {
  margin: 0;
  font-size: 12px;
}

:deep(.van-checkbox) {
  font-size: 12px;
  min-width: 24px;
}

:deep(.van-button--small) {
  height: 28px;
  font-size: 12px;
}

/* Color picker adjustments */
:deep(.vc-color-wrap) {
  width: 32px !important;
  height: 32px !important;
  border-radius: 4px;
  border: 1px solid #dcdee0;
}

:deep(.vc-color-picker) {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Dialog width adjustments */
:global(.van-dialog) {
  width: 500px;
  max-width: 90vw;
}

:global(.van-dialog__content) {
  max-height: 70vh !important;
  overflow-y: auto !important;
}

:global(.van-dialog__message) {
  text-align: left !important;
  line-height: 1 !important;
}

/* Code dialog specific styles */
:global(.van-dialog__message pre) {
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
  font-size: 12px !important;
  line-height: 1 !important;
}

/* Help dialog styles */
:global(.modal-body) {
  text-align: left;
  padding: 5px 0;
  white-space: normal;
}

:global(.modal-body h4) {
  margin: 30px 0 10px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

:global(.modal-body h4:first-child) {
  margin-top: 0;
}

:global(.modal-body p) {
  margin: 15px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

:global(.modal-body code) {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: Monaco, monospace;
  font-size: 90%;
}

:global(.modal-body a) {
  color: var(--van-primary-color);
  text-decoration: none;
}

:global(.modal-body a:hover) {
  text-decoration: underline;
}

:global(.ec-loading-toast) {
  width: 200px;
}
</style>
