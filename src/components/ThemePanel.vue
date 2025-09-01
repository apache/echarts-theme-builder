<template>
  <div class="theme-panel">
    <!-- Functions Section -->
    <van-collapse v-model="activeNames">
      <van-collapse-item title="功能" name="functions">
        <div class="panel-content">
          <!-- Action Buttons -->
          <div class="action-buttons">
            <van-button type="primary" size="small" @click="downloadTheme">
              <van-icon name="down" />
              下载主题
            </van-button>
            <van-button size="small" @click="importConfig">
              <van-icon name="upgrade" />
              导入配置
            </van-button>
            <van-button size="small" @click="exportConfig">
              <van-icon name="share" />
              导出配置
            </van-button>
          </div>

          <div class="action-buttons">
            <van-button size="small" @click="refreshCharts">
              <van-icon name="replay" />
              刷新
            </van-button>
            <van-button size="small" @click="resetTheme">
              <van-icon name="delete" />
              复原
            </van-button>
            <van-button size="small" @click="showHelp">
              <van-icon name="question" />
              帮助
            </van-button>
          </div>

          <!-- Theme Name and Series Count -->
          <van-field
            v-model="themeName"
            label="主题名称"
            placeholder="请输入主题名称"
          />

          <van-field
            v-model.number="theme.seriesCnt"
            type="number"
            label="系列数量"
            placeholder="请输入系列数量"
          />

          <!-- Predefined Themes -->
          <div class="predefined-themes">
            <h4>默认方案</h4>
            <div class="theme-grid">
              <div
                v-for="(themeItem, index) in preDefinedThemes"
                :key="index"
                class="theme-item"
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
            </div>
          </div>
        </div>
      </van-collapse-item>

      <!-- Basic Configuration -->
      <van-collapse-item title="基本配置" name="basic">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.backgroundColor"
            label="背景"
          />
          <ColorPicker
            v-model="theme.titleColor"
            label="标题"
          />
          <ColorPicker
            v-model="theme.subtitleColor"
            label="副标题"
          />
          <ColorList
            v-model="theme.color"
            label="主题"
          />
          <ColorPicker
            v-model="theme.markTextColor"
            label="标签文字"
          />
          <van-field
            v-model.number="theme.borderWidth"
            type="number"
            label="描边粗细"
          />
          <ColorPicker
            v-model="theme.borderColor"
            label="描边"
          />
        </div>
      </van-collapse-item>

      <!-- Visual Map -->
      <van-collapse-item title="视觉映射" name="visualMap">
        <div class="panel-content">
          <ColorList
            v-model="theme.visualMapColor"
            label="视觉映射"
          />
        </div>
      </van-collapse-item>

      <!-- Coordinate Axis -->
      <van-collapse-item title="坐标轴" name="axis">
        <div class="panel-content">
          <van-field label="坐标轴设置">
            <template #input>
              <van-checkbox v-model="theme.axisSeperateSetting" @change="onAxisSettingChange">
                为不同类型坐标轴分别设置
              </van-checkbox>
            </template>
          </van-field>

          <div
            v-for="(axis, index) in theme.axis"
            :key="index"
            class="axis-group"
          >
            <h4 v-if="axis.type !== 'all'">{{ axis.name }}</h4>

            <ColorPicker
              v-model="axis.axisLineColor"
              :label="'轴线'"
              :can-disable="true"
              v-model:enabled="axis.axisLineShow"
            />
            <ColorPicker
              v-model="axis.axisTickColor"
              :label="'刻度'"
              :can-disable="true"
              v-model:enabled="axis.axisTickShow"
            />
            <ColorList
              v-model="axis.splitLineColor"
              :label="'网格'"
              :can-disable="true"
              v-model:enabled="axis.splitLineShow"
            />
            <ColorList
              v-model="axis.splitAreaColor"
              :label="'填充'"
              :can-disable="true"
              v-model:enabled="axis.splitAreaShow"
            />
            <ColorPicker
              v-model="axis.axisLabelColor"
              :label="'文字'"
              :can-disable="true"
              v-model:enabled="axis.axisLabelShow"
            />
          </div>
        </div>
      </van-collapse-item>

      <!-- Legend -->
      <van-collapse-item title="图例" name="legend">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.legendTextColor"
            label="文字"
          />
        </div>
      </van-collapse-item>

      <!-- Toolbox -->
      <van-collapse-item title="工具箱" name="toolbox">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.toolboxColor"
            label="图标"
          />
          <ColorPicker
            v-model="theme.toolboxEmphasisColor"
            label="悬停"
          />
        </div>
      </van-collapse-item>

      <!-- Tooltip -->
      <van-collapse-item title="提示框" name="tooltip">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.tooltipAxisColor"
            label="指示线"
          />
          <van-field
            v-model.number="theme.tooltipAxisWidth"
            type="number"
            label="宽度"
          />
        </div>
      </van-collapse-item>

      <!-- Timeline -->
      <van-collapse-item title="时间轴" name="timeline">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.timelineItemColor"
            label="标记"
          />
          <ColorPicker
            v-model="theme.timelineItemColorE"
            label="标记悬停"
          />
          <ColorPicker
            v-model="theme.timelineCheckColor"
            label="标记选中"
          />
          <ColorPicker
            v-model="theme.timelineCheckBorderColor"
            label="标记选中描边"
          />
          <van-field
            v-model.number="theme.timelineItemBorderWidth"
            type="number"
            label="标记描边"
          />
          <ColorPicker
            v-model="theme.timelineLineColor"
            label="主轴"
          />
          <van-field
            v-model.number="theme.timelineLineWidth"
            type="number"
            label="主轴宽度"
          />
          <ColorPicker
            v-model="theme.timelineControlColor"
            label="控件填充"
          />
          <ColorPicker
            v-model="theme.timelineControlBorderColor"
            label="控件描边"
          />
          <van-field
            v-model.number="theme.timelineControlBorderWidth"
            type="number"
            label="控件描边宽度"
          />
          <ColorPicker
            v-model="theme.timelineLabelColor"
            label="文字"
          />
        </div>
      </van-collapse-item>

      <!-- Line Chart -->
      <van-collapse-item title="折线图" name="line">
        <div class="panel-content">
          <van-field label="平滑曲线">
            <template #input>
              <van-checkbox v-model="theme.lineSmooth">
                平滑曲线
              </van-checkbox>
            </template>
          </van-field>

          <van-field
            v-model.number="theme.lineWidth"
            type="number"
            label="线条宽度"
          />
          <van-field
            v-model.number="theme.symbolBorderWidth"
            type="number"
            label="图形描边"
          />
          <van-field
            v-model.number="theme.symbolSize"
            type="number"
            label="图形大小"
          />

          <van-field label="图形形状">
            <template #input>
              <van-radio-group v-model="theme.symbol" direction="horizontal">
                <van-radio name="circle">圆形</van-radio>
                <van-radio name="emptyCircle">空心圆形</van-radio>
                <van-radio name="rect">方形</van-radio>
                <van-radio name="emptyRect">空心方形</van-radio>
                <van-radio name="roundRect">圆角矩形</van-radio>
                <van-radio name="emptyRoundRect">空心圆角矩形</van-radio>
                <van-radio name="triangle">三角形</van-radio>
                <van-radio name="emptyTriangle">空心三角形</van-radio>
                <van-radio name="diamond">菱形</van-radio>
                <van-radio name="emptyDiamond">空心菱形</van-radio>
                <van-radio name="pin">水滴</van-radio>
                <van-radio name="emptyPin">空心水滴</van-radio>
                <van-radio name="arrow">箭头</van-radio>
                <van-radio name="emptyArrow">空心箭头</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
      </van-collapse-item>

      <!-- Graph -->
      <van-collapse-item title="关系图" name="graph">
        <div class="panel-content">
          <van-field
            v-model.number="theme.graphLineWidth"
            type="number"
            label="线条宽度"
          />
          <ColorPicker
            v-model="theme.graphLineColor"
            label="线条颜色"
          />
        </div>
      </van-collapse-item>

      <!-- Map -->
      <van-collapse-item title="地图" name="map">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.mapAreaColor"
            label="区域颜色"
          />
          <ColorPicker
            v-model="theme.mapBorderColor"
            label="边界颜色"
          />
          <van-field
            v-model.number="theme.mapBorderWidth"
            type="number"
            label="边界宽度"
          />
          <ColorPicker
            v-model="theme.mapLabelColor"
            label="标签颜色"
          />
          <ColorPicker
            v-model="theme.mapAreaColorE"
            label="悬停区域颜色"
          />
          <ColorPicker
            v-model="theme.mapBorderColorE"
            label="悬停边界颜色"
          />
          <van-field
            v-model.number="theme.mapBorderWidthE"
            type="number"
            label="悬停边界宽度"
          />
          <ColorPicker
            v-model="theme.mapLabelColorE"
            label="悬停标签颜色"
          />
        </div>
      </van-collapse-item>

      <!-- K Line Chart -->
      <van-collapse-item title="K线图" name="kline">
        <div class="panel-content">
          <ColorPicker
            v-model="theme.kColor"
            label="阳线颜色"
          />
          <ColorPicker
            v-model="theme.kColor0"
            label="阴线颜色"
          />
          <ColorPicker
            v-model="theme.kBorderColor"
            label="阳线边框"
          />
          <ColorPicker
            v-model="theme.kBorderColor0"
            label="阴线边框"
          />
          <van-field
            v-model.number="theme.kBorderWidth"
            type="number"
            label="边框宽度"
          />
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- Hidden file input for import -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'
import { PRE_DEFINED_THEMES } from '../stores/theme'
import ColorPicker from './ColorPicker.vue'
import ColorList from './ColorList.vue'
import type ChartPreviewPanel from './ChartPreviewPanel.vue'

