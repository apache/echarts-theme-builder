var VERSION = 1; // needs to upgrade when vm.theme changes

var defaultTheme = {
  seriesCnt: 3,

  backgroundColor: 'transparent',
  titleColor: '#333',
  subtitleColor: '#aaa',
  textColorShow: false,
  textColor: '#333',
  markTextColor: '#eee',
  color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',
    '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
  borderColor: '#ccc',
  borderWidth: 0,
  visualMapColor: ['#bf444c', '#d88273', '#f6efa6'],

  kColor: '#c23531',
  kColor0: '#314656',
  kBorderColor: '#c23531',
  kBorderColor0: '#314656',

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
        axisLineShow: true,
        axisLineColor: '#333',
        axisTickShow: true,
        axisTickColor: '#333',
        axisLabelShow: true,
        axisLabelColor: '#333',
        splitLineShow: types[i] === 'category' ? false : true,
        splitLineColor: ['#ccc'],
        splitAreaShow: false,
        splitAreaColor: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
      });
    }
    return axis;
  })(),
  axisAll: null,
  axisSeperateSetting: true,
  axis: null,

  toolboxColor: '#999',
  toolboxEmpasisColor: '#666',

  tooltipAxisColor: '#ccc',
  tooltipAxisWidth: 1,

  timelineLineColor: '#293c55',
  timelineLineWidth: 1,
  timelineItemColor: '#293c55',
  timelineItemColorE: '#a9334c',
  timelineCheckColor: '#e43c59',
  timelineCheckBorderColor: 'rgba(194,53,49, 0.5)',
  timelineItemBorderWidth: 1,
  timelineControlColor: '#293c55',
  timelineControlBorderColor: '#293c55',
  timelineControlBorderWidth: 0.5,
  timelineLabelColor: '#293c55',

  datazoomBackgroundColor: '#fff',
  datazoomDataColor: '#ccc',
  datazoomFillColor: 'rgba(194,53,49, 0.1)',
  datazoomHandleColor: '#bbb',
  datazoomHandleWidth: '100',
  datazoomLabelColor: '#999'
};
defaultTheme.axis = [defaultTheme.axes[0]];


var updateChartsDebounced = _.debounce(updateCharts, 1000);

var vm = new Vue({
  el: '#content',

  data: {
    theme: defaultTheme,
    themeName: 'customed',
    charts: [],
    options: [],
    isPauseChartUpdating: false,
    copyKbd: isMac() ? 'cmd' : 'ctrl',
    downloadable: !isIe()
  },

  methods: {
    updateCharts: updateCharts,

    updateSymbol: function(symbol) {
      vm.theme.symbol = symbol;
      updateCharts();
    },

    useTheme: function() {
      $('#js-code').text(getExportJsFile());
      $('#json-code').text(JSON.stringify(getTheme(), null, '    '));
      // code highlighting
      hljs.highlightBlock($('#js-code')[0]);
      hljs.highlightBlock($('#json-code')[0]);
    },

    downloadThemeJson: function() {
      saveJsonFile(getTheme(), (vm.themeName || 'customed') + '.json');
    },

    downloadThemeJs: function() {
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
      updateCharts();
    },

    exportJson: function() {
      saveJsonFile({
        version: VERSION,
        themeName: this.themeName,
        theme: this.theme
      }, (vm.themeName || 'customed') + '.json');
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

      var that = this;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var obj = JSON.parse(this.result);

          // theme name
          that.$set('themeName', obj.themeName || 'customed');

          if (obj.version < VERSION) {
            // out-dated, use as much attribute as possible
            var unfound = [];
            var newTheme = cloneObject(defaultTheme);
            for (var attr in defaultTheme) {
              if (typeof obj.theme[attr] !== 'undefined') {
                newTheme.attr = obj.theme[attr];
              } else {
                // unfound attribute in theme file, use default
                unfound.push(obj.theme.attr);
              }
            }
            if (unfound.length > 0) {
              alert('导入的主题版本较低，有' + unfound.length + '个属性未被设置，现已使用默认值。');
            } else {
              console.warn('导入的主题版本较低，可能有部分属性未生效。');
            }
          }
          that.$set('theme', obj.theme);

          setTimeout(function() {
            updateCharts();
          });
        } catch(e) {
          alert('非法 JSON 格式！请使用本网站导出的 *.json 文件。');
          console.error(e);
        }
      }
      reader.readAsText(file);
    },

    axisSeperateSettingChanges: function() {
      // change axis settings to display
      if (vm.theme.axisSeperateSetting) {
        vm.theme.axis = vm.theme.axes;
      } else {
        vm.theme.axis = [vm.theme.axes[0]];
      }

      updateCharts();
    }
  }
});

