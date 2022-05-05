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
    groupName: '基本配置',
    items: [
      {
        name: '背景色',
        type: 'color',
        value: 'rgba(0, 0, 0, 0)',
        optionPath: 'backgroundColor'
      },
      {
        name: '标题色',
        type: 'color',
        value: '#464646',
        optionPath: 'title.textStyle.color'
      },
      {
        name: '副标题色',
        type: 'color',
        value: '#6e7079',
        optionPath: 'title.subtextStyle.color'
      },
      {
        name: '主题调色板',
        type: 'color',
        multipleColor: true,
        value: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
        optionPath: 'color'
      }
    ]
  },
  {
    groupName: '视觉映射',
    items: [
      {
        name: '视觉映射',
        type: 'color',
        multipleColor: true,
        value: ['#bf444c', '#d88273', '#f6efa6'],
        optionPath: 'visualMap.color'
      }
    ]
  },
  {
    groupName: '坐标轴',
    items: [
      {
        name: '轴线',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisLine.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: '刻度线',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisTick.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: '网格',
        type: 'color',
        multipleColor: true,
        value: ['#e0e6f1'],
        optionPath: '{axis}.splitLine.lineStyle.color',
        isShow: true,
        showOptionPath: -3
      },
      {
        name: '填充',
        type: 'color',
        multipleColor: true,
        value: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
        optionPath: '{axis}.splitArea.areaStyle.color',
        isShow: false,
        showOptionPath: -3
      },
      {
        name: '标签文字',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisLabel.color',
        isShow: true,
        showOptionPath: -2
      }
    ]
  },
  {
    groupName: '图例',
    items: [
      {
        name: '文字',
        type: 'color',
        value: '#333333',
        optionPath: 'legend.textStyle.color'
      }
    ]
  },
  {
    groupName: '工具箱',
    items: [
      {
        name: '图标',
        type: 'color',
        value: '#999999',
        optionPath: 'toolbox.iconStyle.borderColor'
      },
      {
        name: '悬停',
        type: 'color',
        value: '#666666',
        optionPath: 'toolbox.emphasis.iconStyle.borderColor'
      }
    ]
  },
  {
    groupName: '提示框',
    items: [
      {
        name: '指示线',
        type: 'color',
        value: '#cccccc',
        optionPath: 'tooltip.axisPointer.lineStyle.color'
      },
      {
        name: '宽度',
        type: 'number',
        value: 1,
        optionPath: 'tooltip.axisPointer.lineStyle.width'
      }
    ]
  },
  {
    groupName: '时间轴',
    items: [
      {
        name: '标记',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.itemStyle.color'
      },
      {
        name: '标记描边',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.itemStyle.borderColor'
      },
      {
        name: '标记描边宽度',
        type: 'number',
        value: 1,
        optionPath: 'timeline.itemStyle.borderWidth'
      },
      {
        name: '标记悬停',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.emphasis.itemStyle.color'
      },
      {
        name: '标记悬停描边',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.emphasis.itemStyle.borderColor'
      },
      {
        name: '标记悬停描边宽度',
        type: 'number',
        value: 1,
        optionPath: 'timeline.emphasis.itemStyle.borderWidth'
      },
      {
        name: '标记选中',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.checkpointStyle.color'
      },
      {
        name: '标记选中描边',
        type: 'color',
        value: '#ffffff',
        optionPath: 'timeline.checkpointStyle.borderColor'
      },
      {
        name: '标记选中描边宽度',
        type: 'number',
        value: 1,
        optionPath: 'timeline.checkpointStyle.borderWidth'
      },
      {
        name: '主轴',
        type: 'color',
        value: '#316bf3',
        optionPath: 'timeline.progress.lineStyle.color'
      },
      {
        name: '主轴宽度',
        type: 'number',
        value: 2,
        optionPath: 'timeline.progress.lineStyle.width'
      },
      {
        name: '控件填充',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.controlStyle.color'
      },
      {
        name: '控件描边',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.controlStyle.borderColor'
      },
      {
        name: '控件描边宽度',
        type: 'number',
        value: 1,
        optionPath: 'timeline.controlStyle.borderWidth'
      },
      {
        name: '文字',
        type: 'color',
        value: '#a4b1d7',
        optionPath: 'timeline.label.color'
      }
    ]
  },
  {
    groupName: '折线图',
    items: [
      {
        name: '平滑曲线',
        type: 'boolean',
        value: false,
        optionPath: 'line.smooth'
      },
      {
        name: '线条宽度',
        type: 'number',
        value: 2,
        optionPath: 'line.lineStyle.width'
      },
      {
        name: '图形描边',
        type: 'number',
        value: 0,
        optionPath: 'line.itemStyle.borderWidth'
      },
      {
        name: '图形大小',
        type: 'number',
        value: 4,
        optionPath: 'line.symbolSize'
      },
      {
        name: '图形形状',
        type: 'select',
        selectOptions: [
          {
            value: 'circle',
            name: '圆形'
          },
          {
            value: 'emptyCircle',
            name: '空心圆形'
          },
          {
            value: 'rect',
            name: '矩形'
          },
          {
            value: 'emptyRect',
            name: '空心矩形'
          },
          {
            value: 'roundRect',
            name: '圆角矩形'
          },
          {
            value: 'emptyRoundRect',
            name: '空心圆角矩形'
          },
          {
            value: 'triangle',
            name: '三角形'
          },
          {
            value: 'emptyTriangle',
            name: '空心三角形'
          },
          {
            value: 'diamond',
            name: '菱形'
          },
          {
            value: 'emptyDiamond',
            name: '空心菱形'
          },
          {
            value: 'pin',
            name: '水滴'
          },
          {
            value: 'emptyPin',
            name: '空心水滴'
          },
          {
            value: 'arrow',
            name: '箭头'
          },
          {
            value: 'emptyArrow',
            name: '空心箭头'
          }
        ],
        value: 'emptyCircle',
        optionPath: 'line.symbol'
      }
    ]
  },
  {
    groupName: 'K 线图',
    items: [
      {
        name: '阳线填充',
        type: 'color',
        value: '#eb5454',
        optionPath: 'candlestick.itemStyle.color'
      },
      {
        name: '阴线填充',
        type: 'color',
        value: '#47b262',
        optionPath: 'candlestick.itemStyle.color0'
      },
      {
        name: '阳线描边',
        type: 'color',
        value: '#eb5454',
        optionPath: 'candlestick.itemStyle.borderColor'
      },
      {
        name: '阴线描边',
        type: 'color',
        value: '#47b262',
        optionPath: 'candlestick.itemStyle.borderColor0'
      },
      {
        name: '描边宽度',
        type: 'number',
        value: 1,
        optionPath: 'candlestick.itemStyle.borderWidth'
      }
    ]
  },
  {
    groupName: '力导图',
    items: [
      {
        name: '连线',
        type: 'color',
        value: '#aaaaaa',
        optionPath: 'graph.lineStyle.color'
      },
      {
        name: '连线宽度',
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
