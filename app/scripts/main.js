(function() {

var VERSION = 1; // needs to upgrade when vm.theme changes

var PRE_DEFINED_THEMES = [{
  name: 'vintage',
  background: '#fef8ef',
  theme: [
    '#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8',
    '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'
  ]
}, {
  name: 'dark',
  background: '#333',
  theme: [
    '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
    '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c',
    '#f49f42'
  ]
}, {
  name: 'westeros',
  background: 'transparent',
  theme: [
    '#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0',
    '#cbb0e3'
  ]
}, {
  name: 'essos',
  background: 'rgba(242,234,191,0.15)',
  theme: [
    '#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643',
    '#ebdba4'
  ]
}, {
  name: 'wonderland',
  background: 'transparent',
  theme: [
    '#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2',
    '#f2b3c9'
  ]
}, {
  name: 'walden',
  background: 'rgba(252,252,252,0)',
  theme: [
    '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad',
    '#96dee8'
  ]
}, {
  name: 'chalk',
  background: '#293441',
  theme: [
    '#fc97af', '#87f7cf', '#f7f494', '#72ccff', '#f7c5a0',
    '#d4a4eb', '#d2f5a6', '#76f2f2'
  ]
}, {
  name: 'infographic',
  background: 'transparent',
  theme: [
    '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
  ]
}, {
  name: 'macarons',
  background: 'transparent',
  theme: [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ]
}, {
  name: 'roma',
  background: 'transparent',
  theme: [
    '#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
    '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
    '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
    '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
  ]
}, {
  name: 'shine',
  background: 'transparent',
  theme: [
    '#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa',
    '#339ca8', '#cda819', '#32a487'
  ]
}, {
  name: 'purple-passion',
  background: 'rgba(91,92,110,1)',
  theme: [
    '#8a7ca8', '#e098c7', '#8fd3e8', '#71669e', '#cc70af',
    '#7cb4cc'
  ]
}
// {
//   name: 'halloween',
//   background: 'rgba(51,51,51,1)',
//   theme: [
//     '#ff715e', '#ffaf51', '#ffee51', '#797fba', '#715c87'
//   ]
// }
];

var defaultTheme = {
  seriesCnt: 3,

  backgroundColor: 'rgba(0, 0, 0, 0)',
  titleColor: '#464646',
  subtitleColor: '#6E7079',
  textColorShow: false,
  textColor: '#333',
  markTextColor: '#eee',
  color: [
    // '#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
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

  axes: (function() {
    var types = ['all', 'category', 'value', 'log', 'time'];
    var names = ['通用', '类目', '数值', '对数', '时间'];
    var axis = [];
    for (var i = 0; i < types.length; ++i) {
      axis.push({
        type: types[i],
        name: names[i] + '坐标轴',
        axisLineShow: types[i] !== 'value' && types[i] !== 'log', // TODO Auto
        axisLineColor: '#6E7079',
        axisTickShow: types[i] !== 'value' && types[i] !== 'log',
        axisTickColor: '#6E7079',
        axisLabelShow: true,
        axisLabelColor: '#6E7079',
        splitLineShow: types[i] !== 'category' && types[i] !== 'time',
        splitLineColor: ['#E0E6F1'],
        splitAreaShow: false,
        splitAreaColor: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
      });
    }
    return axis;
  })(),
  axisSeperateSetting: true,
  axis: null,

  toolboxColor: '#999',
  toolboxEmphasisColor: '#666',

  tooltipAxisColor: '#ccc',
  tooltipAxisWidth: 1,

  timelineLineColor: '#DAE1F5',
  timelineLineWidth: 2,
  timelineItemColor: '#A4B1D7',
  timelineItemColorE: '#FFF',
  timelineCheckColor: '#316bf3',
  timelineCheckBorderColor: 'fff',
  timelineItemBorderWidth: 1,
  timelineControlColor: '#A4B1D7',
  timelineControlBorderColor: '#A4B1D7',
  timelineControlBorderWidth: 1,
  timelineLabelColor: '#A4B1D7'

  // datazoomBackgroundColor: 'rgba(47,69,84,0)',
  // datazoomDataColor: 'rgba(47,69,84,0.3)',
  // datazoomFillColor: 'rgba(135,175,274,0.2)',
  // datazoomHandleColor: '#ACB8D1',
  // datazoomHandleWidth: '100',
  // datazoomLabelColor: '#333'
};
defaultTheme.axis = [defaultTheme.axes[0]];

var updateChartsDebounced = _.debounce(updateCharts, 200);



// load themes
for (var i = 0; i < PRE_DEFINED_THEMES.length; ++i) {
  loadTheme(i, true);
}



var vm = new Vue({
  el: '#content',

  data: {
    theme: cloneObject(defaultTheme),
    themeName: 'customed',
    charts: [],
    options: [],
    isPauseChartUpdating: false,
    copyKbd: isMac() ? 'cmd' : 'ctrl',
    downloadable: !isIe() && !isEdge(),
    preDefinedThemes: PRE_DEFINED_THEMES,
    loadedThemes: [],
    chartDisplay: {
      background: '#fff',
      title: '#000'
    }
  },

  methods: {
    updateCharts: updateCharts,

    updateSymbol: function(symbol) {
      vm.theme.symbol = symbol;
    },

    selectPreDefinedTheme: function(id) {
      for (var i = 0; i < vm.loadedThemes.length; ++i) {
        if (vm.loadedThemes[i].id === id) {
          // use cache
          onThemeImported(vm.loadedThemes[i].data);
          return;
        }
      }
      // no cache found
      loadTheme(id, false);
    },

    useTheme: function() {
      // _hmt.push(['_trackEvent', 'theme-builder', 'useTheme', vm.themeName]);
      $('#js-code').text(getExportJsFile());
      $('#json-code').text(JSON.stringify(getTheme(true), null, '    '));
      // code highlighting
      hljs.highlightBlock($('#js-code')[0]);
      hljs.highlightBlock($('#json-code')[0]);
    },

    downloadThemeJson: function() {
      // _hmt.push(['_trackEvent', 'theme-builder', 'download', 'json']);
      saveJsonFile(getTheme(true), (vm.themeName || 'customed') + '.json');
    },

    downloadThemeJs: function() {
      // _hmt.push(['_trackEvent', 'theme-builder', 'download', 'js']);
      saveJsFile(getExportJsFile(), (vm.themeName || 'customed') + '.js');
    },

    copyThemeJson: function() {
      copyToClipboard('json');
    },

    copyThemeJs: function() {
      copyToClipboard('js');
    },

    newTheme: function() {
      this.$set('theme', cloneObject(defaultTheme));
      this.$set('themeName', 'customed');
      vm.axisSeperateSettingChanges();
    },

    exportJson: function() {
      // delete replicated axis option, which is included in theme.axes
      var theme = cloneObject(vm.theme);
      delete theme.axis;
      saveJsonFile({
        version: VERSION,
        themeName: vm.themeName,
        theme: theme
      }, (vm.themeName || 'customed') + '.project.json');
    },

    importJson: function() {
      $('#input-file').trigger('click');
    },

    importFileChanged: function(e) {
      if (!e.target.files) {
        // cancelled selecting, do nothing
        return;
      }
      var file = e.target.files[0];

      var extension = file.name.slice(file.name.lastIndexOf('.'));
      if (extension !== '.json') {
        alert('非法后缀！请使用本网站导出的 *.json 文件。');
        return;
      }

      // read local file
      var reader = new FileReader();
      reader.onload = function() {
        // update theme
        onThemeImported(this.result);
      };
      reader.onerror = function(e) {
        alert('打开文件失败！');
        console.error(e);
      }
      reader.readAsText(file);

      $('#input-file').val('');
    },

    axisSeperateSettingChanges: function() {
      // change axis settings to display
      if (vm.theme.axisSeperateSetting) {
        vm.theme.axis = vm.theme.axes;
      } else {
        vm.theme.axis = [vm.theme.axes[0]];
      }
    }
  }
});

vm.$watch('theme', updateChartsDebounced, {
  deep: true
});

// init axis setting
vm.axisSeperateSettingChanges();

function onThemeImported(result) {
  try {
    var obj = JSON.parse(result);

    if (obj.themeName === undefined && obj.version === undefined) {
      alert('请使用本网站“导出配置”的 JSON 文件，而不是下载的主题文件。');
      return;
    }

    // theme name
    vm.$set('themeName', obj.themeName || 'customed');

    if (obj.version < VERSION) {
      // out-dated, use as much attribute as possible
      var unfound = [];
      var newTheme = obj.theme;
      for (var attr in defaultTheme) {
        if (attr !== 'axis') {
          if (typeof obj.theme[attr] !== 'undefined') {
            newTheme.attr = obj.theme[attr];
          } else {
            // unfound attribute in theme file, use default
            unfound.push(obj.theme.attr);
          }
        }
      }
      if (unfound.length > 0) {
        alert('导入的主题版本较低，有' + unfound.length + '个属性未被设置，现已使用默认值。');
      } else {
        console.warn('导入的主题版本较低，可能有部分属性未生效。');
      }
    }
    vm.$set('theme', obj.theme);

    // update axis according to if using seperate axes
    vm.axisSeperateSettingChanges();
  } catch(e) {
    alert('非法 JSON 格式！请使用本网站导出的 *.json 文件。');
    console.error(e);
  }
}

function getTheme(isToExport) {
  var pumpkin = 'path://M237.062,81.761L237.062,81.761c-12.144-14.24-25.701-20.1-40.68-19.072 c-10.843,0.747-20.938,5.154-30.257,13.127c-9.51-5.843-19.8-9.227-30.859-10.366c0.521-3.197,1.46-6.306,2.85-9.363 c3.458-7.038,8.907-12.741,16.331-17.296c-5.609-3.384-11.227-6.799-16.854-10.279c-16.257,8.104-25.06,20.601-26.463,38.417 c-7.599,1.705-14.685,4.486-21.247,8.437c-9.164-7.677-18.996-11.917-29.496-12.632c-14.819-0.998-28.467,4.787-40.938,18.827 C6.445,96.182,0,114.867,0,136.242c-0.007,6.371,0.674,12.646,2.053,18.738c4.593,22.785,15.398,41.367,32.558,55.344 c15.43,12.773,29.901,18.023,43.362,16.981c7.074-0.561,13.624-3.977,19.685-10.192c10.534,5.49,20.391,8.217,29.561,8.203 c9.856-0.012,20.236-2.953,31.125-8.898c6.227,6.692,12.966,10.346,20.211,10.933c13.795,1.073,28.614-4.111,44.377-16.84 c17.49-14.104,28.043-32.79,31.796-55.485c0.836-5.624,1.272-11.292,1.272-16.966C255.998,115.814,249.707,96.601,237.062,81.761z  M54.795,97.7l40.661,14.496c-4.402,8.811-10.766,13.219-19.06,13.219c-2.542,0-4.917-0.419-7.122-1.274 C58.103,118.38,53.263,109.572,54.795,97.7z M150.613,185.396l-9.156-8.389l-7.619,12.951c-3.391,0.341-6.615,0.514-9.665,0.514 c-4.401,0-8.635-0.263-12.708-0.777l-8.634-14.973l-9.151,9.909c-4.91-2.717-9.15-5.856-12.708-9.413 c-8.81-8.295-13.384-17.959-13.727-28.97c2.877,1.692,7.427,3.461,13.675,5.308l10.636,13.629l9.44-9.852 c4.734,0.702,9.234,1.12,13.466,1.275l10.689,11.498l9.671-11.949c3.559-0.173,7.285-0.515,11.182-1.01l9.924,10.159l10.933-14.227 c5.931-1.351,11.196-2.798,15.771-4.323C179.747,163.538,169.068,176.414,150.613,185.396z M175.258,124.907 c-2.209,0.849-4.66,1.273-7.369,1.273c-8.134,0-14.489-4.415-19.052-13.224l40.905-14.477 C191.105,110.331,186.273,119.141,175.258,124.907z';
  var seriesStyle = {
    itemStyle: {
      borderWidth: vm.theme.symbolBorderWidth
    },
    lineStyle: {
      width: vm.theme.lineWidth
    },
    symbolSize: vm.theme.symbolSize,
    symbol: vm.theme.symbol,
    smooth: vm.theme.lineSmooth
  };
  var itemStyle = {
    borderWidth: vm.theme.borderWidth,
    borderColor: vm.theme.borderColor
  };
  var border = {
    itemStyle: itemStyle
  };
  if (vm.themeName === 'halloween') {
    seriesStyle.symbol = pumpkin;
    border.symbol = pumpkin;
  }

  var map = {
    itemStyle: {
      areaColor: vm.theme.mapAreaColor,
      borderColor: vm.theme.mapBorderColor,
      borderWidth: vm.theme.mapBorderWidth
    },
    label: {
      color: vm.theme.mapLabelColor
    },
    emphasis: {
      itemStyle: {
        areaColor: vm.theme.mapAreaColorE,
        borderColor: vm.theme.mapBorderColorE,
        borderWidth: vm.theme.mapBorderWidthE
      },
      label: {
        color: vm.theme.mapLabelColorE
      }
    }
  };

  return {
    color: vm.theme.color,
    backgroundColor: isToExport ? vm.theme.backgroundColor : 'transparent',
    textStyle: vm.theme.textColorShow ? {
      color: vm.theme.textColor
    } : {},
    title: {
      textStyle: {
        color: vm.theme.titleColor
      },
      subtextStyle: {
        color: vm.theme.subtitleColor
      }
    },
    line: seriesStyle,
    radar: seriesStyle,
    bar: (function() {
      var itemStyle = {
        barBorderWidth: vm.theme.borderWidth,
        barBorderColor: vm.theme.borderColor
      };
      return {
        itemStyle: itemStyle
      };
    })(),
    pie: border,
    scatter: border,
    boxplot: border,
    parallel: border,
    sankey: border,
    funnel: border,
    gauge: border,
    candlestick: (function() {
      var itemStyle = {
        color: vm.theme.kColor,
        color0: vm.theme.kColor0,
        borderColor: vm.theme.kBorderColor,
        borderColor0: vm.theme.kBorderColor0,
        borderWidth: vm.theme.kBorderWidth
      };
      return  {
        itemStyle: itemStyle
      };
    })(),
    graph: (function() {
      var style = cloneObject(seriesStyle);
      style.color = vm.theme.color;
      var lineStyle = {
        width: vm.theme.graphLineWidth,
        color: vm.theme.graphLineColor
      };
      var textStyle = {
        color: vm.theme.markTextColor
      };
      style.lineStyle = lineStyle;
      style.label = textStyle;
      var itemStyle = style.itemStyle;
      itemStyle.borderWidth = vm.theme.borderWidth;
      itemStyle.borderColor = vm.theme.borderColor;
      return style;
    })(),
    map: map,
    geo: map,
    categoryAxis: getAxis(1),
    valueAxis: getAxis(2),
    logAxis: getAxis(3),
    timeAxis: getAxis(4),
    toolbox: {
      iconStyle: {
        borderColor: vm.theme.toolboxColor
      },
      emphasis: {
        iconStyle: {
          borderColor: vm.theme.toolboxEmphasisColor
        }
      }
    },
    legend: {
      textStyle: {
        color: vm.theme.legendTextColor
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: vm.theme.tooltipAxisColor,
          width: vm.theme.tooltipAxisWidth
        },
        crossStyle: {
          color: vm.theme.tooltipAxisColor,
          width: vm.theme.tooltipAxisWidth
        }
      }
    },
    timeline: {
      lineStyle: {
        color: vm.theme.timelineLineColor,
        width: vm.theme.timelineLineWidth
      },
      itemStyle: {
        color: vm.theme.timelineItemColor,
        borderWidth: vm.theme.timelineItemBorderWidth
      },
      controlStyle: {
        color: vm.theme.timelineControlColor,
        borderColor: vm.theme.timelineControlBorderColor,
        borderWidth: vm.theme.timelineControlBorderWidth
      },
      checkpointStyle: {
        color: vm.theme.timelineCheckColor,
        borderColor: vm.theme.timelineCheckBorderColor
      },
      label: {
        color: vm.theme.timelineLabelColor
      },
      emphasis: {
        itemStyle: {
          color: vm.theme.timelineItemColorE
        },
        controlStyle: {
          color: vm.theme.timelineControlColor,
          borderColor: vm.theme.timelineControlBorderColor,
          borderWidth: vm.theme.timelineControlBorderWidth
        },
        label: {
          color: vm.theme.timelineLabelColor
        }
      }
    },
    visualMap: {
      color: vm.theme.visualMapColor
    },
    dataZoom: {
      backgroundColor: vm.theme.datazoomBackgroundColor,
      dataBackgroundColor: vm.theme.datazoomDataColor,
      fillerColor: vm.theme.datazoomFillColor,
      handleColor: vm.theme.datazoomHandleColor,
      handleSize: vm.theme.datazoomHandleWidth + '%',
      textStyle: {
        color: vm.theme.datazoomLabelColor
      }
    },
    markPoint: (function() {
      var textStyle = {
        color: vm.theme.markTextColor
      };
      return {
        label: textStyle,
        emphasis: {
          label: textStyle
        }
      };
    })()
  };

  function getAxis(id) {
    if (!vm.theme.axisSeperateSetting) {
      id = 0;
    }
    return {
      axisLine: {
        show: vm.theme.axes[id].axisLineShow,
        lineStyle: {
          color: vm.theme.axes[id].axisLineColor
        }
      },
      axisTick: {
        show: vm.theme.axes[id].axisTickShow,
        lineStyle: {
          color: vm.theme.axes[id].axisTickColor
        }
      },
      axisLabel: {
        show: vm.theme.axes[id].axisLabelShow,
        color: vm.theme.axes[id].axisLabelColor
      },
      splitLine: {
        show: vm.theme.axes[id].splitLineShow,
        lineStyle: {
          color: vm.theme.axes[id].splitLineColor
        }
      },
      splitArea: {
        show: vm.theme.axes[id].splitAreaShow,
        areaStyle: {
          color: vm.theme.axes[id].splitAreaColor
        }
      }
    };
  }
}

var timeout;
// update a chart with index of idx, options as echarts options,
// and rootIdx as index of the starting chart
function updatingStep(idx, options, rootIdx) {
  var $panel = $('.ec-panel').eq(idx);
  if ($panel.length) {
    var chart = echarts.getInstanceByDom($panel[0]);
    if (chart) {
      chart.dispose();
    }
    chart = echarts.init($panel[0], 'customed');
    chart.setOption(options[idx]);

    // next chart is the chart after this one,
    // or from begining
    var next = idx + 1;
    if (next === $('.ec-panel').length) {
      next = 0;
    }
    // loop until the first updated chart
    if (next !== rootIdx) {
      timeout = setTimeout(function () {
        updatingStep(next, options, rootIdx);
      }, 150);
    }
  }
}

function updateCharts() {
  if (vm.isPauseChartUpdating) {
    // do nothing when paused
    return;
  }

  echarts.registerTheme('customed', getTheme(false));
  var options = getOptions(vm);

  if (timeout) {
    clearTimeout(timeout);
  }

  // update from the first visible chart
  var max = $('.ec-panel').length;
  var hasUpdated = false;
  for (var i = 0; i < max; ++i) {
    var $chart = $('.ec-panel').eq(i);
    if ($chart.offset().top + $chart.height() > 0) {
      // start from here
      updatingStep(i, options, i);
      hasUpdated = true;
      break;
    }
  }
  if (!hasUpdated) {
    // fallback
    // start from 0 if something wrong happened and no one found visible
    updatingStep(0, options);
  }

  // update background and title
  vm.chartDisplay.background = vm.theme.backgroundColor;
  vm.chartDisplay.title = vm.theme.titleColor;
}

function saveJsonFile(json, name) {
  var data = JSON.stringify(json, null, '    ');
  saveFile(data, name, 'json');
}

function saveJsFile(data, name) {
  saveFile(data, name, 'js');
}

function saveFile(data, name, type) {
  if (isSafari()) {
    window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  } else {
    try {
      var file = new Blob([data], {type: type});
      saveAs(file, name);
    } catch(e) {
      console.error(e);
      window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    }
  }
}

function isSafari() {
  return navigator.userAgent.indexOf('Safari') > 0 &&
    navigator.userAgent.indexOf('Chrome') < 0;
}

function isIe() {
  return navigator.userAgent.indexOf('MSIE') > 0;
}

function isEdge() {
  return navigator.userAgent.indexOf('Trident') > 0;
}

function isMac() {
  return navigator.userAgent.indexOf('Mac OS X') > 0;
}

function getExportJsFile() {
  // format theme with 4 spaces
  var theme = JSON.stringify(getTheme(true), null, '    ');
  // indent with 4 spaces
  theme = theme.split('\n').join('\n    ');
  return '(function (root, factory) {\n' +
    '    if (typeof define === \'function\' && define.amd) {\n' +
    '        // AMD. Register as an anonymous module.\n' +
    '        define([\'exports\', \'echarts\'], factory);\n' +
    '    } else if (typeof exports === \'object\' && typeof ' +
    'exports.nodeName !== \'string\') {\n' +
    '        // CommonJS\n' +
    '        factory(exports, require(\'echarts\'));\n' +
    '    } else {\n' +
    '        // Browser globals\n' +
    '        factory({}, root.echarts);\n' +
    '    }\n' +
    '}(this, function (exports, echarts) {\n' +
    '    var log = function (msg) {\n' +
    '        if (typeof console !== \'undefined\') {\n' +
    '            console && console.error && console.error(msg);\n' +
    '        }\n' +
    '    };\n' +
    '    if (!echarts) {\n' +
    '        log(\'ECharts is not Loaded\');\n' +
    '        return;\n' +
    '    }\n' +
    '    echarts.registerTheme(\'' + vm.themeName + '\', ' + theme + ');\n' +
    '}));\n';
}

function copyToClipboard(jsOrJson) {
  // select code
  // IE has both window.getSelection and document.selection, but works only
  // with the former one
  if (window.getSelection) {
    var range = document.createRange();
    range.selectNode($('#' + jsOrJson + '-code')[0]);
    var select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
  } else if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText($('#' + jsOrJson + '-code')[0]);
    range.select();
  }

  // hide previous information
  $('.code-btn label').hide();

  // copy to clipboard
  // ie and edge neigher can copy
  if (!isIe() && !isEdge() && document.execCommand('copy')) {
    // copy successfully
    showAndHide('copy-' + jsOrJson + '-success');
    // deselect code
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      document.selection.empty();
    }
  } else {
    // fail to copy, tell user to copy using ctrl+s or cmd+s
    showAndHide('copy-' + jsOrJson + '-fail');
  }

  function showAndHide(id) {
    $('#' + id).fadeIn();
    setTimeout(function() {
      $('#' + id).fadeOut();
    }, 10000);
  }
}

function cloneObject(obj) {
  return $.extend(true, {}, obj);
}

function loadTheme(id, preload) {
  $.ajax({
    url: './theme-builder/themes/' + PRE_DEFINED_THEMES[id].name + '.json',
    dataType: 'text',
    success: function(data) {
      vm.loadedThemes.push({
        id: id,
        data: data
      });
      if (!preload) {
        onThemeImported(data);
      }
    }
  });
}

})();
