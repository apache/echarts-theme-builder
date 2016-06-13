$(document).ready(function() {
  initColorPicker();

  // init charts
  updateChartOptions();
  updateCharts();
});



var defaultTheme = {
  backgroundColor: '#fff',
  titleColor: '#333',
  subtitleColor: '#666',
  textColor: '#999',
  color: ['#293c55', '#a9334c', '#3095c6'],
  visualMapColor: ['#ff6633', '#ffff00', '#00cc00'],
  visualMapUseTheme: true,

  lineWidth: 2,
  symbolSize: 8,
  lineSmooth: false,

  gridShow: false,
  gridColor: '#fff',
  gridBorderColor: '#999',
  gridLeft: 60,
  gridRight: 20,
  gridTop: 60,
  gridBottom: 50,

  axisLineShow: true,
  axisLineColor: '#ccc',
  axisTickShow: false,
  axisTickColor: '#666',
  axisLabelShow: true,
  axisLabelColor: '#999',
  splitLineShow: true,
  splitLineColor: '#efefef',
  splitAreaShow: false,
  splitAreaColor: '#fff',

  toolboxShow: false,
  toolboxColor: '#999',
  toolboxEmpasisColor: '#666',

  tooltipShow: true,
  tooltipAxisColor: '#999',
  tooltipAxisWidth: 1,

  legendShow: true,
  legendLeft: 'center',
  legendTop: 'bottom'
};



var vm = new Vue({
  el: '#content',

  data: {
    theme: cloneObject(defaultTheme),
    charts: []
  },

  methods: {
    addThemeColor: function() {
      this.theme.color.push('#ccc');
      initColorPicker();
      updateChartOptions();
      updateCharts();
    },

    removeThemeColor: function() {
      // remove the last theme color
      this.theme.color.splice(-1, 1);
      updateChartOptions();
      updateCharts();
    },

    addVisualMapColor: function() {
      this.theme.visualMapColor.push('#ccc');
      initColorPicker();
      updateChartOptions();
      updateCharts();
    },

    removeVisualMapColor: function() {
      // remove the last theme color
      this.theme.visualMapColor.splice(-1, 1);
      updateChartOptions();
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
      updateChartOptions();
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
            updateChartOptions();
            updateCharts();
          });
        } catch(e) {
          alert('非法 JSON 格式！请使用本网站导出的 *.etb 文件。');
          console.error(e);
        }
      }
      reader.readAsText(file);
    },

    setLegendLeft(left) {
      vm.theme.legendLeft = left;
      updateCharts();
    },

    setLegendTop(top) {
      vm.theme.legendTop = top;
      updateCharts();
    }
  }
});



