var defaultTheme = {
  seriesCnt: 3,

  backgroundColor: '#fff',
  titleColor: '#333',
  subtitleColor: '#666',
  textColor: '#999',
  markTextColor: '#eee',
  color: ['#293c55', '#a9334c', '#3095c6'],
  visualMapColor: ['#a9334c', '#fed'],
  visualMapUseTheme: false,

  kColor: '#e43c59',
  kColor0: '#fff',
  kBorderColor: '#a9334c',
  kBorderColor0: '#3095c6',
  kBorderWidth: 1,

  lineWidth: 2,
  symbolSize: 8,
  lineSmooth: false,

  graphLineWidth: 1,
  graphLineColor: '#aaa',

  mapLabelColor: '#333',
  mapLabelColorE: '#333',
  mapBorderColor: '#999',
  mapBorderColorE: '#666',
  mapBorderWidth: 1,
  mapBorderWidthE: 1,
  mapAreaColor: '#ececec',
  mapAreaColorE: '#ddd',

  axes: (function() {
    var types = ['all', 'category', 'value', 'log', 'time'];
    var names = ['通用', '类目', '数值', '对数', '时间'];
    var axis = [];
    for (var i = 0; i < types.length; ++i) {
      axis.push({
        type: types[i],
        name: names[i] + '坐标轴',
        axisLineShow: true,
        axisLineColor: '#ddd',
        axisTickShow: false,
        axisTickColor: '#666',
        axisLabelShow: true,
        axisLabelColor: '#999',
        splitLineShow: true,
        splitLineColor: '#efefef',
        splitAreaShow: false,
        splitAreaColor: '#fff'
      });
    }
    return axis;
  })(),
  axisAll: null,
  axisSeperateSetting: false,
  axis: null,

  toolboxShow: false,
  toolboxColor: '#999',
  toolboxEmpasisColor: '#666',

  tooltipShow: true,
  tooltipAxisColor: '#ccc',
  tooltipAxisWidth: 1
};
defaultTheme.axis = [defaultTheme.axes[0]];



var vm = new Vue({
  el: '#content',

  data: {
    theme: cloneObject(defaultTheme),
    charts: [],
    options: []
  },

  methods: {
    addThemeColor: function() {
      this.theme.color.push('#ccc');
      this.theme.seriesCnt = this.theme.color.length;
      initColorPicker();
      updateCharts();
    },

    removeThemeColor: function() {
      // remove the last theme color
      this.theme.color.splice(-1, 1);
      this.theme.seriesCnt = this.theme.color.length;
      updateCharts();
    },

    addVisualMapColor: function() {
      this.theme.visualMapColor.push('#ccc');
      initColorPicker();
      updateCharts();
    },

    removeVisualMapColor: function() {
      // remove the last theme color
      this.theme.visualMapColor.splice(-1, 1);
      updateCharts();
    },

    updateCharts: updateCharts,

    exportJson: function() {
      saveJsonFile(this.theme, 'theme.etb');
    },

    useTheme: function() {
      saveJsonFile(getTheme(), 'theme.json');
    },

    newTheme: function() {
      this.$set('theme', cloneObject(defaultTheme));
      initColorPicker();
      updateCharts();
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
      if (extension !== '.etb') {
        alert('非法后缀！请使用本网站导出的 *.etb 文件。');
        return;
      }

      var that = this;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var obj = JSON.parse(this.result);
          that.$set('theme', obj);
          setTimeout(function() {
            initColorPicker();
            updateCharts();
          });
        } catch(e) {
          alert('非法 JSON 格式！请使用本网站导出的 *.etb 文件。');
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

      initColorPicker();
      updateCharts();
    },

    seriesCntChanges: function() {
      updateCharts();
    }
  }
});

// init axis setting
vm.axisSeperateSettingChanges();



$(document).ready(function() {
  initColorPicker();
  // init charts
  updateCharts();
});



function initColorPicker() {
  setTimeout(function() {
    // prevent from calling onchange recursively
    var isRootEvent = true;
    $('.colorpicker-component').colorpicker()
      .on('changeColor', function(e) {
        if (isRootEvent) {
          isRootEvent = false;
          $(e.currentTarget).children('input').trigger('change', false);
          updateCharts();
          isRootEvent = true;
        }
      });

    $('.theme-group .colorpicker-component').each(function(id) {
      $(this).colorpicker('setValue', vm.theme.color[id]);
    });
  });
}

function getTheme() {
  var seriesStyle = {
    itemStyle: {
      normal: {
        borderWidth: vm.theme.lineWidth
      }
    },
    lineStyle: {
      normal: {
        width: vm.theme.lineWidth
      }
    },
    symbolSize: vm.theme.symbolSize,
    smooth: vm.theme.lineSmooth
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
    textStyle: {
      color: vm.theme.textColor
    },
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
      return style;
    })(),
    map: map,
    geo: map,
    categoryAxis: getAxis(1),
    valueAxis: getAxis(2),
    logAxis: getAxis(3),
    timeAxis: getAxis(4),
    toolbox: {
      show: vm.theme.toolboxShow,
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
      show: vm.theme.tooltipShow,
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
    visualMap: {
      color: vm.theme.visualMapUseTheme ? vm.theme.color :
        vm.theme.visualMapColor
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
  var now = new Date();
  if (isForceUpdate || now - lastUpdate > 200) {
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
    // console.warn('Ignored too frequent refresh.');
  }
}

function saveJsonFile(json, name) {
  var data = JSON.stringify(json);
  var a = document.createElement('a');
  var file = new Blob([data], {type: 'json'});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

function cloneObject(obj) {
  return $.extend(true, {}, obj);
}
