import type { ThemeData } from '../types/theme'

/**
 * Generate ECharts theme configuration based on theme data
 * @param themeData - Theme configuration data
 * @param isToExport - Whether this is for export (includes backgroundColor)
 * @returns ECharts theme configuration object
 */
export function generateEChartsTheme(themeData: ThemeData, isToExport: boolean = false) {
  console.log('🎨 generateEChartsTheme called with:', themeData)
  console.log('🎨 Theme backgroundColor:', themeData.backgroundColor)
  console.log('🎨 Theme colors:', themeData.color)
  console.log('🎨 Theme titleColor:', themeData.titleColor)

  // Halloween pumpkin symbol path
  const pumpkin = 'path://M237.062,81.761L237.062,81.761c-12.144-14.24-25.701-20.1-40.68-19.072 c-10.843,0.747-20.938,5.154-30.257,13.127c-9.51-5.843-19.8-9.227-30.859-10.366c0.521-3.197,1.46-6.306,2.85-9.363 c3.458-7.038,8.907-12.741,16.331-17.296c-5.609-3.384-11.227-6.799-16.854-10.279c-16.257,8.104-25.06,20.601-26.463,38.417 c-7.599,1.705-14.685,4.486-21.247,8.437c-9.164-7.677-18.996-11.917-29.496-12.632c-14.819-0.998-28.467,4.787-40.938,18.827 C6.445,96.182,0,114.867,0,136.242c-0.007,6.371,0.674,12.646,2.053,18.738c4.593,22.785,15.398,41.367,32.558,55.344 c15.43,12.773,29.901,18.023,43.362,16.981c7.074-0.561,13.624-3.977,19.685-10.192c10.534,5.49,20.391,8.217,29.561,8.203 c9.856-0.012,20.236-2.953,31.125-8.898c6.227,6.692,12.966,10.346,20.211,10.933c13.795,1.073,28.614-4.111,44.377-16.84 c17.49-14.104,28.043-32.79,31.796-55.485c0.836-5.624,1.272-11.292,1.272-16.966C255.998,115.814,249.707,96.601,237.062,81.761z M54.795,97.7l40.661,14.496c-4.402,8.811-10.766,13.219-19.06,13.219c-2.542,0-4.917-0.419-7.122-1.274 C58.103,118.38,53.263,109.572,54.795,97.7z M150.613,185.396l-9.156-8.389l-7.619,12.951c-3.391,0.341-6.615,0.514-9.665,0.514 c-4.401,0-8.635-0.263-12.708-0.777l-8.634-14.973l-9.151,9.909c-4.91-2.717-9.15-5.856-12.708-9.413 c-8.81-8.295-13.384-17.959-13.727-28.97c2.877,1.692,7.427,3.461,13.675,5.308l10.636,13.629l9.44-9.852 c4.734,0.702,9.234,1.12,13.466,1.275l10.689,11.498l9.671-11.949c3.559-0.173,7.285-0.515,11.182-1.01l9.924,10.159l10.933-14.227 c5.931-1.351,11.196-2.798,15.771-4.323C179.747,163.538,169.068,176.414,150.613,185.396z M175.258,124.907 c-2.209,0.849-4.66,1.273-7.369,1.273c-8.134,0-14.489-4.415-19.052-13.224l40.905-14.477 C191.105,110.331,186.273,119.141,175.258,124.907z'

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

  // Special case for Halloween theme
  if (themeData.symbol === 'halloween') {
    seriesStyle.symbol = pumpkin
    border.symbol = pumpkin
  }

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

    const axisData = themeData.axes[axisIndex]
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
    backgroundColor: isToExport ? themeData.backgroundColor : 'transparent',
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
      }
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
    markPoint: markPointConfig
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
  const themeConfig = generateEChartsTheme(themeData, true)

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
