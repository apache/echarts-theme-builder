export type ThemeConfigItem = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color';
  value: string | number | boolean | string[];
  optionPath: string;
  multipleColor?: boolean;
  isShow?: boolean;
  showOptionPath?: string;
};

export type ThemeConfig = {
  groupName: string;
  items: ThemeConfigItem[];
};

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
        showOptionPath: 'axis.axisLine.show'
      },
      {
        name: '刻度线',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisTick.lineStyle.color',
        isShow: true,
        showOptionPath: 'axis.axisTick.show'
      },
      {
        name: '网格',
        type: 'color',
        multipleColor: true,
        value: ['#e0e6f1'],
        optionPath: '{axis}.splitLine.lineStyle.color',
        isShow: true,
        showOptionPath: '{axis}.splitLine.show'
      },
      {
        name: '填充',
        type: 'color',
        multipleColor: true,
        value: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
        optionPath: '{axis}.splitArea.areaStyle.color',
        isShow: false,
        showOptionPath: '{axis}.splitArea.show'
      },
      {
        name: '标签文字',
        type: 'color',
        value: '#6e7079',
        optionPath: '{axis}.axisLabel.color',
        isShow: true,
        showOptionPath: '{axis}.axisLabel.show'
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
        optionPath: 'toolbox.iconStyle.color'
      },
      {
        name: '悬停',
        type: 'color',
        value: '#666666',
        optionPath: 'toolbox.emphasis.iconStyle.color'
      }
    ]
  }
];