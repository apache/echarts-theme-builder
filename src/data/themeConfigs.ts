export type ThemeConfigItem = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color';
  value: string | number | boolean | string[];
  selectOptions?: { name: string; value: string }[];
  optionPath: string;
  multipleColor?: boolean;
  isShow?: boolean;
  showOptionPath?: number;
};

export type ThemeConfig = {
  groupName: string;
  items: ThemeConfigItem[];
};

export type Theme = {
  name: string;
  groupCount: number;
  config: object;
};

export const optionPathAlias = [
  ['axis', ['categoryAxis', 'valueAxis', 'logAxis', 'timeAxis']]
];

export const themeConfigs: ThemeConfig[] = [
  {
    groupName: 'basicConfigs',
    items: [
      {
        name: 'backgroundColor',
        type: 'color',
        value: 'rgba(0, 0, 0, 0)',
        optionPath: 'backgroundColor'
      },
      {
        name: 'titleColor',
        type: 'color',
        value: '#464646',
        optionPath: 'title.textStyle.color'
      },
      {
        name: 'subtitleColor',
        type: 'color',
        value: '#6e7079',
        optionPath: 'title.subtextStyle.color'
      },
      {
        name: 'themeColors',
        type: 'color',
        multipleColor: true,
        value: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
        optionPath: 'color'
      }
    ]
  },
  {
    groupName: 'visualMap',
    items: [
      {
        name: 'visualMap',
        type: 'color',
        multipleColor: true,
        value: ['#bf444c', '#d88273', '#f6efa6'],
        optionPath: 'visualMap.color'
      }
    ]
  },
  {
    groupName: 'axis',
    items: [
      {
        name: 'axisLine',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisLine.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: 'axisTick',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisTick.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: 'axisSplitLine',
        type: 'color',
        multipleColor: true,
        value: ['#e0e6f1'],
        optionPath: '{axis}.splitLine.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: 'axisArea',
        type: 'color',
        multipleColor: true,
        value: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
        optionPath: '{axis}.splitArea.areaStyle.color',
        isShow: false,
        showOptionPath: -3
      },
      {
        name: 'axisLabel',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisLabel.color',
        isShow: true,
        showOptionPath: -2
      }
    ]
  },
  {
    groupName: 'legend',
    items: [
      {
        name: 'legendTextColor',
        type: 'color',
        value: '#333333',
        optionPath: 'legend.textStyle.color'
      }
    ]
  },
  {
    groupName: 'toolbox',
    items: [
      {
        name: 'iconColor',
        type: 'color',
        value: '#999999',
        optionPath: 'toolbox.iconStyle.borderColor'
      },
      {
        name: 'iconEmphasisColor',
        type: 'color',
        value: '#666666',
        optionPath: 'toolbox.emphasis.iconStyle.borderColor'
      }
    ]
  },
  {
    groupName: 'tooltip',
    items: [
      {
        name: 'axisPointerColor',
        type: 'color',
        value: '#cccccc',
        optionPath: 'tooltip.axisPointer.lineStyle.color'
      },
      {
        name: 'axisPointerWidth',
        type: 'number',
        value: 1,
        optionPath: 'tooltip.axisPointer.lineStyle.width'
      }
    ]
  },
  {
    groupName: 'timeline',
    items: [
      {
        name: 'timelineItemColor',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.itemStyle.color'
      },
      {
        name: 'timelineItemBorderColor',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.itemStyle.borderColor'
      },
      {
        name: 'timelineItemBorderWidth',
        type: 'number',
        value: 1,
        optionPath: 'timeline.itemStyle.borderWidth'
      },
      {
        name: 'timelineItemEmphasisColor',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.emphasis.itemStyle.color'
      },
      {
        name: 'timelineItemEmphasisBorderColor',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.emphasis.itemStyle.borderColor'
      },
      {
        name: 'timelineItemEmphasisWidth',
        type: 'number',
        value: 1,
        optionPath: 'timeline.emphasis.itemStyle.borderWidth'
      },
      {
        name: 'timelineCheckpointColor',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.checkpointStyle.color'
      },
      {
        name: 'timelineCheckpointBorderColor',
        type: 'color',
        value: '#ffffff',
        optionPath: 'timeline.checkpointStyle.borderColor'
      },
      {
        name: 'timelineCheckpointBorderWidth',
        type: 'number',
        value: 1,
        optionPath: 'timeline.checkpointStyle.borderWidth'
      },
      {
        name: 'timelineProgessColor',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.progress.lineStyle.color'
      },
      {
        name: 'timelineProgessWidth',
        type: 'number',
        value: 2,
        optionPath: 'timeline.progress.lineStyle.width'
      },
      {
        name: 'timelineControlColor',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.controlStyle.color'
      },
      {
        name: 'timelineControlBorderColor',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.controlStyle.borderColor'
      },
      {
        name: 'timelineControlBorderWidth',
        type: 'number',
        value: 1,
        optionPath: 'timeline.controlStyle.borderWidth'
      },
      {
        name: 'timelineLabelColor',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.label.color'
      }
    ]
  },
  {
    groupName: 'lineCharts',
    items: [
      {
        name: 'lineSmooth',
        type: 'boolean',
        value: false,
        optionPath: 'line.smooth'
      },
      {
        name: 'lineWidth',
        type: 'number',
        value: 2,
        optionPath: 'line.lineStyle.width'
      },
      {
        name: 'borderColor',
        type: 'number',
        value: 0,
        optionPath: 'line.itemStyle.borderWidth'
      },
      {
        name: 'symbolSize',
        type: 'number',
        value: 4,
        optionPath: 'line.symbolSize'
      },
      {
        name: 'symbol',
        type: 'select',
        selectOptions: [
          {
            value: 'circle',
            name: 'circle'
          },
          {
            value: 'emptyCircle',
            name: 'emptyCircle'
          },
          {
            value: 'rect',
            name: 'rect'
          },
          {
            value: 'emptyRect',
            name: 'emptyRect'
          },
          {
            value: 'roundRect',
            name: 'roundRect'
          },
          {
            value: 'emptyRoundRect',
            name: 'emptyRoundRect'
          },
          {
            value: 'triangle',
            name: 'triangle'
          },
          {
            value: 'emptyTriangle',
            name: 'emptyTriangle'
          },
          {
            value: 'diamond',
            name: 'diamond'
          },
          {
            value: 'emptyDiamond',
            name: 'emptyDiamond'
          },
          {
            value: 'pin',
            name: 'pin'
          },
          {
            value: 'emptyPin',
            name: 'emptyPin'
          },
          {
            value: 'arrow',
            name: 'arrow'
          },
          {
            value: 'emptyArrow',
            name: 'emptyArrow'
          }
        ],
        value: 'emptyCircle',
        optionPath: 'line.symbol'
      }
    ]
  },
  {
    groupName: 'candlestick',
    items: [
      {
        name: 'candlestickColor',
        type: 'color',
        value: '#eb5454',
        optionPath: 'candlestick.itemStyle.color'
      },
      {
        name: 'candlestick0Color',
        type: 'color',
        value: '#47b262',
        optionPath: 'candlestick.itemStyle.color0'
      },
      {
        name: 'candlestickBorderColor',
        type: 'color',
        value: '#eb5454',
        optionPath: 'candlestick.itemStyle.borderColor'
      },
      {
        name: 'candlestick0BorderColor',
        type: 'color',
        value: '#47b262',
        optionPath: 'candlestick.itemStyle.borderColor0'
      },
      {
        name: 'candlestickBorderWidth',
        type: 'number',
        value: 1,
        optionPath: 'candlestick.itemStyle.borderWidth'
      }
    ]
  },
  {
    groupName: 'graph',
    items: [
      {
        name: 'graphLineColor',
        type: 'color',
        value: '#aaaaaa',
        optionPath: 'graph.lineStyle.color'
      },
      {
        name: 'graphLineWidth',
        type: 'number',
        value: 1,
        optionPath: 'graph.lineStyle.width'
      }
    ]
  }
];

