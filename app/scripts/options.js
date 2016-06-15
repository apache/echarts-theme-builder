function getOptions(vm) {
  var groupCnt = vm ? vm.theme.seriesCnt : 4;
  var axisCat = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var dataLength = axisCat.length;
  var getLegend = function() {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push('第' + (i + 1) + '组');
    }
    return data;
  };
  var getLegendWithName = function() {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push({
        name: '第' + (i + 1) + '组'
      });
    }
    return data;
  };
  var legend = {
    data: getLegend(),
    right: 0
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
        markPoint: typeName === 'line' || typeName === 'bar' ||
          typeName === 'scatter' ? {
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
      indicator: getIndicator(),
      center: ['50%', '60%']
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
  }, {
    title : {
      text: 'K 线图'
    },
    tooltip : {
      trigger: 'axis',
      formatter: function(params) {
        var res = params[1][1];
        res += '<br/>' + params[1][0];
        res += '<br/>  开盘 : ' + params[1][2][0] + '  最高 : ' + params[1][2][3];
        res += '<br/>  收盘 : ' + params[1][2][1] + '  最低 : ' + params[1][2][2];
        res += '<br/>' + params[0][0];
        res += ' : ' + params[0][2];
        return res;
      }
    },
    grid: {
      left: 60,
      right: 20,
      top: 40,
      bottom: 70
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataZoom: {show: true},
        magicType: {show: true, type: ['line', 'bar']},
        dataView: {show: true, readOnly: false},
        restore: {show: true}
      }
    },
    dataZoom: {
      show: true,
      realtime: true,
      start: 50,
      end: 100
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      axisTick: {onGap:false},
      data: [
        '2013/1/24', '2013/1/25', '2013/1/28', '2013/1/29', '2013/1/30',
        '2013/1/31', '2013/2/1', '2013/2/4', '2013/2/5', '2013/2/6',
        '2013/2/7', '2013/2/8', '2013/2/18', '2013/2/19', '2013/2/20',
        '2013/2/21', '2013/2/22', '2013/2/25', '2013/2/26', '2013/2/27',
        '2013/2/28', '2013/3/1', '2013/3/4', '2013/3/5', '2013/3/6',
        '2013/3/7', '2013/3/8', '2013/3/11', '2013/3/12', '2013/3/13',
        '2013/3/14', '2013/3/15', '2013/3/18', '2013/3/19', '2013/3/20',
        '2013/3/21', '2013/3/22', '2013/3/25', '2013/3/26', '2013/3/27',
        '2013/3/28', '2013/3/29', '2013/4/1', '2013/4/2', '2013/4/3',
        '2013/4/8', '2013/4/9', '2013/4/10', '2013/4/11', '2013/4/12',
        '2013/4/15', '2013/4/16', '2013/4/17', '2013/4/18', '2013/4/19',
        '2013/4/22', '2013/4/23', '2013/4/24', '2013/4/25', '2013/4/26',
        '2013/5/2', '2013/5/3', '2013/5/6', '2013/5/7', '2013/5/8',
        '2013/5/9', '2013/5/10', '2013/5/13', '2013/5/14', '2013/5/15',
        '2013/5/16', '2013/5/17', '2013/5/20', '2013/5/21', '2013/5/22',
        '2013/5/23', '2013/5/24', '2013/5/27', '2013/5/28', '2013/5/29',
        '2013/5/30', '2013/5/31', '2013/6/3', '2013/6/4', '2013/6/5',
        '2013/6/6', '2013/6/7', '2013/6/13'
      ]
    }],
    yAxis: [{
      type: 'value',
      scale: true,
      precision: 2,
      splitNumber: 7,
      boundaryGap: [0.05, 0.05]
    }],
    series: [{
      name:'上证指数',
      type:'candlestick',
      data:[ // 开盘，收盘，最低，最高
        [2320.26,2302.6,2287.3,2362.94],
        [2300,2291.3,2288.26,2308.38],
        [2295.35,2346.5,2295.35,2346.92],
        [2347.22,2358.98,2337.35,2363.8],
        [2360.75,2382.48,2347.89,2383.76],
        [2383.43,2385.42,2371.23,2391.82],
        [2377.41,2419.02,2369.57,2421.15],
        [2425.92,2428.15,2417.58,2440.38],
        [2411,2433.13,2403.3,2437.42],
        [2432.68,2434.48,2427.7,2441.73],
        [2430.69,2418.53,2394.22,2433.89],
        [2416.62,2432.4,2414.4,2443.03],
        [2441.91,2421.56,2415.43,2444.8],
        [2420.26,2382.91,2373.53,2427.07],
        [2383.49,2397.18,2370.61,2397.94],
        [2378.82,2325.95,2309.17,2378.82],
        [2322.94,2314.16,2308.76,2330.88],
        [2320.62,2325.82,2315.01,2338.78],
        [2313.74,2293.34,2289.89,2340.71],
        [2297.77,2313.22,2292.03,2324.63],
        [2322.32,2365.59,2308.92,2366.16],
        [2364.54,2359.51,2330.86,2369.65],
        [2332.08,2273.4,2259.25,2333.54],
        [2274.81,2326.31,2270.1,2328.14],
        [2333.61,2347.18,2321.6,2351.44],
        [2340.44,2324.29,2304.27,2352.02],
        [2326.42,2318.61,2314.59,2333.67],
        [2314.68,2310.59,2296.58,2320.96],
        [2309.16,2286.6,2264.83,2333.29],
        [2282.17,2263.97,2253.25,2286.33],
        [2255.77,2270.28,2253.31,2276.22],
        [2269.31,2278.4,2250,2312.08],
        [2267.29,2240.02,2239.21,2276.05],
        [2244.26,2257.43,2232.02,2261.31],
        [2257.74,2317.37,2257.42,2317.86],
        [2318.21,2324.24,2311.6,2330.81],
        [2321.4,2328.28,2314.97,2332],
        [2334.74,2326.72,2319.91,2344.89],
        [2318.58,2297.67,2281.12,2319.99],
        [2299.38,2301.26,2289,2323.48],
        [2273.55,2236.3,2232.91,2273.55],
        [2238.49,2236.62,2228.81,2246.87],
        [2229.46,2234.4,2227.31,2243.95],
        [2234.9,2227.74,2220.44,2253.42],
        [2232.69,2225.29,2217.25,2241.34],
        [2196.24,2211.59,2180.67,2212.59],
        [2215.47,2225.77,2215.47,2234.73],
        [2224.93,2226.13,2212.56,2233.04],
        [2236.98,2219.55,2217.26,2242.48],
        [2218.09,2206.78,2204.44,2226.26],
        [2199.91,2181.94,2177.39,2204.99],
        [2169.63,2194.85,2165.78,2196.43],
        [2195.03,2193.8,2178.47,2197.51],
        [2181.82,2197.6,2175.44,2206.03],
        [2201.12,2244.64,2200.58,2250.11],
        [2236.4,2242.17,2232.26,2245.12],
        [2242.62,2184.54,2182.81,2242.62],
        [2187.35,2218.32,2184.11,2226.12],
        [2213.19,2199.31,2191.85,2224.63],
        [2203.89,2177.91,2173.86,2210.58],
        [2170.78,2174.12,2161.14,2179.65],
        [2179.05,2205.5,2179.05,2222.81],
        [2212.5,2231.17,2212.5,2236.07],
        [2227.86,2235.57,2219.44,2240.26],
        [2242.39,2246.3,2235.42,2255.21],
        [2246.96,2232.97,2221.38,2247.86],
        [2228.82,2246.83,2225.81,2247.67],
        [2247.68,2241.92,2231.36,2250.85],
        [2238.9,2217.01,2205.87,2239.93],
        [2217.09,2224.8,2213.58,2225.19],
        [2221.34,2251.81,2210.77,2252.87],
        [2249.81,2282.87,2248.41,2288.09],
        [2286.33,2299.99,2281.9,2309.39],
        [2297.11,2305.11,2290.12,2305.3],
        [2303.75,2302.4,2292.43,2314.18],
        [2293.81,2275.67,2274.1,2304.95],
        [2281.45,2288.53,2270.25,2292.59],
        [2286.66,2293.08,2283.94,2301.7],
        [2293.4,2321.32,2281.47,2322.1],
        [2323.54,2324.02,2321.17,2334.33],
        [2316.25,2317.75,2310.49,2325.72],
        [2320.74,2300.59,2299.37,2325.53],
        [2300.21,2299.25,2294.11,2313.43],
        [2297.1,2272.42,2264.76,2297.1],
        [2270.71,2270.93,2260.87,2276.86],
        [2264.43,2242.11,2240.07,2266.69],
        [2242.26,2210.9,2205.07,2250.63],
        [2190.1,2148.35,2126.22,2190.1]
      ]
    }]
  }, {
    title: {
      text: '图'
    },
    series: [{
      type: 'graph',
      data: (function() {
        var data = [];
        var nodeId = 0;
        for (var sid = 0; sid < groupCnt; ++sid) {
          for (var i = 0; i < 20; ++i) {
            data.push({
              name: '' + nodeId++,
              value: Math.floor(Math.random() * 1000),
              category: '第' + (sid + 1) + '组',
              x: Math.floor(Math.random() * 1000 * (sid + 1) / groupCnt),
              y: Math.floor(Math.random() * 1000 * (sid + 1) / groupCnt)
            })
          }
        }
        return data;
      })(),
      links: (function() {
        var link = [];
        var dataCnt = 20;
        for (var i = 0; i < groupCnt; ++i) {
          for (var j = 0; j < dataCnt; ++j) {
            link.push({
              source: '' + i * dataCnt,
              target: '' + (i * dataCnt + j)
            });
          }
        }
        return link;
      })(),
      categories: getLegendWithName(),
      symbolSize: 15
    }]
  }, {
    title: {
      text: '地图'
    },
    geo: {
      map: 'china'
    },
    series: (function() {
      var s = [];
      for (var g = 0; g < groupCnt; ++g) {
        s.push({
          type: 'scatter',
          coordinateSystem: 'geo',
          name: '第' + (g + 1) + '组',
          symbolSize: function (val) {
            return val[2];
          },
          data: (function() {
            var geo = [[121.15,31.89], [109.781327,39.608266],
              [120.38,37.35], [122.207216,29.985295], [123.97,47.33],
              [120.13,33.38], [118.87,42.28], [120.33,36.07],
              [121.52,36.89], [102.188043,38.520089], [118.58,24.93],
              [120.53,36.86], [119.46,35.42], [119.97,35.88],
              [121.05,32.08], [91.11,29.97], [112.02,22.93],
              [116.1,24.55], [122.05,37.2], [121.48,31.22],
              [101.718637,26.582347], [122.1,37.5], [117.93,40.97],
              [118.1,24.46], [115.375279,22.786211], [116.63,23.68],
              [124.37,40.13], [121.1,31.45], [103.79,25.51],
              [121.39,37.52], [119.3,26.08], [121.979603,39.627114],
              [112.44,34.7], [113.16,27.83], [112.91,27.87],
              [113,28.21], [114.31,30.52], [125.03,46.58]];
              var data = [];
              for (var i = 0; i < 20; ++i) {
                var gid = Math.floor(Math.random() * geo.length);
                data.push(geo[gid].concat(Math.floor(Math.random() * 20)));
              }
              return data;
          })()
        });
      }
      return s;
    })()
  }, {
    title: {
      text: '地图视觉映射'
    },
    visualMap: {
      show: true,
      min: 0,
      max: 1000,
      right: 0,
      top: 'middle',
      text:['高','低']
    },
    series: [{
      type: 'map',
      map: 'china',
      showLegendSymbol: false,
      label: {
        normal: {
          show: true
        }
      },
      data:[
        {name: '北京', value: 980},
        {name: '天津', value: 800},
        {name: '上海', value: 900},
        {name: '重庆', value: 860},
        {name: '河北', value: 600},
        {name: '河南', value: 650},
        {name: '云南', value: 300},
        {name: '辽宁', value: 200},
        {name: '黑龙江', value: 220},
        {name: '湖南', value: 630},
        {name: '安徽', value: 570},
        {name: '山东', value: 500},
        {name: '新疆', value: 5},
        {name: '江苏', value: 800},
        {name: '浙江', value: 900},
        {name: '江西', value: 500},
        {name: '湖北', value: 500},
        {name: '广西', value: 50},
        {name: '甘肃', value: 500},
        {name: '山西', value: 500},
        {name: '内蒙古', value: 0},
        {name: '陕西', value: 0},
        {name: '吉林', value: 50},
        {name: '福建', value: 500},
        {name: '贵州', value: 500},
        {name: '广东', value: 500},
        {name: '青海', value: 50},
        {name: '西藏', value: 100},
        {name: '四川', value: 200},
        {name: '宁夏', value: 300},
        {name: '海南', value: 500},
        {name: '台湾', value: 880},
        {name: '香港', value: 900},
        {name: '澳门', value: 800}
      ]
    }]
  }];

  for (var i = 0; i < options.length; ++i) {
    options[i].legend = options[i].legend || legend;
    options[i].tooltip = options[i].tooltip || tooltip;
    options[i].toolbox = options[i].toolbox || toolbox;
    options[i].grid = options[i].grid || grid;
  }
  return options;
}
