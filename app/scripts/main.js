$(document).ready(function() {
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

  // init charts
  updateCharts();
});



var vm = new Vue({
  el: '#content',

  data: {
    theme: {
      backgroundColor: '#f3f3f3',
      titleColor: '#333',
      textColor: '#999',
      color: ['#ffcc00', '#ccff00', '#00ffcc', '#00ccff']
    },
    charts: (function() {
      var options = getOptions();
      var charts = [];
      // init charts object
      for (var cid = 0; cid < options.length; ++cid) {
        charts.push({
          option: JSON.stringify(options[cid]),
          chart: null
        });
      }
      return charts;
    })()
  },

  methods: {}
});



function getOptions() {
  var dataLength = 7;
  var getSeriesRandomValue = function(typeName, groupCnt) {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      var group = [];
      for (var j = 0; j < dataLength; ++j) {
        group.push(Math.floor(Math.random() * 1000));
      }
      data.push({
        type: typeName,
        data: group
      });
    }
    return data;
  }
  var axisCat = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  return [{
    title: {
      text: '折线图',
      subtext: '副标题样式'
    },
    series: getSeriesRandomValue('line', 4),
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
    series: getSeriesRandomValue('bar', 4),
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
    }
  }];
}

function getTheme() {
  return {
    color: vm.theme.color,
    backgroundColor: vm.theme.backgroundColor,
    textStyle: {
      color: vm.theme.textColor
    },
    title: {
      textStyle: {
        color: vm.theme.titleColor
      }
    }
  };
}

function updateCharts() {
  console.log('updateCharts');
  echarts.registerTheme('customed', getTheme());

  // re-draw charts
  $('.ec-panel').each(function() {
    var chart = echarts.init(this, 'customed');
    var option = JSON.parse($(this).attr('ec-option'));
    chart.setOption(option);
  });
}