// Props
interface Props {
  chartPreviewRef?: InstanceType<typeof ChartPreviewPanel> | null
}
const props = defineProps<Props>()

// Component state
const activeNames = ref(['functions'])  // Functions panel expanded by default
const fileInput = ref<HTMLInputElement>()

// Theme store
const themeStore = useThemeStore()
const { theme, themeName } = themeStore

// Predefined themes
const preDefinedThemes = PRE_DEFINED_THEMES

// Methods
const downloadTheme = () => {
  // TODO: Implement theme download
}

const importConfig = () => {
  fileInput.value?.click()
}

const exportConfig = () => {
  // TODO: Implement config export
}

const refreshCharts = () => {
  // TODO: Implement chart refresh
}

const resetTheme = () => {
  themeStore.resetTheme()
}

const showHelp = () => {
  // TODO: Implement help dialog
}

const selectPreDefinedTheme = async (index: number) => {
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

const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const result = e.target?.result as string
      themeStore.importTheme(result)
    } catch (error) {
      console.error('Failed to import theme:', error)
      // TODO: Show error message
    }
  }
  reader.readAsText(file)

  // Clear input
  target.value = ''
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
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.action-buttons .van-button {
  flex: 1;
  min-width: 80px;
  font-size: 12px;
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
  height: 22px;
  margin-bottom: 5px;
  overflow: hidden;
  border: 1px solid #eee;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 2px;
}

.theme-item:hover {
  border-color: #1989fa;
  box-shadow: 0 2px 8px rgba(25, 137, 250, 0.15);
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
  color: #323233;
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
  color: #1989fa;
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
</style>