function getOptions() {
  var groupCnt = vm ? vm.theme.color.length : 4;
  var axisCat = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var dataLength = axisCat.length;
  var getLegend = function(groupCnt) {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push('第' + (i + 1) + '组');
    }
    return data;
  };
  var legend = {
    data: getLegend(groupCnt)
  };
  var getSeriesRandomValue = function(typeName) {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      var group = [];
      for (var j = 0; j < dataLength; ++j) {
        if (typeName === 'scatter') {
          var v = [Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 1000)];
        } else {
          var v = Math.floor(Math.random() * 1000) + 10;
        }
        group.push(v);
      }
      if (typeName === 'radar') {
        group = [group];
      }
      data.push({
        type: typeName,
        data: group,
        name: '第' + (i + 1) + '组'
      });
    }
    return data;
  };
  var getSeriesRandomStack = function(typeName) {
    var data = getSeriesRandomValue(typeName);
    for (var i = 0; i < data.length; ++i) {
      data[i].areaStyle = {normal: {}};
      data[i].stack = 'total';
    }
    return data;
  };
  var getSeriesRandomGroup = function(typeName) {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push({
        name: legend.data[i],
        value: Math.floor(Math.random() * 1000)
      });
    }
    return {
      type: typeName,
      data: data
    };
  };
  var getIndicator = function() {
    var res = [];
    for (var i = 0; i < axisCat.length; ++i) {
      res.push({
        name: axisCat[i],
        max: 1000
      });
    }
    return res;
  }

  var toolbox = {
    feature: {
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      },
      dataView: {
        show: true
      },
      dataZoom: {
        show: true
      }
    }
  };

  var tooltip = {
    trigger: 'axis'
  };

  var options = [{
    title: {
      text: '折线图',
      subtext: '副标题样式'
    },
    series: getSeriesRandomValue('line'),
    xAxis: {
      type: 'category',
      data: axisCat
    },
    yAxis: {
      type: 'value'
    }
  }, {
    title: {
      text: '折线堆积面积图',
      subtext: '副标题样式'
    },
    series: getSeriesRandomStack('line'),
    xAxis: {
      type: 'category',
      data: axisCat,
      boundaryGap: false
    },
    yAxis: {
      type: 'value'
    }
  }, {
    title: {
      text: '柱状图'
    },
    series: getSeriesRandomValue('bar'),
    xAxis: {
      type: 'category',
      data: axisCat
    },
    yAxis: {
      type: 'value'
    }
  }, {
    title: {
      text: '柱状堆积图'
    },
    series: getSeriesRandomStack('bar'),
    xAxis: {
      type: 'category',
      data: axisCat
    },
    yAxis: {
      type: 'value'
    }
  }, {
    title: {
      text: '散点图'
    },
    series: getSeriesRandomValue('scatter'),
    toolbox: toolbox,
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    }
  }, {
    title: {
      text: '饼图'
    },
    series: getSeriesRandomGroup('pie'),
    tooltip: {
      trigger: 'item'
    }
  }, {
    title: {
      text: '雷达图'
    },
    series: getSeriesRandomValue('radar'),
    radar: {
      indicator: getIndicator()
    }
  }, {
    title: {
      text: '视觉映射'
    },
    visualMap: {
      max: 1000,
      min: 0
    },
    legend: {
      show: false
    },
    series: {
      type: 'bar',
      data: (function() {
        var data = [];
        for (var i = 0; i < 50; ++i) {
          data.push(Math.floor(Math.random() * 1000));
        }
        return data;
      })()
    },
    xAxis: {
      type: 'category',
      data: (function() {
        var data = [];
        for (var i = 0; i < 50; ++i) {
          data.push(i + 1);
        }
        return data;
      })()
    },
    yAxis: {
      type: 'value'
    }
  }];

  for (var i = 0; i < options.length; ++i) {
    options[i].legend = options[i].legend || legend;
    options[i].tooltip = tooltip;
    options[i].toolbox = toolbox;
    options[i].animation = false;
  }
  return options;
}

function initColorPicker() {
  setTimeout(function() {
    // prevent from calling onchange recursively
    var isRootEvent = true;
    // console.log(vm.theme.col)
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
  var axis = {
    axisLine: {
      show: vm.theme.axisLineShow,
      lineStyle: {
        color: vm.theme.axisLineColor
      }
    },
    axisTick: {
      show: vm.theme.axisTickShow,
      lineStyle: {
        color: vm.theme.axisTickColor
      }
    },
    axisLabel: {
      show: vm.theme.axisLabelShow,
      textStyle: {
        color: vm.theme.axisLabelColor
      }
    },
    splitLine: {
      show: vm.theme.splitLineShow,
      lineStyle: {
        color: vm.theme.splitLineColor
      }
    },
    splitArea: {
      show: vm.theme.splitAreaShow,
      areaStyle: {
        color: vm.theme.splitAreaColor
      }
    }
  };

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
    grid: {
      show: vm.theme.gridShow,
      backgroundColor: vm.theme.gridColor,
      borderColor: vm.theme.gridBorderColor,
      left: vm.theme.gridLeft,
      right: vm.theme.gridRight,
      top: vm.theme.gridTop,
      bottom: vm.theme.gridBottom
    },
    timeAxis: axis,
    logAxis: axis,
    valueAxis: axis,
    categoryAxis: axis,
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
    legend: {
      show: vm.theme.legendShow,
      textStyle: {
        color: vm.theme.textColor
      },
      left: vm.theme.legendLeft,
      top: vm.theme.legendTop
    },
    visualMap: {
      color: vm.theme.visualMapUseTheme ? vm.theme.color :
        vm.theme.visualMapColor
    }
  };
}

var lastUpdate = null;
function updateCharts(isForceUpdate) {
  var now = new Date();
  if (isForceUpdate || now - lastUpdate > 100) {
    setTimeout(function() {
      console.log('updateCharts');
      echarts.registerTheme('customed', getTheme());

      // re-draw charts
      $('.ec-panel').each(function() {
        var chart = echarts.init(this, 'customed');
        var option = JSON.parse($(this).attr('ec-option'));
        chart.setOption(option);
      });
    });
    lastUpdate = now;
  } else {
    console.warn('Ignored too frequent refresh.');
  }
}

function updateChartOptions() {
  var options = getOptions();
  var charts = [];
  // init charts object
  for (var cid = 0; cid < options.length; ++cid) {
    charts.push({
      option: JSON.stringify(options[cid]),
      chart: null
    });
  }
  vm.$set('charts', charts);
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
