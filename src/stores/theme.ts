import { ref, reactive } from 'vue'
import type { ThemeData, PreDefinedTheme } from '../types/theme'

// 预定义主题
export const PRE_DEFINED_THEMES: PreDefinedTheme[] = [
  {
    name: 'vintage',
    background: '#fef8ef',
    theme: [
      '#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8',
      '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'
    ]
  },
  {
    name: 'dark',
    background: '#333',
    theme: [
      '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
      '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c',
      '#f49f42'
    ]
  },
  {
    name: 'westeros',
    background: 'transparent',
    theme: [
      '#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0',
      '#cbb0e3'
    ]
  },
  {
    name: 'essos',
    background: 'rgba(242,234,191,0.15)',
    theme: [
      '#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643',
      '#ebdba4'
    ]
  },
  {
    name: 'wonderland',
    background: 'transparent',
    theme: [
      '#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2',
      '#f2b3c9'
    ]
  },
  {
    name: 'walden',
    background: 'rgba(252,252,252,0)',
    theme: [
      '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad',
      '#96dee8'
    ]
  },
  {
    name: 'chalk',
    background: '#293441',
    theme: [
      '#fc97af', '#87f7cf', '#f7f494', '#72ccff', '#f7c5a0',
      '#d4a4eb', '#d2f5a6', '#76f2f2'
    ]
  },
  {
    name: 'infographic',
    background: 'transparent',
    theme: [
      '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
    ]
  },
  {
    name: 'macarons',
    background: 'transparent',
    theme: [
      '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
      '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
  },
  {
    name: 'roma',
    background: 'transparent',
    theme: [
      '#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
      '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
      '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
      '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
    ]
  },
  {
    name: 'shine',
    background: 'transparent',
    theme: [
      '#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa',
      '#339ca8', '#cda819', '#32a487'
    ]
  },
  {
    name: 'purple-passion',
    background: 'rgba(91,92,110,1)',
    theme: [
      '#8a7ca8', '#e098c7', '#8fd3e8', '#71669e', '#cc70af',
      '#7cb4cc'
    ]
  }
]

// 默认主题配置
const createDefaultAxes = () => {
  const types = ['all', 'category', 'value', 'log', 'time']
  const names = ['通用', '类目', '数值', '对数', '时间']
  return types.map((type, i) => ({
    type,
    name: names[i] + '坐标轴',
    axisLineShow: type !== 'value' && type !== 'log',
    axisLineColor: '#6E7079',
    axisTickShow: type !== 'value' && type !== 'log',
    axisTickColor: '#6E7079',
    axisLabelShow: true,
    axisLabelColor: '#6E7079',
    splitLineShow: type !== 'category' && type !== 'time',
    splitLineColor: ['#E0E6F1'],
    splitAreaShow: false,
    splitAreaColor: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
  }))
}

export const createDefaultTheme = (): ThemeData => {
  const axes = createDefaultAxes()
  return {
    seriesCnt: 3,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    titleColor: '#464646',
    subtitleColor: '#6E7079',
    textColorShow: false,
    textColor: '#333',
    markTextColor: '#eee',
    color: [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc'
    ],
    borderColor: '#ccc',
    borderWidth: 0,
    visualMapColor: ['#bf444c', '#d88273', '#f6efa6'],
    legendTextColor: '#333',
    kColor: '#eb5454',
    kColor0: '#47b262',
    kBorderColor: '#eb5454',
    kBorderColor0: '#47b262',
    kBorderWidth: 1,
    lineWidth: 2,
    symbolSize: 4,
    symbol: 'emptyCircle',
    symbolBorderWidth: 1,
    lineSmooth: false,
    graphLineWidth: 1,
    graphLineColor: '#aaa',
    mapLabelColor: '#000',
    mapLabelColorE: 'rgb(100,0,0)',
    mapBorderColor: '#444',
    mapBorderColorE: '#444',
    mapBorderWidth: 0.5,
    mapBorderWidthE: 1,
    mapAreaColor: '#eee',
    mapAreaColorE: 'rgba(255,215,0,0.8)',
    axes,
    axisSeperateSetting: true,
    axis: [axes[0]],
    toolboxColor: '#999',
    toolboxEmphasisColor: '#666',
    tooltipAxisColor: '#ccc',
    tooltipAxisWidth: 1,
    timelineLineColor: '#DAE1F5',
    timelineLineWidth: 2,
    timelineItemColor: '#A4B1D7',
    timelineItemColorE: '#FFF',
    timelineCheckColor: '#316bf3',
    timelineCheckBorderColor: '#fff',
    timelineItemBorderWidth: 1,
    timelineControlColor: '#A4B1D7',
    timelineControlBorderColor: '#A4B1D7',
    timelineControlBorderWidth: 1,
    timelineLabelColor: '#A4B1D7'
  }
}

// 全局状态管理
export const useThemeStore = () => {
  const theme = reactive<ThemeData>(createDefaultTheme())
  const themeName = ref('customized')
  const isPauseChartUpdating = ref(false)
  const chartDisplay = reactive({
    background: '#fff',
    title: '#000'
  })

  const resetTheme = () => {
    Object.assign(theme, createDefaultTheme())
    themeName.value = 'customized'
  }

  const loadPreDefinedTheme = (index: number) => {
    const preTheme = PRE_DEFINED_THEMES[index]
    if (preTheme) {
      theme.backgroundColor = preTheme.background
      theme.color = [...preTheme.theme]
      themeName.value = preTheme.name
    }
  }

  const updateAxisSetting = () => {
    if (theme.axisSeperateSetting) {
      theme.axis = theme.axes
    } else {
      theme.axis = [theme.axes[0]]
    }
  }

  const importTheme = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString)
      if (data.theme) {
        Object.assign(theme, data.theme)
        if (data.themeName) {
          themeName.value = data.themeName
        }
        updateAxisSetting()
      }
    } catch (error) {
      console.error('Failed to import theme:', error)
      throw error
    }
  }

  const exportTheme = () => {
    const exportData = { ...theme }
    // 删除重复的 axis 选项，因为它已经包含在 theme.axes 中
    const { axis, ...cleanedData } = exportData
    return cleanedData
  }

  return {
    theme,
    themeName,
    isPauseChartUpdating,
    chartDisplay,
    resetTheme,
    loadPreDefinedTheme,
    updateAxisSetting,
    importTheme,
    exportTheme
  }
}
