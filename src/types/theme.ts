// ECharts theme type definitions
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
  // Basic configuration
  seriesCnt: number
  backgroundColor: string
  titleColor: string
  subtitleColor: string
  textColorShow: boolean
  textColor: string
  markTextColor: string

  // Main color palette
  color: string[]

  // Border
  borderColor: string
  borderWidth: number

  // Visual mapping
  visualMapColor: string[]

  // Legend
  legendTextColor: string

  // Candlestick chart
  kColor: string
  kColor0: string
  kBorderColor: string
  kBorderColor0: string
  kBorderWidth: number

  // Line chart
  lineWidth: number
  symbolSize: number
  symbol: string
  symbolBorderWidth: number
  lineSmooth: boolean

  // Graph/Network chart
  graphLineWidth: number
  graphLineColor: string

  // Map
  mapLabelColor: string
  mapLabelColorE: string
  mapBorderColor: string
  mapBorderColorE: string
  mapBorderWidth: number
  mapBorderWidthE: number
  mapAreaColor: string
  mapAreaColorE: string

  // Coordinate axis
  axes: ThemeAxis[]
  axisSeperateSetting: boolean
  axis: ThemeAxis[] | null

  // Toolbox
  toolboxColor: string
  toolboxEmphasisColor: string

  // Tooltip
  tooltipAxisColor: string
  tooltipAxisWidth: number

  // Timeline
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

  // Grid layout
  gridLeft: number | string
  gridRight: number | string
  gridTop: number | string
  gridBottom: number | string

  // Legend position
  legendLeft: number | string
  legendRight: number | string
  legendTop: number | string
  legendBottom: number | string
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
