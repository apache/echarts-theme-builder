function getOptions(vm) {
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
          var v = [Math.floor(Math.random() * 1000 * (i + 1) / groupCnt),
            Math.floor(Math.random() * 1000 * (i + 1) / groupCnt)];
        } else {
          var v = Math.floor(Math.random() * 1000 * (i + 1) / groupCnt) + 10;
        }
        group.push(v);
      }
      if (typeName === 'radar') {
        group = [group];
      }
      data.push({
        type: typeName,
        data: group,
        name: '第' + (i + 1) + '组',
        markPoint: typeName === 'line' || typeName === 'bar' ? {
          data: [{
            name: '最高',
            type: 'max'
          }]
        } : {}
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
        value: Math.floor(Math.random() * 1000 * (i + 1) / groupCnt)
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

  var grid = {
    left: 60,
    right: 20,
    top: 40,
    bottom: 50
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
    },
    grid: {
      left: 60,
      right: 20,
      top: 60,
      bottom: 50
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
    },
    grid: {
      left: 60,
      right: 20,
      top: 60,
      bottom: 50
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
          data.push(Math.floor(Math.random() * 1000 * (i + 1) / 50));
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
    options[i].tooltip = options[i].tooltip || tooltip;
    options[i].toolbox = options[i].toolbox || toolbox;
    options[i].grid = options[i].grid || grid;
  }
  return options;
}
