import type { ThemeData } from '../types/theme'

export interface ChartOption {
  title?: any
  legend?: any
  tooltip?: any
  xAxis?: any
  yAxis?: any
  series?: any[]
  toolbox?: any
  grid?: any
  [key: string]: any
}

export const generateChartOptions = (theme: ThemeData) => {
  const groupCnt = theme.seriesCnt
  const axisCat = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const dataLength = axisCat.length

  const getLegend = () => {
    const data = []
    for (let i = 0; i < groupCnt; i++) {
      data.push('第' + (i + 1) + '组')
    }
    return data
  }

  const getSeriesRandomValue = (typeName: string) => {
    const data = []
    const dlen = typeName === 'scatter' ? 32 : dataLength

    for (let i = 0; i < groupCnt; i++) {
      const group = []
      for (let j = 0; j < dlen; j++) {
        let v: any
        if (typeName === 'scatter') {
          v = [
            Math.floor((Math.random() * 600 + 400) * (groupCnt - i) / groupCnt),
            Math.floor((Math.random() * 600 + 400) * (groupCnt - i) / groupCnt)
          ]
        } else {
          v = Math.floor((Math.random() * 600 + 400) * (groupCnt - i) / groupCnt)
        }
        group.push(v)
      }

      data.push({
        type: typeName,
        data: typeName === 'radar' ? [group] : group,
        name: '第' + (i + 1) + '组',
        markPoint: ['line', 'bar', 'scatter'].includes(typeName) ? {
          data: [{
            name: '最高',
            type: 'max'
          }]
        } : undefined
      })
    }
    return data
  }

  const getSeriesRandomStack = (typeName: string) => {
    const data = getSeriesRandomValue(typeName)
    data.forEach((item: any) => {
      item.areaStyle = { normal: {} }
      item.stack = 'total'
    })
    return data
  }

  const getSeriesRandomGroup = (typeName: string) => {
    const data = []
    for (let i = 0; i < groupCnt; i++) {
      data.push({
        name: getLegend()[i],
        value: Math.floor((Math.random() * 800 + 200) * (groupCnt - i) / groupCnt)
      })
    }
    return {
      type: typeName,
      data: data
    }
  }

  const getIndicator = () => {
    return axisCat.map(name => ({
      name,
      max: 1000
    }))
  }

  // 基础配置
  const baseOptions = {
    title: {
      text: '示例图表',
      textStyle: {
        color: theme.titleColor
      }
    },
    legend: {
      data: getLegend(),
      right: 20,
      textStyle: {
        color: theme.legendTextColor
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: theme.tooltipAxisColor,
          width: theme.tooltipAxisWidth
        }
      }
    },
    toolbox: {
      feature: {
        restore: { show: true },
        saveAsImage: { show: true }
      },
      iconStyle: {
        normal: {
          borderColor: theme.toolboxColor
        },
        emphasis: {
          borderColor: theme.toolboxEmphasisColor
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  }

  // 图表配置集合
  const chartOptions: { [key: string]: ChartOption } = {
    // 柱状图
    bar: {
      ...baseOptions,
      xAxis: {
        type: 'category',
        data: axisCat,
        axisLine: {
          show: theme.axes[1].axisLineShow,
          lineStyle: { color: theme.axes[1].axisLineColor }
        },
        axisTick: {
          show: theme.axes[1].axisTickShow,
          lineStyle: { color: theme.axes[1].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[1].axisLabelShow,
          color: theme.axes[1].axisLabelColor
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: theme.axes[2].axisLineShow,
          lineStyle: { color: theme.axes[2].axisLineColor }
        },
        axisTick: {
          show: theme.axes[2].axisTickShow,
          lineStyle: { color: theme.axes[2].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[2].axisLabelShow,
          color: theme.axes[2].axisLabelColor
        },
        splitLine: {
          show: theme.axes[2].splitLineShow,
          lineStyle: { color: theme.axes[2].splitLineColor }
        }
      },
      series: getSeriesRandomValue('bar')
    },

    // 折线图
    line: {
      ...baseOptions,
      xAxis: {
        type: 'category',
        data: axisCat,
        axisLine: {
          show: theme.axes[1].axisLineShow,
          lineStyle: { color: theme.axes[1].axisLineColor }
        },
        axisTick: {
          show: theme.axes[1].axisTickShow,
          lineStyle: { color: theme.axes[1].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[1].axisLabelShow,
          color: theme.axes[1].axisLabelColor
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: theme.axes[2].axisLineShow,
          lineStyle: { color: theme.axes[2].axisLineColor }
        },
        axisTick: {
          show: theme.axes[2].axisTickShow,
          lineStyle: { color: theme.axes[2].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[2].axisLabelShow,
          color: theme.axes[2].axisLabelColor
        },
        splitLine: {
          show: theme.axes[2].splitLineShow,
          lineStyle: { color: theme.axes[2].splitLineColor }
        }
      },
      series: getSeriesRandomValue('line')
    },

    // 饼图
    pie: {
      ...baseOptions,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [getSeriesRandomGroup('pie')]
    },

    // 散点图
    scatter: {
      ...baseOptions,
      xAxis: {
        type: 'value',
        axisLine: {
          show: theme.axes[2].axisLineShow,
          lineStyle: { color: theme.axes[2].axisLineColor }
        },
        axisTick: {
          show: theme.axes[2].axisTickShow,
          lineStyle: { color: theme.axes[2].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[2].axisLabelShow,
          color: theme.axes[2].axisLabelColor
        },
        splitLine: {
          show: theme.axes[2].splitLineShow,
          lineStyle: { color: theme.axes[2].splitLineColor }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: theme.axes[2].axisLineShow,
          lineStyle: { color: theme.axes[2].axisLineColor }
        },
        axisTick: {
          show: theme.axes[2].axisTickShow,
          lineStyle: { color: theme.axes[2].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[2].axisLabelShow,
          color: theme.axes[2].axisLabelColor
        },
        splitLine: {
          show: theme.axes[2].splitLineShow,
          lineStyle: { color: theme.axes[2].splitLineColor }
        }
      },
      series: getSeriesRandomValue('scatter')
    },

    // 雷达图
    radar: {
      ...baseOptions,
      radar: {
        indicator: getIndicator()
      },
      series: getSeriesRandomValue('radar')
    },

    // 面积图
    area: {
      ...baseOptions,
      xAxis: {
        type: 'category',
        data: axisCat,
        axisLine: {
          show: theme.axes[1].axisLineShow,
          lineStyle: { color: theme.axes[1].axisLineColor }
        },
        axisTick: {
          show: theme.axes[1].axisTickShow,
          lineStyle: { color: theme.axes[1].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[1].axisLabelShow,
          color: theme.axes[1].axisLabelColor
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: theme.axes[2].axisLineShow,
          lineStyle: { color: theme.axes[2].axisLineColor }
        },
        axisTick: {
          show: theme.axes[2].axisTickShow,
          lineStyle: { color: theme.axes[2].axisTickColor }
        },
        axisLabel: {
          show: theme.axes[2].axisLabelShow,
          color: theme.axes[2].axisLabelColor
        },
        splitLine: {
          show: theme.axes[2].splitLineShow,
          lineStyle: { color: theme.axes[2].splitLineColor }
        }
      },
      series: getSeriesRandomStack('line')
    }
  }

  return chartOptions
}