vm.$watch('theme', updateChartsDebounced, {
  deep: true
});

// init axis setting
vm.axisSeperateSettingChanges();


function getTheme() {
  var seriesStyle = {
    itemStyle: {
      normal: {
        borderWidth: vm.theme.symbolBorderWidth
      }
    },
    lineStyle: {
      normal: {
        width: vm.theme.lineWidth
      }
    },
    symbolSize: vm.theme.symbolSize,
    symbol: vm.theme.symbol,
    smooth: vm.theme.lineSmooth
  };
  var border = {
    itemStyle: {
      normal: {
        borderWidth: vm.theme.borderWidth,
        borderColor: vm.theme.borderColor
      }
    }
  };

  var map = {
    itemStyle: {
      normal: {
        areaColor: vm.theme.mapAreaColor,
        borderColor: vm.theme.mapBorderColor,
        borderWidth: vm.theme.mapBorderWidth
      },
      emphasis: {
        areaColor: vm.theme.mapAreaColorE,
        borderColor: vm.theme.mapBorderColorE,
        borderWidth: vm.theme.mapBorderWidthE
      }
    },
    label: {
      normal: {
        textStyle: {
          color: vm.theme.mapLabelColor
        }
      },
      emphasis: {
        textStyle: {
          color: vm.theme.mapLabelColorE
        }
      }
    }
  };

  return {
    color: vm.theme.color,
    backgroundColor: vm.theme.backgroundColor,
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
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: vm.theme.borderWidth,
          barBorderColor: vm.theme.borderColor
        }
      }
    },
    pie: border,
    scatter: border,
    boxplot: border,
    parallel: border,
    sankey: border,
    funnel: border,
    gauge: border,
    candlestick: {
      itemStyle: {
        normal: {
          color: vm.theme.kColor,
          color0: vm.theme.kColor0,
          borderColor: vm.theme.kBorderColor,
          borderColor0: vm.theme.kBorderColor0,
          borderWidth: vm.theme.kBorderWidth
        }
      }
    },
    graph: (function() {
      var style = cloneObject(seriesStyle);
      style.color = vm.theme.color;
      style.lineStyle = {
        normal: {
          width: vm.theme.graphLineWidth,
          color: vm.theme.graphLineColor
        }
      };
      style.label = {
        normal: {
          textStyle: {
            color: vm.theme.markTextColor
          }
        }
      };
      style.itemStyle.normal.borderWidth = vm.theme.borderWidth;
      style.itemStyle.normal.borderColor = vm.theme.borderColor;
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
        normal: {
          borderColor: vm.theme.toolboxColor
        },
        emphasis: {
          borderColor: vm.theme.toolboxEmpasisColor
        }
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
        normal: {
          color: vm.theme.timelineItemColor,
          borderWidth: vm.theme.timelineItemBorderWidth
        },
        emphasis: {
          color: vm.theme.timelineItemColorE
        }
      },
      controlStyle: {
        normal: {
          color: vm.theme.timelineControlColor,
          borderColor: vm.theme.timelineControlBorderColor,
          borderWidth: vm.theme.timelineControlBorderWidth
        }
      },
      checkpointStyle: {
        color: vm.theme.timelineCheckColor,
        borderColor: vm.theme.timelineCheckBorderColor
      },
      label: {
        normal: {
          textStyle: {
            color: vm.theme.timelineLabelColor
          }
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
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: vm.theme.markTextColor
          }
        },
        emphasis: {
          textStyle: {
            color: vm.theme.markTextColor
          }
        }
      }
    }
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
        textStyle: {
          color: vm.theme.axes[id].axisLabelColor
        }
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

var lastUpdate = null;
function updateCharts(isForceUpdate) {
  if (vm.isPauseChartUpdating) {
    // do nothing when paused
    return;
  }
  var now = new Date();
  if (isForceUpdate || now - lastUpdate > 500) {
    setTimeout(function() {
      echarts.registerTheme('customed', getTheme());
      var options = getOptions(vm);
      // re-draw charts
      $('.ec-panel').each(function(i) {
        var chart = echarts.init(this, 'customed');
        chart.setOption(options[i]);
      });
    });
    lastUpdate = now;
  } else {
    console.warn('Ignored too frequent refresh.');
  }
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
  return navigator.userAgent.indexOf('MSIE') > 0 ||
    navigator.userAgent.indexOf('Trident') > 0;
}

function isMac() {
  return navigator.userAgent.indexOf('Mac OS X') > 0;
}

function getExportJsFile() {
  // format theme with 4 spaces
  var theme = JSON.stringify(getTheme(), null, '    ');
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
  if (document.execCommand('copy')) {
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