export function getMergedConfigs(
  version1Config: object
): { configs: ThemeConfig[]; name: string } {
  const mergedConfigs: ThemeConfig[] = [];
  const nameMaps = {
    backgroundColor: 'backgroundColor',
    'title.textStyle.color': 'titleColor',
    'title.subtextStyle.color': 'subtitleColor',
    color: 'color',
    'visualMap.color': 'visualMapColor',
    'legend.textStyle.color': 'legendTextColor',
    'candlestick.itemStyle.color': 'kColor',
    'candlestick.itemStyle.color0': 'kColor0',
    'candlestick.itemStyle.borderColor': 'kBorderColor',
    'candlestick.itemStyle.borderColor0': 'kBorderColor0',
    'candlestick.itemStyle.borderWidth': 'kBorderWidth',
    'line.itemStyle.borderWidth': 'lineWidth',
    'line.symbolSize': 'symbolSize',
    'line.symbol': 'symbol',
    'line.smooth': 'lineSmooth',
    'graph.lineStyle.width': 'graphLineWidth',
    'graph.lineStyle.color': 'graphLineColor',
    'toolbox.iconStyle.borderColor': 'toolboxColor',
    'toolbox.emphasis.iconStyle.borderColor': 'toolboxEmphasisColor',
    'tooltip.axisPointer.lineStyle.color': 'tooltipAxisColor',
    'tooltip.axisPointer.lineStyle.width': 'tooltipAxisWidth',
    'timeline.lineStyle.color': 'timelineLineColor',
    'timeline.lineStyle.borderWidth': 'timelineLineWidth',
    'timeline.itemStyle.color': 'timelineItemColor',
    'timeline.emphasis.itemStyle.color': 'timelineItemColorE',
    'timeline.checkpointStyle.color': 'timelineCheckColor',
    'timeline.checkpointStyle.borderColor': 'timelineCheckBorderColor',
    'timeline.itemStyle.borderWidth': 'timelineItemBorderWidth',
    'timeline.controlStyle.color': 'timelineControlColor',
    'timeline.controlStyle.borderColor': 'timelineControlBorderColor',
    'timeline.controlStyle.borderWidth': 'timelineControlBorderWidth',
    'timeline.label.color': 'timelineLabelColor'
  };
  for (let i = 0; i < themeConfigs.length; i++) {
    const items = [];
    for (let j = 0; j < themeConfigs[i].items.length; j++) {
      const item = themeConfigs[i].items[j];
      const newItem = Object.assign({}, item);
      if (item.optionPath.startsWith('{axis}')) {
        const axisMap = {
          '{axis}.axisLine.lineStyle.color': 'axisLineColor',
          '{axis}.axisTick.lineStyle.color': 'axisTickColor',
          '{axis}.splitLine.lineStyle.color': 'splitLineColor',
          '{axis}.splitArea.areaStyle.color': 'splitAreaColor',
          '{axis}.axisLabel.color': 'axisLabelColor'
        };
        if (
          axisMap.hasOwnProperty(item.optionPath) &&
          // @ts-ignore
          version1Config.theme.axes.length > 0
        ) {
          newItem.value =
            // @ts-ignore
            version1Config.theme.axes[0][axisMap[item.optionPath]];
        }
      } else if (nameMaps.hasOwnProperty(item.optionPath)) {
        // @ts-ignore
        newItem.value = version1Config.theme[nameMaps[item.optionPath]];
      }
      items.push(newItem);
    }
    mergedConfigs.push({
      items,
      groupName: themeConfigs[i].groupName
    });
  }
  return {
    configs: mergedConfigs,
    name: (version1Config as any).themeName
  };
}
