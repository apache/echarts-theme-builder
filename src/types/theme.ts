// ECharts 主题类型定义
export interface ThemeAxis {
  type: string
  name: string
  axisLineShow: boolean
  axisLineColor: string
  axisTickShow: boolean
  axisTickColor: string
  axisLabelShow: boolean
  axisLabelColor: string
  splitLineShow: boolean
  splitLineColor: string[]
  splitAreaShow: boolean
  splitAreaColor: string[]
}

export interface ThemeData {
  // 基础配置
  seriesCnt: number
  backgroundColor: string
  titleColor: string
  subtitleColor: string
  textColorShow: boolean
  textColor: string
  markTextColor: string

  // 主色板
  color: string[]

  // 边框
  borderColor: string
  borderWidth: number

  // 视觉映射
  visualMapColor: string[]

  // 图例
  legendTextColor: string

  // K线图
  kColor: string
  kColor0: string
  kBorderColor: string
  kBorderColor0: string
  kBorderWidth: number

  // 线条
  lineWidth: number
  symbolSize: number
  symbol: string
  symbolBorderWidth: number
  lineSmooth: boolean

  // 关系图
  graphLineWidth: number
  graphLineColor: string

  // 地图
  mapLabelColor: string
  mapLabelColorE: string
  mapBorderColor: string
  mapBorderColorE: string
  mapBorderWidth: number
  mapBorderWidthE: number
  mapAreaColor: string
  mapAreaColorE: string

  // 坐标轴
  axes: ThemeAxis[]
  axisSeperateSetting: boolean
  axis: ThemeAxis[] | null

  // 工具箱
  toolboxColor: string
  toolboxEmphasisColor: string

  // 提示框
  tooltipAxisColor: string
  tooltipAxisWidth: number

  // 时间轴
  timelineLineColor: string
  timelineLineWidth: number
  timelineItemColor: string
  timelineItemColorE: string
  timelineCheckColor: string
  timelineCheckBorderColor: string
  timelineItemBorderWidth: number
  timelineControlColor: string
  timelineControlBorderColor: string
  timelineControlBorderWidth: number
  timelineLabelColor: string
}

export interface PreDefinedTheme {
  name: string
  background: string
  theme: string[]
}

export interface ChartDisplay {
  background: string
  title: string
}
