import { ref, reactive, markRaw } from 'vue'
import type { ThemeData, PreDefinedTheme } from '../types/theme'
import { generateEChartsTheme, generateThemeJsFile, generateThemeConfigForDownload } from '../utils/themeGenerator'

// Predefined themes configuration
export const PRE_DEFINED_THEMES: PreDefinedTheme[] = markRaw([
  {
    name: 'v5',
    background: 'rgba(0, 0, 0, 0)',
    theme: [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc'
    ]
  },
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
])

// Default theme axes configuration
const createDefaultAxes = () => {
  const types = ['all', 'category', 'value', 'log', 'time']
  const names = ['General', 'Category', 'Value', 'Log', 'Time']
  return types.map((type, i) => ({
    type,
    name: names[i] + ' Axis',
    axisLineShow: type !== 'value' && type !== 'log',
    axisLineColor: '#54555a',
    axisTickShow: type !== 'value' && type !== 'log',
    axisTickColor: '#54555a',
    axisLabelShow: true,
    axisLabelColor: '#54555a',
    splitLineShow: type !== 'category' && type !== 'time',
    splitLineColor: ['#dbdee4'],
    splitAreaShow: false,
    splitAreaColor: ['rgba(234,237,245,0.5)', 'rgba(255,255,255,0)']
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
      '#5070dd',
      '#b6d634',
      '#505372',
      '#ff994d',
      '#0ca8df',
      '#ffd10a',
      '#fb628b',
      '#785db0',
      '#3fbe95'
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
    axis: [axes[0]!],
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
    timelineLabelColor: '#A4B1D7',
    gridLeft: '15%',
    gridRight: '10%',
    gridTop: 65,
    gridBottom: 80,
    legendLeft: 'center',
    legendRight: 'auto',
    legendTop: 'auto',
    legendBottom: 15
  }
}

// Global state management - Singleton pattern
let themeStoreInstance: ReturnType<typeof createThemeStore> | null = null

const createThemeStore = () => {
  const theme = reactive<ThemeData>(createDefaultTheme())
  const themeName = ref('customized')
  const chartDisplay = reactive({
    background: '#fff',
    title: '#000'
  })

  const resetTheme = () => {
    activePreDefinedThemeIndex.value = null
    Object.assign(theme, createDefaultTheme())
    themeName.value = 'customized'
  }

  const activePreDefinedThemeIndex = ref<number | null>(null)
  let definedThemeLoadAbortController: AbortController | null = null
  const loadPreDefinedTheme = async (index: number) => {
    if (activePreDefinedThemeIndex.value === index) {
      return
    }

    activePreDefinedThemeIndex.value = index

    definedThemeLoadAbortController?.abort()
    definedThemeLoadAbortController = new AbortController()

    const preTheme = PRE_DEFINED_THEMES[index]
    if (!preTheme) {
      console.error('No theme found at index:', index)
      return
    }

    try {
      // Load the complete theme configuration from JSON file
      const response = await fetch(`${import.meta.env.BASE_URL}themes/${preTheme.name}.json`, {
        signal: definedThemeLoadAbortController.signal
      })
      if (!response.ok) {
        throw new Error(`Failed to load theme: ${preTheme.name}`)
      }

      const themeData = await response.json()

      if (themeData.theme) {
        // Convert string numbers to actual numbers
        const loadedTheme = { ...themeData.theme }

        // Apply the complete theme configuration property by property to ensure reactivity
        // This ensures Vue's reactive system properly detects changes
        Object.keys(loadedTheme).forEach(key => {
          if (key in theme) {
            (theme as any)[key] = loadedTheme[key]
          }
        })

        themeName.value = themeData.themeName || preTheme.name

        // Ensure color is an array
        if (typeof theme.color === 'string') {
          theme.color = [theme.color]
        }

        // Update axis settings based on axisSeperateSetting
        updateAxisSetting()

        // Force trigger reactive update by modifying a dummy property
        ;(theme as any).__forceUpdate = Date.now()
      }
    } catch (error) {
      console.error('Error loading predefined theme:', error)
      // Fallback to basic theme loading
      theme.backgroundColor = preTheme.background
      theme.color = [...preTheme.theme]
      themeName.value = preTheme.name
    }
  }

  const updateAxisSetting = () => {
    if (theme.axisSeperateSetting) {
      theme.axis = theme.axes
    } else {
      theme.axis = [theme.axes[0]!]
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
    // Remove duplicate axis options since they are already included in theme.axes
    const { axis, ...cleanedData } = exportData
    return cleanedData
  }

  const getEChartsTheme = () => {
    // Convert reactive object to plain object to ensure proper data passing
    const plainTheme = JSON.parse(JSON.stringify(theme))
    return generateEChartsTheme(plainTheme)
  }

  const getThemeJsFile = () => {
    return generateThemeJsFile(theme, themeName.value)
  }

  const getThemeConfigForDownload = () => {
    return generateThemeConfigForDownload(theme, themeName.value, 1)
  }

  return {
    theme,
    themeName,
    chartDisplay,
    resetTheme,
    activePreDefinedThemeIndex,
    loadPreDefinedTheme,
    updateAxisSetting,
    importTheme,
    exportTheme,
    getEChartsTheme,
    getThemeJsFile,
    getThemeConfigForDownload
  }
}

export const useThemeStore = () => {
  if (!themeStoreInstance) {
    themeStoreInstance = createThemeStore()
  }
  return themeStoreInstance
}
