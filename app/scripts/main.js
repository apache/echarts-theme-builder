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
  color: ['#ffcc00', '#ccff00', '#00ffcc', '#00ccff'],

  axisLineShow: true,
  axisLineColor: '#666',
  axisTickShow: true,
  axisTickColor: '#666',
  axisLabelShow: true,
  axisLabelColor: '#333',
  splitLineShow: true,
  splitLineColor: '#efefef',
  splitAreaShow: false,
  splitAreaColor: '#fff'
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

    updateCharts: updateCharts,

    exportJson: function() {
      saveJsonFile(this.theme, 'theme.etd');
    },

    useTheme: function() {
      saveJsonFile(getTheme(), 'theme.json');
    },

    newTheme: function() {
      this.$set('theme', cloneObject(defaultTheme));
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
      if (extension !== '.etd') {
        alert('非法后缀！请使用本网站导出的 *.etd 文件。');
        return;
      }

      var that = this;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var obj = JSON.parse(this.result);
          that.$set('theme', obj);
          updateCharts();
        } catch(e) {
          alert('非法 JSON 格式！请使用本网站导出的 *.etd 文件。');
          console.error(e);
        }
      }
      reader.readAsText(file);
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
    show: true,
    data: getLegend(groupCnt)
  };
  var getSeriesRandomValue = function(typeName) {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      var group = [];
      for (var j = 0; j < dataLength; ++j) {
        group.push(Math.floor(Math.random() * 1000) + 10);
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
      text: '折线堆积面积图',
      subtext: '副标题样式'
    },
    series: getSeriesRandomStack('line'),
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
      text: '饼图'
    },
    series: getSeriesRandomGroup('pie')
  }];
  for (var i = 0; i < options.length; ++i) {
    options[i].legend = legend;
    options[i].animation = false;
  }
  return options;
}

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
    timeAxis: axis,
    logAxis: axis,
    valueAxis: axis,
    categoryAxis: axis
  };
}

function updateCharts() {
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
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  var temp = obj.constructor();
  for (var key in obj) {
      temp[key] = cloneObject(obj[key]);
  }
  return temp;
}
