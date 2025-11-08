import type { ThemeData } from '../types/theme'

/**
 * Generate ECharts theme configuration based on theme data
 * @param themeData - Theme configuration data
 * @returns ECharts theme configuration object
 */
export function generateEChartsTheme(themeData: ThemeData) {
  // Generate series style configuration
  const seriesStyle = {
    itemStyle: {
      borderWidth: themeData.symbolBorderWidth
    },
    lineStyle: {
      width: themeData.lineWidth
    },
    symbolSize: themeData.symbolSize,
    symbol: themeData.symbol,
    smooth: themeData.lineSmooth
  }

  // Generate item style configuration
  const itemStyle = {
    borderWidth: themeData.borderWidth,
    borderColor: themeData.borderColor
  }

  const border = {
    itemStyle: itemStyle
  } as any

  // Generate map configuration
  const mapConfig = {
    itemStyle: {
      areaColor: themeData.mapAreaColor,
      borderColor: themeData.mapBorderColor,
      borderWidth: themeData.mapBorderWidth
    },
    label: {
      color: themeData.mapLabelColor
    },
    emphasis: {
      itemStyle: {
        areaColor: themeData.mapAreaColorE,
        borderColor: themeData.mapBorderColorE,
        borderWidth: themeData.mapBorderWidthE
      },
      label: {
        color: themeData.mapLabelColorE
      }
    }
  }

  // Generate axis configuration helper function
  const getAxisConfig = (axisType: number) => {
    let axisIndex = 0
    if (themeData.axisSeperateSetting && axisType > 0 && axisType < themeData.axes.length) {
      axisIndex = axisType
    }

    const axisData = themeData.axes[axisIndex]!
    return {
      axisLine: {
        show: axisData.axisLineShow,
        lineStyle: {
          color: axisData.axisLineColor
        }
      },
      axisTick: {
        show: axisData.axisTickShow,
        lineStyle: {
          color: axisData.axisTickColor
        }
      },
      axisLabel: {
        show: axisData.axisLabelShow,
        color: axisData.axisLabelColor
      },
      splitLine: {
        show: axisData.splitLineShow,
        lineStyle: {
          color: axisData.splitLineColor
        }
      },
      splitArea: {
        show: axisData.splitAreaShow,
        areaStyle: {
          color: axisData.splitAreaColor
        }
      }
    }
  }

  // Generate graph style configuration
  const graphStyle = {
    ...seriesStyle,
    color: themeData.color,
    lineStyle: {
      width: themeData.graphLineWidth,
      color: themeData.graphLineColor
    },
    label: {
      color: themeData.markTextColor
    },
    itemStyle: {
      ...itemStyle,
      borderWidth: themeData.borderWidth,
      borderColor: themeData.borderColor
    }
  }

  // Generate candlestick configuration
  const candlestickConfig = {
    itemStyle: {
      color: themeData.kColor,
      color0: themeData.kColor0,
      borderColor: themeData.kBorderColor,
      borderColor0: themeData.kBorderColor0,
      borderWidth: themeData.kBorderWidth
    }
  }

  // Generate bar configuration
  const barConfig = {
    itemStyle: {
      barBorderWidth: themeData.borderWidth,
      barBorderColor: themeData.borderColor
    }
  }

  // Generate mark point configuration
  const markPointConfig = {
    label: {
      color: themeData.markTextColor
    },
    emphasis: {
      label: {
        color: themeData.markTextColor
      }
    }
  }

  // Main theme configuration object
  const themeConfig = {
    color: themeData.color,
    backgroundColor: themeData.backgroundColor, // Apply background color regardless of export state
    textStyle: themeData.textColorShow ? {
      color: themeData.textColor
    } : {},
    title: {
      textStyle: {
        color: themeData.titleColor
      },
      subtextStyle: {
        color: themeData.subtitleColor
      }
    },
    line: seriesStyle,
    radar: seriesStyle,
    bar: barConfig,
    pie: border,
    scatter: border,
    boxplot: border,
    parallel: border,
    sankey: border,
    funnel: border,
    gauge: border,
    candlestick: candlestickConfig,
    graph: graphStyle,
    map: mapConfig,
    geo: mapConfig,
    categoryAxis: getAxisConfig(1),
    valueAxis: getAxisConfig(2),
    logAxis: getAxisConfig(3),
    timeAxis: getAxisConfig(4),
    toolbox: {
      iconStyle: {
        borderColor: themeData.toolboxColor
      },
      emphasis: {
        iconStyle: {
          borderColor: themeData.toolboxEmphasisColor
        }
      }
    },
    legend: {
      textStyle: {
        color: themeData.legendTextColor
      },
      left: themeData.legendLeft === '' ? 'center' : themeData.legendLeft,
      right: themeData.legendRight === '' ? 'auto' : themeData.legendRight,
      top: themeData.legendTop === '' ? 'auto' : themeData.legendTop,
      bottom: themeData.legendBottom === '' ? 10 : themeData.legendBottom
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: themeData.tooltipAxisColor,
          width: themeData.tooltipAxisWidth
        },
        crossStyle: {
          color: themeData.tooltipAxisColor,
          width: themeData.tooltipAxisWidth
        }
      }
    },
    timeline: {
      lineStyle: {
        color: themeData.timelineLineColor,
        width: themeData.timelineLineWidth
      },
      itemStyle: {
        color: themeData.timelineItemColor,
        borderWidth: themeData.timelineItemBorderWidth
      },
      controlStyle: {
        color: themeData.timelineControlColor,
        borderColor: themeData.timelineControlBorderColor,
        borderWidth: themeData.timelineControlBorderWidth
      },
      checkpointStyle: {
        color: themeData.timelineCheckColor,
        borderColor: themeData.timelineCheckBorderColor
      },
      label: {
        color: themeData.timelineLabelColor
      },
      emphasis: {
        itemStyle: {
          color: themeData.timelineItemColorE
        },
        controlStyle: {
          color: themeData.timelineControlColor,
          borderColor: themeData.timelineControlBorderColor,
          borderWidth: themeData.timelineControlBorderWidth
        },
        label: {
          color: themeData.timelineLabelColor
        }
      }
    },
    visualMap: {
      color: themeData.visualMapColor
    },
    markPoint: markPointConfig,
    grid: {
      left: themeData.gridLeft === '' ? '10%' : themeData.gridLeft,
      right: themeData.gridRight === '' ? '10%' : themeData.gridRight,
      top: themeData.gridTop === '' ? 60 : themeData.gridTop,
      bottom: themeData.gridBottom === '' ? 60 : themeData.gridBottom
    }
  }

  return themeConfig
}

/**
 * Generate JavaScript file content for theme export
 * @param themeData - Theme configuration data
 * @param themeName - Name of the theme
 * @returns JavaScript file content as string
 */
export function generateThemeJsFile(themeData: ThemeData, themeName: string): string {
  const themeConfig = generateEChartsTheme(themeData)

  // Format theme with 4 spaces indentation
  let themeJson = JSON.stringify(themeConfig, null, '    ')
  // Indent each line with 4 spaces
  themeJson = themeJson.split('\n').join('\n    ')

  return `(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('${themeName}', ${themeJson});
}));`
}

/**
 * Generate theme configuration for download
 * @param themeData - Theme configuration data
 * @param themeName - Name of the theme
 * @param version - Version number
 * @returns Configuration object for download
 */
export function generateThemeConfigForDownload(themeData: ThemeData, themeName: string, version: number = 1) {
  const cleanedTheme = { ...themeData }
  // Remove duplicate axis option as it's included in axes
  delete (cleanedTheme as any).axis

  return {
    version,
    themeName,
    theme: cleanedTheme
  }
}
