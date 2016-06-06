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
      backgroundColor: '#ccc',
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
  return [{
    title: {
      text: '折线图'
    }
  }, {
    title: {
      text: '柱状图'
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
