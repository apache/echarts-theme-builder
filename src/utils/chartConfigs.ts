import type { EChartsOption } from 'echarts'

// Chart configuration interface
interface ChartConfig {
  title: string
  subtitle?: string
  type: string
  option: EChartsOption
}

// Generate random data helper functions
function getRandomValue(max: number = 1000, min: number = 100): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomArray(length: number, max: number = 1000, min: number = 100): number[] {
  return Array.from({ length }, () => getRandomValue(max, min))
}

// Chart configurations
export function getChartConfigs(seriesCnt: number = 4): ChartConfig[] {
  const axisCat = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const legendData = Array.from({ length: seriesCnt }, (_, i) => `Series ${i + 1}`)

  const commonTooltip = {
    trigger: 'axis' as const
  }

  const commonToolbox = {
    feature: {
      restore: { show: true },
      saveAsImage: { show: true },
      dataView: { show: true },
      dataZoom: { show: true }
    }
  }

  const configs: ChartConfig[] = [
    // Line Chart
    {
      title: 'Line Chart',
      subtitle: 'Basic line chart example',
      type: 'line',
      option: {
        title: {
          text: 'Line Chart',
          subtext: 'Basic line chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'line' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          markPoint: {
            data: [{ name: 'Min', type: 'min' }]
          }
        }))
      }
    },

    // Stacked Area Chart
    {
      title: 'Stacked Area Chart',
      subtitle: 'Stacked area chart example',
      type: 'area',
      option: {
        title: {
          text: 'Stacked Area Chart',
          subtext: 'Stacked area chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat,
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'line' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          areaStyle: {},
          stack: 'total'
        }))
      }
    },

    // Bar Chart
    {
      title: 'Bar Chart',
      subtitle: 'Basic bar chart example',
      type: 'bar',
      option: {
        title: {
          text: 'Bar Chart',
          subtext: 'Basic bar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'bar' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          markPoint: {
            data: [{ name: 'Min', type: 'min' }]
          }
        }))
      }
    },

    // Stacked Bar Chart
    {
      title: 'Stacked Bar Chart',
      subtitle: 'Stacked bar chart example',
      type: 'stackedBar',
      option: {
        title: {
          text: 'Stacked Bar Chart',
          subtext: 'Stacked bar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: axisCat
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'bar' as const,
          data: getRandomArray(axisCat.length, 800, 200),
          stack: 'total'
        }))
      }
    },

    // Scatter Chart
    {
      title: 'Scatter Chart',
      subtitle: 'Basic scatter chart example',
      type: 'scatter',
      option: {
        title: {
          text: 'Scatter Chart',
          subtext: 'Basic scatter chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: legendData.map(name => ({
          name,
          type: 'scatter' as const,
          data: Array.from({ length: 32 }, () => [
            getRandomValue(600, 100),
            getRandomValue(600, 100)
          ])
        }))
      }
    },

    // Pie Chart
    {
      title: 'Pie Chart',
      subtitle: 'Basic pie chart example',
      type: 'pie',
      option: {
        title: {
          text: 'Pie Chart',
          subtext: 'Basic pie chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: commonToolbox,
        series: [{
          name: 'Data',
          type: 'pie' as const,
          radius: '50%',
          data: legendData.map(name => ({
            name,
            value: getRandomValue(800, 200)
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    },

    // Radar Chart
    {
      title: 'Radar Chart',
      subtitle: 'Basic radar chart example',
      type: 'radar',
      option: {
        title: {
          text: 'Radar Chart',
          subtext: 'Basic radar chart example'
        },
        legend: {
          data: legendData
        },
        tooltip: commonTooltip,
        toolbox: commonToolbox,
        radar: {
          indicator: axisCat.map(name => ({ name, max: 1000 })),
          center: ['50%', '60%']
        },
        series: legendData.map(name => ({
          name,
          type: 'radar' as const,
          data: [{
            value: getRandomArray(axisCat.length, 800, 200),
            name
          }]
        }))
      }
    },

    // Candlestick Chart (K-Line)
    {
      title: 'Candlestick Chart',
      subtitle: 'K-line chart with data zoom',
      type: 'candlestick',
      option: {
        title: {
          text: 'Candlestick Chart',
          subtext: 'K-line chart with data zoom'
        },
        tooltip: {
          trigger: 'axis' as const
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: { show: true },
            dataView: { show: true },
            restore: { show: true }
          }
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 20 }, (_, i) => `Day ${i + 1}`)
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [{
          name: 'Stock Price',
          type: 'candlestick' as const,
          data: Array.from({ length: 20 }, () => {
            const open = getRandomValue(2400, 2200)
            const close = getRandomValue(2400, 2200)
            const low = Math.min(open, close) - getRandomValue(50, 0)
            const high = Math.max(open, close) + getRandomValue(50, 0)
            return [open, close, low, high]
          })
        }]
      }
    },

    // Heatmap
    {
      title: 'Heatmap',
      subtitle: 'Basic heatmap example',
      type: 'heatmap',
      option: {
        title: {
          text: 'Heatmap',
          subtext: 'Basic heatmap example'
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        xAxis: {
          type: 'category',
          data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
        },
        yAxis: {
          type: 'category',
          data: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun']
        },
        visualMap: {
          min: 1,
          max: 10,
          calculable: true
        },
        series: [{
          name: 'Heat',
          type: 'heatmap' as const,
          data: Array.from({ length: 84 }, (_, i) => {
            const x = i % 12
            const y = Math.floor(i / 12)
            return [x, y, getRandomValue(10, 1)]
          }),
          label: {
            show: true
          }
        }]
      }
    },

    // Treemap
    {
      title: 'Treemap',
      subtitle: 'Basic treemap example',
      type: 'treemap',
      option: {
        title: {
          text: 'Treemap',
          subtext: 'Basic treemap example'
        },
        tooltip: {
          trigger: 'item' as const,
          formatter: '{b}: {c}'
        },
        toolbox: commonToolbox,
        series: [{
          type: 'treemap' as const,
          data: [
            {
              name: 'Category A',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'A1', value: getRandomValue(300, 100) },
                { name: 'A2', value: getRandomValue(300, 100) },
                { name: 'A3', value: getRandomValue(300, 100) }
              ]
            },
            {
              name: 'Category B',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'B1', value: getRandomValue(300, 100) },
                { name: 'B2', value: getRandomValue(300, 100) }
              ]
            },
            {
              name: 'Category C',
              value: getRandomValue(1000, 500),
              children: [
                { name: 'C1', value: getRandomValue(300, 100) },
                { name: 'C2', value: getRandomValue(300, 100) },
                { name: 'C3', value: getRandomValue(300, 100) },
                { name: 'C4', value: getRandomValue(300, 100) }
              ]
            }
          ]
        }]
      }
    },

    // Graph/Network Chart
    {
      title: 'Graph Chart',
      subtitle: 'Network graph example',
      type: 'graph',
      option: {
        title: {
          text: 'Graph Chart',
          subtext: 'Network graph example'
        },
        tooltip: {
          trigger: 'item' as const
        },
        toolbox: commonToolbox,
        legend: {
          data: ['Category 0', 'Category 1', 'Category 2', 'Category 3']
        },
        series: [{
          type: 'graph' as const,
          layout: 'force',
          roam: true,
          label: {
            show: true,
            color: 'auto'
          },
          force: {
            repulsion: 400,
            edgeLength: 150
          },
          categories: [
            { name: 'Category 0' },
            { name: 'Category 1' },
            { name: 'Category 2' },
            { name: 'Category 3' }
          ],
          data: [
            { id: '0', name: 'Node 1', symbolSize: 30, value: 30, category: 0 },
            { id: '1', name: 'Node 2', symbolSize: 25, value: 25, category: 1 },
            { id: '2', name: 'Node 3', symbolSize: 35, value: 35, category: 0 },
            { id: '3', name: 'Node 4', symbolSize: 20, value: 20, category: 2 },
            { id: '4', name: 'Node 5', symbolSize: 40, value: 40, category: 1 },
            { id: '5', name: 'Node 6', symbolSize: 28, value: 28, category: 3 },
            { id: '6', name: 'Node 7', symbolSize: 32, value: 32, category: 2 },
            { id: '7', name: 'Node 8', symbolSize: 22, value: 22, category: 0 },
            { id: '8', name: 'Node 9', symbolSize: 38, value: 38, category: 3 },
            { id: '9', name: 'Node 10', symbolSize: 26, value: 26, category: 1 }
          ],
          links: [
            { source: '0', target: '1' },
            { source: '0', target: '2' },
            { source: '1', target: '3' },
            { source: '2', target: '4' },
            { source: '3', target: '5' },
            { source: '4', target: '6' },
            { source: '5', target: '7' },
            { source: '6', target: '8' },
            { source: '7', target: '9' },
            { source: '8', target: '0' },
            { source: '9', target: '2' },
            { source: '1', target: '4' },
            { source: '3', target: '7' },
            { source: '5', target: '9' }
          ],
          lineStyle: {
            curveness: 0.3
          }
        }]
      }
    },

    // Timeline Chart
    {
      title: 'Timeline Chart',
      subtitle: 'Timeline with multiple series',
      type: 'timeline',
      option: {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: false,
            data: ['2020', '2021', '2022', '2023'],
            label: {
              formatter: (value: string | number) => value.toString()
            }
          },
          title: {
            text: 'Timeline Chart',
            subtext: 'Timeline with multiple series'
          },
          tooltip: {
            trigger: 'axis' as const
          },
          legend: {
            data: ['Primary', 'Secondary', 'Tertiary']
          },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: {
            type: 'value',
            name: 'Value'
          },
          series: [
            { name: 'Primary', type: 'bar' as const },
            { name: 'Secondary', type: 'bar' as const },
            { name: 'Tertiary', type: 'bar' as const }
          ]
        },
        options: [
          {
            title: { text: 'Timeline Chart - 2020' },
            series: [
              { data: getRandomArray(6, 800, 400) },
              { data: getRandomArray(6, 600, 300) },
              { data: getRandomArray(6, 400, 200) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2021' },
            series: [
              { data: getRandomArray(6, 900, 500) },
              { data: getRandomArray(6, 700, 400) },
              { data: getRandomArray(6, 500, 300) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2022' },
            series: [
              { data: getRandomArray(6, 1000, 600) },
              { data: getRandomArray(6, 800, 500) },
              { data: getRandomArray(6, 600, 400) }
            ]
          },
          {
            title: { text: 'Timeline Chart - 2023' },
            series: [
              { data: getRandomArray(6, 1100, 700) },
              { data: getRandomArray(6, 900, 600) },
              { data: getRandomArray(6, 700, 500) }
            ]
          }
        ]
      }
    }
  ]

  return configs
}

// Get specific chart by type
export function getChartByType(type: string, seriesCnt: number = 4): ChartConfig | undefined {
  const configs = getChartConfigs(seriesCnt)
  return configs.find(config => config.type === type)
}

// Get all available chart types
export function getAvailableChartTypes(): string[] {
  return ['line', 'area', 'bar', 'stackedBar', 'scatter', 'pie', 'radar', 'candlestick', 'heatmap', 'treemap', 'graph', 'timeline']
}
