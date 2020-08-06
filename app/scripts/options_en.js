function getOptions(vm) {
  var groupCnt = vm ? vm.theme.seriesCnt : 4;
  var axisCat = ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var dataLength = axisCat.length;
  var getLegend = function() {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push('Group ' + (i + 1));
    }
    return data;
  };
  var getLegendWithName = function() {
    var data = [];
    for (var i = 0; i < groupCnt; ++i) {
      data.push({
        name: 'Group ' + (i + 1)
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
    if (typeName === 'scatter') {
      var dlen = 32;
    } else {
      var dlen = dataLength;
    }
    for (var i = 0; i < groupCnt; ++i) {
      var group = [];
      for (var j = 0; j < dlen; ++j) {
        if (typeName === 'scatter') {
          var v = [Math.floor((Math.random() * 600 + 400) * (groupCnt - i) /
            groupCnt),
            Math.floor((Math.random() * 600 + 400) * (groupCnt - i) /
            groupCnt)];
        } else {
          var v = Math.floor((Math.random() * 600 + 400) * (groupCnt - i) /
            groupCnt);
        }
        group.push(v);
      }
      if (typeName === 'radar') {
        group = [group];
      }
      data.push({
        type: typeName,
        data: group,
        name: 'Group ' + (i + 1),
        markPoint: typeName === 'line' || typeName === 'bar' ||
          typeName === 'scatter' ? {
            data: [{
              name: 'Maximum',
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
        value: Math.floor((Math.random() * 800 + 200) * (groupCnt - i) /
          groupCnt)
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

  var dataMap = {};
  function dataFormatter(obj) {
    var pList = ['Beijing','Tianjin','Hebei','Shanxi','Inner Mongolia','Jilin','Heilongjiang','Shanghai','Jiangsu'];
    var temp;
    for (var year = 2002; year <= 2007; year++) {
      var max = 0;
      var sum = 0;
      temp = obj[year];
      for (var i = 0, l = temp.length; i < l; i++) {
        max = Math.max(max, temp[i]);
        sum += temp[i];
        obj[year][i] = {
          name: pList[i],
          value: temp[i]
        }
      }
      obj[year + 'max'] = Math.floor(max / 100) * 100;
      obj[year + 'sum'] = sum;
    }
    return obj;
  }

  dataMap.dataPI = dataFormatter({
    //max : 4000,
    2007:[101.26,110.19,1804.72,311.97,762.1,1133.42,783.8,915.38,101.84,1816.31],
    2006:[88.8,103.35,1461.81,276.77,634.94,939.43,672.76,750.14,93.81,1545.05,925.1],
    2005:[88.68,112.38,1400,262.42,589.56,882.41,625.61,684.6,90.26,1461.51,892.83],
    2004:[87.36,105.28,1370.43,276.3,522.8,798.43,568.69,605.79,83.45,1367.58,814.1],
    2003:[84.11,89.91,1064.05,215.19,420.1,615.8,488.23,504.8,81.02,1162.45,717.85],
    2002:[82.44,84.21,956.84,197.8,374.69,590.2,446.17,474.2,79.68,1110.44]
  });

  dataMap.dataSI = dataFormatter({
    //max : 26600,
    2007:[2509.4,2892.53,7201.88,3454.49,3193.67,5544.14,2475.45,3695.58,5571.06,14471.26],
    2006:[2191.43,2457.08,6110.43,2755.66,2374.96,4566.83,1915.29,3365.31,4969.95,12282.89],
    2005:[2026.51,2135.07,5271.57,2357.04,1773.21,3869.4,1580.83,2971.68,4381.2,10524.96],
    2004:[1853.58,1685.93,4301.73,1919.4,1248.27,3061.62,1329.68,2487.04,3892.12,8437.99],
    2003:[1487.15,1337.31,3417.56,1463.38,967.49,2898.89,1098.37,2084.7,3209.02,6787.11],
    2002:[1249.99,1069.08,2911.69,1134.31,754.78,2609.85,943.49,1843.6,2622.45,5604.49]
  });

  dataMap.dataTI = dataFormatter({
    //max : 25000,
    2007:[7236.15,2250.04,4600.72,2257.99,2467.41,4486.74,2025.44,2493.04,6821.11,9730.91],
    2006:[5837.55,1902.31,3895.36,1846.18,1934.35,3798.26,1687.07,2096.35,5508.48,7914.11],
    2005:[4854.33,1658.19,3340.54,1611.07,1542.26,3295.45,1413.83,1857.42,4776.2,6612.22],
    2004:[4092.27,1319.76,2805.47,1375.67,1270,2811.95,1223.64,1657.77,4097.26,5198.03],
    2003:[3435.95,1150.81,2439.68,1176.65,1000.79,2487.85,1075.48,1467.9,3404.19,4493.31],
    2002:[2982.57,997.47,2149.75,992.69,811.47,2258.17,958.88,1319.4,3038.9,3891.92]
  });

  var options = [{
    title: {
      text: 'Line Chart',
      subtext: '(Subtitle here)'
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
      text: 'Stacked Line Chart',
      subtext: '(Subtitle here)'
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
      text: 'Bar Chart'
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
      text: 'Stacked Bar Chart'
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
      text: 'Scatter Chart'
    },
    series: getSeriesRandomValue('scatter'),
    toolbox: (function() {
      var t = toolbox;
      t.left = 65;
      return t;
    })(),
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
      text: 'Pie Chart'
    },
    series: getSeriesRandomGroup('pie'),
    tooltip: {
      trigger: 'item'
    }
  }, {
    title: {
      text: 'Radar Chart'
    },
    series: getSeriesRandomValue('radar'),
    radar: {
      indicator: getIndicator(),
      center: ['50%', '60%']
    }
  }, {
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: false,
        data: [
          '2002-01-01','2003-01-01','2004-01-01',
          {
            value: '2005-01-01',
            tooltip: {
              formatter: '{b} GDP reached a height.'
            }
          },
          '2006-01-01', '2007-01-01','2008-01-01','2009-01-01','2010-01-01',
          {
            value: '2011-01-01',
            tooltip: {
              formatter: function (params) {
                return params.name + 'GDP reached another height.';
              }
            }
          },
        ],
        label: {
          formatter : function(s) {
            return (new Date(s)).getFullYear();
          }
        }
      },
      tooltip: {},
      legend: {
        x: 'right',
        data: ['Primary Industry', 'Secondary Industry', 'Tertiary Industry']
      },
      calculable : true,
      grid: {
        top: 60,
        bottom: 75
      },
      xAxis: [
        {
          'type':'category',
          'axisLabel':{'interval':0},
          'data':[
            'Beijing','Tianjin','Hebei','Shanxi','Inner Mongolia','Jilin','Heilongjiang','Shanghai','Jiangsu'
          ],
          splitLine: {show: false}
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'GDP (hundred million Yuan)'
        }
      ],
      series: [
        {name: 'Primary Industry', type: 'bar'},
        {name: 'Secondary Industry', type: 'bar'},
        {name: 'Tertiary Industry', type: 'bar'},
        {
          name: 'GDP Ratio',
          type: 'pie',
          center: ['30%', '35%'],
          radius: '28%'
        }
      ]
    },
    options: [
      {
        title: {text: 'Timeline'},
        series: [
          {data: dataMap.dataPI['2002']},
          {data: dataMap.dataSI['2002']},
          {data: dataMap.dataTI['2002']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2002sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2002sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2002sum']}
          ]}
        ]
      },
      {
        title : {text: 'Timeline'},
        series : [
          {data: dataMap.dataPI['2003']},
          {data: dataMap.dataSI['2003']},
          {data: dataMap.dataTI['2003']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2003sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2003sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2003sum']}
          ]}
        ]
      },
      {
        title : {text: 'Timeline'},
        series : [
          {data: dataMap.dataPI['2004']},
          {data: dataMap.dataSI['2004']},
          {data: dataMap.dataTI['2004']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2004sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2004sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2004sum']}
          ]}
        ]
      },
      {
        title : {text: 'Timeline'},
        series : [
          {data: dataMap.dataPI['2005']},
          {data: dataMap.dataSI['2005']},
          {data: dataMap.dataTI['2005']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2005sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2005sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2005sum']}
          ]}
        ]
      },
      {
        title : {text: 'Timeline'},
        series : [
          {data: dataMap.dataPI['2006']},
          {data: dataMap.dataSI['2006']},
          {data: dataMap.dataTI['2006']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2006sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2006sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2006sum']}
          ]}
        ]
      },
      {
        title : {text: 'Timeline'},
        series : [
          {data: dataMap.dataPI['2007']},
          {data: dataMap.dataSI['2007']},
          {data: dataMap.dataTI['2007']},
          {data: [
            {name: 'Primary Industry', value: dataMap.dataPI['2007sum']},
            {name: 'Secondary Industry', value: dataMap.dataSI['2007sum']},
            {name: 'Tertiary Industry', value: dataMap.dataTI['2007sum']}
          ]}
        ]
      }
    ]
  }, {
    title: {
      text: 'Candlestick Chart & Zoom'
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
      name:'The Shanghai Compisite Index',
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
      text: 'Graph'
    },
    "series":[
      {
        "name":"Les Miserables",
        "type":"graph",
        "layout":"none",
        "data":[
          {
            "id":"0",
            "name":"Myriel",
            "label":{
              "normal":{
                "formatter":"Myriel",
                "show":false
              }
            },
            "symbolSize":8.685715,
            "x":-266.82776,
            "y":299.6904,
            "attributes":{
              "modularity_class":0
            },
            "value":28.685715,
            "category":0
          },
          {
            "id":"1",
            "name":"Napoleon",
            "label":{
              "normal":{
                "formatter":"Napoleon",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-418.08344,
            "y":446.8853,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"2",
            "name":"MlleBaptistine",
            "label":{
              "normal":{
                "formatter":"MlleBaptistine",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":-212.76357,
            "y":245.29176,
            "attributes":{
              "modularity_class":1
            },
            "value":9.485714,
            "category":1
          },
          {
            "id":"3",
            "name":"MmeMagloire",
            "label":{
              "normal":{
                "formatter":"MmeMagloire",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":-242.82404,
            "y":235.26283,
            "attributes":{
              "modularity_class":1
            },
            "value":9.485714,
            "category":1
          },
          {
            "id":"4",
            "name":"CountessDeLo",
            "label":{
              "normal":{
                "formatter":"CountessDeLo",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-379.30386,
            "y":429.06424,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"5",
            "name":"Geborand",
            "label":{
              "normal":{
                "formatter":"Geborand",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-417.26337,
            "y":406.03506,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"6",
            "name":"Champtercier",
            "label":{
              "normal":{
                "formatter":"Champtercier",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-332.6012,
            "y":485.16974,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"7",
            "name":"Cravatte",
            "label":{
              "normal":{
                "formatter":"Cravatte",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-382.69568,
            "y":475.09113,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"8",
            "name":"Count",
            "label":{
              "normal":{
                "formatter":"Count",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-320.384,
            "y":387.17325,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"9",
            "name":"OldMan",
            "label":{
              "normal":{
                "formatter":"OldMan",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-344.39832,
            "y":451.16772,
            "attributes":{
              "modularity_class":0
            },
            "value":4,
            "category":0
          },
          {
            "id":"10",
            "name":"Labarre",
            "label":{
              "normal":{
                "formatter":"Labarre",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-89.34107,
            "y":234.56128,
            "attributes":{
              "modularity_class":1
            },
            "value":4,
            "category":1
          },
          {
            "id":"11",
            "name":"Valjean",
            "label":{
              "normal":{
                "formatter":"Valjean",
                "show":  false
              }
            },
            "symbolSize":40,
            "x":-87.93029,
            "y":-6.8120565,
            "attributes":{
              "modularity_class":1
            },
            "value":100,
            "category":1
          },
          {
            "id":"12",
            "name":"Marguerite",
            "label":{
              "normal":{
                "formatter":"Marguerite",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":-339.77908,
            "y":-184.69139,
            "attributes":{
              "modularity_class":1
            },
            "value":6.742859,
            "category":1
          },
          {
            "id":"13",
            "name":"MmeDeR",
            "label":{
              "normal":{
                "formatter":"MmeDeR",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-194.31313,
            "y":178.55301,
            "attributes":{
              "modularity_class":1
            },
            "value":4,
            "category":1
          },
          {
            "id":"14",
            "name":"Isabeau",
            "label":{
              "normal":{
                "formatter":"Isabeau",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-158.05168,
            "y":201.99768,
            "attributes":{
              "modularity_class":1
            },
            "value":4,
            "category":1
          },
          {
            "id":"15",
            "name":"Gervais",
            "label":{
              "normal":{
                "formatter":"Gervais",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-127.701546,
            "y":242.55057,
            "attributes":{
              "modularity_class":1
            },
            "value":4,
            "category":1
          },
          {
            "id":"16",
            "name":"Tholomyes",
            "label":{
              "normal":{
                "formatter":"Tholomyes",
                "show":false
              }
            },
            "symbolSize":15.942856,
            "x":-385.2226,
            "y":-393.5572,
            "attributes":{
              "modularity_class":2
            },
            "value":25.942856,
            "category":2
          },
          {
            "id":"17",
            "name":"Listolier",
            "label":{
              "normal":{
                "formatter":"Listolier",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-516.55884,
            "y":-393.98975,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"18",
            "name":"Fameuil",
            "label":{
              "normal":{
                "formatter":"Fameuil",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-464.79382,
            "y":-493.57944,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"19",
            "name":"Blacheville",
            "label":{
              "normal":{
                "formatter":"Blacheville",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-515.1624,
            "y":-456.9891,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"20",
            "name":"Favourite",
            "label":{
              "normal":{
                "formatter":"Favourite",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-408.12122,
            "y":-464.5048,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"21",
            "name":"Dahlia",
            "label":{
              "normal":{
                "formatter":"Dahlia",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-456.44113,
            "y":-425.13303,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"22",
            "name":"Zephine",
            "label":{
              "normal":{
                "formatter":"Zephine",
                "show":false
              }
            },
            "symbolSize":17.457146,
            "x":-459.1107,
            "y":-362.5133,
            "attributes":{
              "modularity_class":2
            },
            "value":20.457146,
            "category":2
          },
          {
            "id":"23",
            "name":"Fantine",
            "label":{
              "normal":{
                "formatter":"Fantine",
                "show":  false
              }
            },
            "symbolSize":22.4,
            "x":-313.42786,
            "y":-289.44803,
            "attributes":{
              "modularity_class":2
            },
            "value":42.4,
            "category":2
          },
          {
            "id":"24",
            "name":"MmeThenardier",
            "label":{
              "normal":{
                "formatter":"MmeThenardier",
                "show":  false
              }
            },
            "symbolSize":14.428574,
            "x":4.6313396,
            "y":-273.8517,
            "attributes":{
              "modularity_class":7
            },
            "value":31.428574,
            "category":7
          },
          {
            "id":"25",
            "name":"Thenardier",
            "label":{
              "normal":{
                "formatter":"Thenardier",
                "show":  false
              }
            },
            "symbolSize":25.142853,
            "x":82.80825,
            "y":-203.1144,
            "attributes":{
              "modularity_class":7
            },
            "value":45.142853,
            "category":7
          },
          {
            "id":"26",
            "name":"Cosette",
            "label":{
              "normal":{
                "formatter":"Cosette",
                "show":  false
              }
            },
            "symbolSize":21.428574,
            "x":78.64646,
            "y":-31.512747,
            "attributes":{
              "modularity_class":6
            },
            "value":31.428574,
            "category":6
          },
          {
            "id":"27",
            "name":"Javert",
            "label":{
              "normal":{
                "formatter":"Javert",
                "show":  false
              }
            },
            "symbolSize":27.88571,
            "x":-81.46074,
            "y":-204.20204,
            "attributes":{
              "modularity_class":7
            },
            "value":47.88571,
            "category":7
          },
          {
            "id":"28",
            "name":"Fauchelevent",
            "label":{
              "normal":{
                "formatter":"Fauchelevent",
                "show":false
              }
            },
            "symbolSize":12.228573,
            "x":-225.73984,
            "y":82.41631,
            "attributes":{
              "modularity_class":4
            },
            "value":12.228573,
            "category":4
          },
          {
            "id":"29",
            "name":"Bamatabois",
            "label":{
              "normal":{
                "formatter":"Bamatabois",
                "show":false
              }
            },
            "symbolSize":23.2,
            "x":-385.6842,
            "y":-20.206686,
            "attributes":{
              "modularity_class":3
            },
            "value":23.2,
            "category":3
          },
          {
            "id":"30",
            "name":"Perpetue",
            "label":{
              "normal":{
                "formatter":"Perpetue",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":-403.92447,
            "y":-197.69823,
            "attributes":{
              "modularity_class":2
            },
            "value":6.742859,
            "category":2
          },
          {
            "id":"31",
            "name":"Simplice",
            "label":{
              "normal":{
                "formatter":"Simplice",
                "show":false
              }
            },
            "symbolSize":12.228573,
            "x":-281.4253,
            "y":-158.45137,
            "attributes":{
              "modularity_class":2
            },
            "value":12.228573,
            "category":2
          },
          {
            "id":"32",
            "name":"Scaufflaire",
            "label":{
              "normal":{
                "formatter":"Scaufflaire",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-122.41348,
            "y":210.37503,
            "attributes":{
              "modularity_class":1
            },
            "value":4,
            "category":1
          },
          {
            "id":"33",
            "name":"Woman1",
            "label":{
              "normal":{
                "formatter":"Woman1",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":-234.6001,
            "y":-113.15067,
            "attributes":{
              "modularity_class":1
            },
            "value":6.742859,
            "category":1
          },
          {
            "id":"34",
            "name":"Judge",
            "label":{
              "normal":{
                "formatter":"Judge",
                "show":false
              }
            },
            "symbolSize":17.714287,
            "x":-387.84915,
            "y":58.7059,
            "attributes":{
              "modularity_class":3
            },
            "value":17.714287,
            "category":3
          },
          {
            "id":"35",
            "name":"Champmathieu",
            "label":{
              "normal":{
                "formatter":"Champmathieu",
                "show":false
              }
            },
            "symbolSize":17.714287,
            "x":-338.2307,
            "y":87.48405,
            "attributes":{
              "modularity_class":3
            },
            "value":17.714287,
            "category":3
          },
          {
            "id":"36",
            "name":"Brevet",
            "label":{
              "normal":{
                "formatter":"Brevet",
                "show":false
              }
            },
            "symbolSize":17.714287,
            "x":-453.26874,
            "y":58.94648,
            "attributes":{
              "modularity_class":3
            },
            "value":17.714287,
            "category":3
          },
          {
            "id":"37",
            "name":"Chenildieu",
            "label":{
              "normal":{
                "formatter":"Chenildieu",
                "show":false
              }
            },
            "symbolSize":17.714287,
            "x":-386.44904,
            "y":140.05937,
            "attributes":{
              "modularity_class":3
            },
            "value":17.714287,
            "category":3
          },
          {
            "id":"38",
            "name":"Cochepaille",
            "label":{
              "normal":{
                "formatter":"Cochepaille",
                "show":false
              }
            },
            "symbolSize":17.714287,
            "x":-446.7876,
            "y":123.38005,
            "attributes":{
              "modularity_class":3
            },
            "value":17.714287,
            "category":3
          },
          {
            "id":"39",
            "name":"Pontmercy",
            "label":{
              "normal":{
                "formatter":"Pontmercy",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":336.49738,
            "y":-269.55914,
            "attributes":{
              "modularity_class":6
            },
            "value":9.485714,
            "category":6
          },
          {
            "id":"40",
            "name":"Boulatruelle",
            "label":{
              "normal":{
                "formatter":"Boulatruelle",
                "show":false
              }
            },
            "symbolSize":4,
            "x":29.187843,
            "y":-460.13132,
            "attributes":{
              "modularity_class":7
            },
            "value":4,
            "category":7
          },
          {
            "id":"41",
            "name":"Eponine",
            "label":{
              "normal":{
                "formatter":"Eponine",
                "show":  false
              }
            },
            "symbolSize":31.428574,
            "x":238.36697,
            "y":-210.00926,
            "attributes":{
              "modularity_class":7
            },
            "value":31.428574,
            "category":7
          },
          {
            "id":"42",
            "name":"Anzelma",
            "label":{
              "normal":{
                "formatter":"Anzelma",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":189.69513,
            "y":-346.50662,
            "attributes":{
              "modularity_class":7
            },
            "value":9.485714,
            "category":7
          },
          {
            "id":"43",
            "name":"Woman2",
            "label":{
              "normal":{
                "formatter":"Woman2",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":-187.00418,
            "y":-145.02663,
            "attributes":{
              "modularity_class":6
            },
            "value":9.485714,
            "category":6
          },
          {
            "id":"44",
            "name":"MotherInnocent",
            "label":{
              "normal":{
                "formatter":"MotherInnocent",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":-252.99521,
            "y":129.87549,
            "attributes":{
              "modularity_class":4
            },
            "value":6.742859,
            "category":4
          },
          {
            "id":"45",
            "name":"Gribier",
            "label":{
              "normal":{
                "formatter":"Gribier",
                "show":false
              }
            },
            "symbolSize":4,
            "x":-296.07935,
            "y":163.11964,
            "attributes":{
              "modularity_class":4
            },
            "value":4,
            "category":4
          },
          {
            "id":"46",
            "name":"Jondrette",
            "label":{
              "normal":{
                "formatter":"Jondrette",
                "show":false
              }
            },
            "symbolSize":4,
            "x":550.3201,
            "y":522.4031,
            "attributes":{
              "modularity_class":5
            },
            "value":4,
            "category":5
          },
          {
            "id":"47",
            "name":"MmeBurgon",
            "label":{
              "normal":{
                "formatter":"MmeBurgon",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":488.13535,
            "y":356.8573,
            "attributes":{
              "modularity_class":5
            },
            "value":6.742859,
            "category":5
          },
          {
            "id":"48",
            "name":"Gavroche",
            "label":{
              "normal":{
                "formatter":"Gavroche",
                "show":  false
              }
            },
            "symbolSize":31.600006,
            "x":387.89572,
            "y":110.462326,
            "attributes":{
              "modularity_class":8
            },
            "value":61.600006,
            "category":8
          },
          {
            "id":"49",
            "name":"Gillenormand",
            "label":{
              "normal":{
                "formatter":"Gillenormand",
                "show":false
              }
            },
            "symbolSize":20.457146,
            "x":126.4831,
            "y":68.10622,
            "attributes":{
              "modularity_class":6
            },
            "value":20.457146,
            "category":6
          },
          {
            "id":"50",
            "name":"Magnon",
            "label":{
              "normal":{
                "formatter":"Magnon",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":127.07365,
            "y":-113.05923,
            "attributes":{
              "modularity_class":6
            },
            "value":6.742859,
            "category":6
          },
          {
            "id":"51",
            "name":"MlleGillenormand",
            "label":{
              "normal":{
                "formatter":"MlleGillenormand",
                "show":false
              }
            },
            "symbolSize":20.457146,
            "x":162.63559,
            "y":117.6565,
            "attributes":{
              "modularity_class":6
            },
            "value":20.457146,
            "category":6
          },
          {
            "id":"52",
            "name":"MmePontmercy",
            "label":{
              "normal":{
                "formatter":"MmePontmercy",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":353.66415,
            "y":-205.89165,
            "attributes":{
              "modularity_class":6
            },
            "value":6.742859,
            "category":6
          },
          {
            "id":"53",
            "name":"MlleVaubois",
            "label":{
              "normal":{
                "formatter":"MlleVaubois",
                "show":false
              }
            },
            "symbolSize":4,
            "x":165.43939,
            "y":339.7736,
            "attributes":{
              "modularity_class":6
            },
            "value":4,
            "category":6
          },
          {
            "id":"54",
            "name":"LtGillenormand",
            "label":{
              "normal":{
                "formatter":"LtGillenormand",
                "show":false
              }
            },
            "symbolSize":12.228573,
            "x":137.69348,
            "y":196.1069,
            "attributes":{
              "modularity_class":6
            },
            "value":12.228573,
            "category":6
          },
          {
            "id":"55",
            "name":"Marius",
            "label":{
              "normal":{
                "formatter":"Marius",
                "show":  false
              }
            },
            "symbolSize":33.37143,
            "x":206.44687,
            "y":-13.805411,
            "attributes":{
              "modularity_class":6
            },
            "value":53.37143,
            "category":6
          },
          {
            "id":"56",
            "name":"BaronessT",
            "label":{
              "normal":{
                "formatter":"BaronessT",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":194.82993,
            "y":224.78036,
            "attributes":{
              "modularity_class":6
            },
            "value":6.742859,
            "category":6
          },
          {
            "id":"57",
            "name":"Mabeuf",
            "label":{
              "normal":{
                "formatter":"Mabeuf",
                "show":  false
              }
            },
            "symbolSize":31.428574,
            "x":597.6618,
            "y":135.18481,
            "attributes":{
              "modularity_class":8
            },
            "value":21.428574,
            "category":8
          },
          {
            "id":"58",
            "name":"Enjolras",
            "label":{
              "normal":{
                "formatter":"Enjolras",
                "show":  false
              }
            },
            "symbolSize":42.4,
            "x":355.78366,
            "y":-74.882454,
            "attributes":{
              "modularity_class":8
            },
            "value":22.4,
            "category":8
          },
          {
            "id":"59",
            "name":"Combeferre",
            "label":{
              "normal":{
                "formatter":"Combeferre",
                "show":  false
              }
            },
            "symbolSize":21.428574,
            "x":515.2961,
            "y":-46.167564,
            "attributes":{
              "modularity_class":8
            },
            "value":31.428574,
            "category":8
          },
          {
            "id":"60",
            "name":"Prouvaire",
            "label":{
              "normal":{
                "formatter":"Prouvaire",
                "show":false
              }
            },
            "symbolSize":15.942856,
            "x":614.29285,
            "y":-69.3104,
            "attributes":{
              "modularity_class":8
            },
            "value":25.942856,
            "category":8
          },
          {
            "id":"61",
            "name":"Feuilly",
            "label":{
              "normal":{
                "formatter":"Feuilly",
                "show":  false
              }
            },
            "symbolSize":21.428574,
            "x":550.1917,
            "y":-128.17537,
            "attributes":{
              "modularity_class":8
            },
            "value":31.428574,
            "category":8
          },
          {
            "id":"62",
            "name":"Courfeyrac",
            "label":{
              "normal":{
                "formatter":"Courfeyrac",
                "show":  false
              }
            },
            "symbolSize":26.91429,
            "x":436.17184,
            "y":-12.7286825,
            "attributes":{
              "modularity_class":8
            },
            "value":36.91429,
            "category":8
          },
          {
            "id":"63",
            "name":"Bahorel",
            "label":{
              "normal":{
                "formatter":"Bahorel",
                "show":  false
              }
            },
            "symbolSize":24.17143,
            "x":602.55225,
            "y":16.421427,
            "attributes":{
              "modularity_class":8
            },
            "value":34.17143,
            "category":8
          },
          {
            "id":"64",
            "name":"Bossuet",
            "label":{
              "normal":{
                "formatter":"Bossuet",
                "show":  false
              }
            },
            "symbolSize":26.91429,
            "x":455.81955,
            "y":-115.45826,
            "attributes":{
              "modularity_class":8
            },
            "value":36.91429,
            "category":8
          },
          {
            "id":"65",
            "name":"Joly",
            "label":{
              "normal":{
                "formatter":"Joly",
                "show":  false
              }
            },
            "symbolSize":24.17143,
            "x":516.40784,
            "y":47.242233,
            "attributes":{
              "modularity_class":8
            },
            "value":34.17143,
            "category":8
          },
          {
            "id":"66",
            "name":"Grantaire",
            "label":{
              "normal":{
                "formatter":"Grantaire",
                "show":false
              }
            },
            "symbolSize":28.685715,
            "x":646.4313,
            "y":-151.06331,
            "attributes":{
              "modularity_class":8
            },
            "value":28.685715,
            "category":8
          },
          {
            "id":"67",
            "name":"MotherPlutarch",
            "label":{
              "normal":{
                "formatter":"MotherPlutarch",
                "show":false
              }
            },
            "symbolSize":4,
            "x":668.9568,
            "y":204.65488,
            "attributes":{
              "modularity_class":8
            },
            "value":4,
            "category":8
          },
          {
            "id":"68",
            "name":"Gueulemer",
            "label":{
              "normal":{
                "formatter":"Gueulemer",
                "show":false
              }
            },
            "symbolSize":28.685715,
            "x":78.4799,
            "y":-347.15146,
            "attributes":{
              "modularity_class":7
            },
            "value":28.685715,
            "category":7
          },
          {
            "id":"69",
            "name":"Babet",
            "label":{
              "normal":{
                "formatter":"Babet",
                "show":false
              }
            },
            "symbolSize":28.685715,
            "x":150.35959,
            "y":-298.50797,
            "attributes":{
              "modularity_class":7
            },
            "value":28.685715,
            "category":7
          },
          {
            "id":"70",
            "name":"Claquesous",
            "label":{
              "normal":{
                "formatter":"Claquesous",
                "show":false
              }
            },
            "symbolSize":28.685715,
            "x":137.3717,
            "y":-410.2809,
            "attributes":{
              "modularity_class":7
            },
            "value":28.685715,
            "category":7
          },
          {
            "id":"71",
            "name":"Montparnasse",
            "label":{
              "normal":{
                "formatter":"Montparnasse",
                "show":false
              }
            },
            "symbolSize":25.942856,
            "x":234.87747,
            "y":-400.85983,
            "attributes":{
              "modularity_class":7
            },
            "value":25.942856,
            "category":7
          },
          {
            "id":"72",
            "name":"Toussaint",
            "label":{
              "normal":{
                "formatter":"Toussaint",
                "show":false
              }
            },
            "symbolSize":9.485714,
            "x":40.942253,
            "y":113.78272,
            "attributes":{
              "modularity_class":1
            },
            "value":9.485714,
            "category":1
          },
          {
            "id":"73",
            "name":"Child1",
            "label":{
              "normal":{
                "formatter":"Child1",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":437.939,
            "y":291.58234,
            "attributes":{
              "modularity_class":8
            },
            "value":6.742859,
            "category":8
          },
          {
            "id":"74",
            "name":"Child2",
            "label":{
              "normal":{
                "formatter":"Child2",
                "show":false
              }
            },
            "symbolSize":6.742859,
            "x":466.04922,
            "y":283.3606,
            "attributes":{
              "modularity_class":8
            },
            "value":6.742859,
            "category":8
          },
          {
            "id":"75",
            "name":"Brujon",
            "label":{
              "normal":{
                "formatter":"Brujon",
                "show":false
              }
            },
            "symbolSize":20.457146,
            "x":238.79364,
            "y":-314.06345,
            "attributes":{
              "modularity_class":7
            },
            "value":20.457146,
            "category":7
          },
          {
            "id":"76",
            "name":"MmeHucheloup",
            "label":{
              "normal":{
                "formatter":"MmeHucheloup",
                "show":false
              }
            },
            "symbolSize":20.457146,
            "x":712.18353,
            "y":4.8131495,
            "attributes":{
              "modularity_class":8
            },
            "value":20.457146,
            "category":8
          }
        ],
        "links":[
          {
            "id":"0",
            "name":null,
            "source":"1",
            "target":"0"
          },
          {
            "id":"1",
            "name":null,
            "source":"2",
            "target":"0"
          },
          {
            "id":"2",
            "name":null,
            "source":"3",
            "target":"0"
          },
          {
            "id":"3",
            "name":null,
            "source":"3",
            "target":"2"
          },
          {
            "id":"4",
            "name":null,
            "source":"4",
            "target":"0"
          },
          {
            "id":"5",
            "name":null,
            "source":"5",
            "target":"0"
          },
          {
            "id":"6",
            "name":null,
            "source":"6",
            "target":"0"
          },
          {
            "id":"7",
            "name":null,
            "source":"7",
            "target":"0"
          },
          {
            "id":"8",
            "name":null,
            "source":"8",
            "target":"0"
          },
          {
            "id":"9",
            "name":null,
            "source":"9",
            "target":"0"
          },
          {
            "id":"13",
            "name":null,
            "source":"11",
            "target":"0"
          },
          {
            "id":null,
            "name":null,
            "source":"11",
            "target":"2"
          },
          {
            "id":"11",
            "name":null,
            "source":"11",
            "target":"3"
          },
          {
            "id":"10",
            "name":null,
            "source":"11",
            "target":"10"
          },
          {
            "id":"14",
            "name":null,
            "source":"12",
            "target":"11"
          },
          {
            "id":"15",
            "name":null,
            "source":"13",
            "target":"11"
          },
          {
            "id":"16",
            "name":null,
            "source":"14",
            "target":"11"
          },
          {
            "id":"17",
            "name":null,
            "source":"15",
            "target":"11"
          },
          {
            "id":"18",
            "name":null,
            "source":"17",
            "target":"16"
          },
          {
            "id":"19",
            "name":null,
            "source":"18",
            "target":"16"
          },
          {
            "id":"20",
            "name":null,
            "source":"18",
            "target":"17"
          },
          {
            "id":"21",
            "name":null,
            "source":"19",
            "target":"16"
          },
          {
            "id":"22",
            "name":null,
            "source":"19",
            "target":"17"
          },
          {
            "id":"23",
            "name":null,
            "source":"19",
            "target":"18"
          },
          {
            "id":"24",
            "name":null,
            "source":"20",
            "target":"16"
          },
          {
            "id":"25",
            "name":null,
            "source":"20",
            "target":"17"
          },
          {
            "id":"26",
            "name":null,
            "source":"20",
            "target":"18"
          },
          {
            "id":"27",
            "name":null,
            "source":"20",
            "target":"19"
          },
          {
            "id":"28",
            "name":null,
            "source":"21",
            "target":"16"
          },
          {
            "id":"29",
            "name":null,
            "source":"21",
            "target":"17"
          },
          {
            "id":"30",
            "name":null,
            "source":"21",
            "target":"18"
          },
          {
            "id":"31",
            "name":null,
            "source":"21",
            "target":"19"
          },
          {
            "id":"32",
            "name":null,
            "source":"21",
            "target":"20"
          },
          {
            "id":"33",
            "name":null,
            "source":"22",
            "target":"16"
          },
          {
            "id":"34",
            "name":null,
            "source":"22",
            "target":"17"
          },
          {
            "id":"35",
            "name":null,
            "source":"22",
            "target":"18"
          },
          {
            "id":"36",
            "name":null,
            "source":"22",
            "target":"19"
          },
          {
            "id":"37",
            "name":null,
            "source":"22",
            "target":"20"
          },
          {
            "id":"38",
            "name":null,
            "source":"22",
            "target":"21"
          },
          {
            "id":"47",
            "name":null,
            "source":"23",
            "target":"11"
          },
          {
            "id":"46",
            "name":null,
            "source":"23",
            "target":"12"
          },
          {
            "id":"39",
            "name":null,
            "source":"23",
            "target":"16"
          },
          {
            "id":"40",
            "name":null,
            "source":"23",
            "target":"17"
          },
          {
            "id":"41",
            "name":null,
            "source":"23",
            "target":"18"
          },
          {
            "id":"42",
            "name":null,
            "source":"23",
            "target":"19"
          },
          {
            "id":"43",
            "name":null,
            "source":"23",
            "target":"20"
          },
          {
            "id":"44",
            "name":null,
            "source":"23",
            "target":"21"
          },
          {
            "id":"45",
            "name":null,
            "source":"23",
            "target":"22"
          },
          {
            "id":null,
            "name":null,
            "source":"24",
            "target":"11"
          },
          {
            "id":"48",
            "name":null,
            "source":"24",
            "target":"23"
          },
          {
            "id":"52",
            "name":null,
            "source":"25",
            "target":"11"
          },
          {
            "id":"51",
            "name":null,
            "source":"25",
            "target":"23"
          },
          {
            "id":"50",
            "name":null,
            "source":"25",
            "target":"24"
          },
          {
            "id":null,
            "name":null,
            "source":"26",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"26",
            "target":"16"
          },
          {
            "id":"53",
            "name":null,
            "source":"26",
            "target":"24"
          },
          {
            "id":"56",
            "name":null,
            "source":"26",
            "target":"25"
          },
          {
            "id":"57",
            "name":null,
            "source":"27",
            "target":"11"
          },
          {
            "id":"58",
            "name":null,
            "source":"27",
            "target":"23"
          },
          {
            "id":null,
            "name":null,
            "source":"27",
            "target":"24"
          },
          {
            "id":"59",
            "name":null,
            "source":"27",
            "target":"25"
          },
          {
            "id":"61",
            "name":null,
            "source":"27",
            "target":"26"
          },
          {
            "id":"62",
            "name":null,
            "source":"28",
            "target":"11"
          },
          {
            "id":"63",
            "name":null,
            "source":"28",
            "target":"27"
          },
          {
            "id":"66",
            "name":null,
            "source":"29",
            "target":"11"
          },
          {
            "id":"64",
            "name":null,
            "source":"29",
            "target":"23"
          },
          {
            "id":"65",
            "name":null,
            "source":"29",
            "target":"27"
          },
          {
            "id":"67",
            "name":null,
            "source":"30",
            "target":"23"
          },
          {
            "id":null,
            "name":null,
            "source":"31",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"31",
            "target":"23"
          },
          {
            "id":null,
            "name":null,
            "source":"31",
            "target":"27"
          },
          {
            "id":"68",
            "name":null,
            "source":"31",
            "target":"30"
          },
          {
            "id":"72",
            "name":null,
            "source":"32",
            "target":"11"
          },
          {
            "id":"73",
            "name":null,
            "source":"33",
            "target":"11"
          },
          {
            "id":"74",
            "name":null,
            "source":"33",
            "target":"27"
          },
          {
            "id":"75",
            "name":null,
            "source":"34",
            "target":"11"
          },
          {
            "id":"76",
            "name":null,
            "source":"34",
            "target":"29"
          },
          {
            "id":"77",
            "name":null,
            "source":"35",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"35",
            "target":"29"
          },
          {
            "id":"78",
            "name":null,
            "source":"35",
            "target":"34"
          },
          {
            "id":"82",
            "name":null,
            "source":"36",
            "target":"11"
          },
          {
            "id":"83",
            "name":null,
            "source":"36",
            "target":"29"
          },
          {
            "id":"80",
            "name":null,
            "source":"36",
            "target":"34"
          },
          {
            "id":"81",
            "name":null,
            "source":"36",
            "target":"35"
          },
          {
            "id":"87",
            "name":null,
            "source":"37",
            "target":"11"
          },
          {
            "id":"88",
            "name":null,
            "source":"37",
            "target":"29"
          },
          {
            "id":"84",
            "name":null,
            "source":"37",
            "target":"34"
          },
          {
            "id":"85",
            "name":null,
            "source":"37",
            "target":"35"
          },
          {
            "id":"86",
            "name":null,
            "source":"37",
            "target":"36"
          },
          {
            "id":"93",
            "name":null,
            "source":"38",
            "target":"11"
          },
          {
            "id":"94",
            "name":null,
            "source":"38",
            "target":"29"
          },
          {
            "id":"89",
            "name":null,
            "source":"38",
            "target":"34"
          },
          {
            "id":"90",
            "name":null,
            "source":"38",
            "target":"35"
          },
          {
            "id":"91",
            "name":null,
            "source":"38",
            "target":"36"
          },
          {
            "id":"92",
            "name":null,
            "source":"38",
            "target":"37"
          },
          {
            "id":"95",
            "name":null,
            "source":"39",
            "target":"25"
          },
          {
            "id":"96",
            "name":null,
            "source":"40",
            "target":"25"
          },
          {
            "id":"97",
            "name":null,
            "source":"41",
            "target":"24"
          },
          {
            "id":"98",
            "name":null,
            "source":"41",
            "target":"25"
          },
          {
            "id":"101",
            "name":null,
            "source":"42",
            "target":"24"
          },
          {
            "id":"100",
            "name":null,
            "source":"42",
            "target":"25"
          },
          {
            "id":"99",
            "name":null,
            "source":"42",
            "target":"41"
          },
          {
            "id":"102",
            "name":null,
            "source":"43",
            "target":"11"
          },
          {
            "id":"103",
            "name":null,
            "source":"43",
            "target":"26"
          },
          {
            "id":"104",
            "name":null,
            "source":"43",
            "target":"27"
          },
          {
            "id":null,
            "name":null,
            "source":"44",
            "target":"11"
          },
          {
            "id":"105",
            "name":null,
            "source":"44",
            "target":"28"
          },
          {
            "id":"107",
            "name":null,
            "source":"45",
            "target":"28"
          },
          {
            "id":"108",
            "name":null,
            "source":"47",
            "target":"46"
          },
          {
            "id":"112",
            "name":null,
            "source":"48",
            "target":"11"
          },
          {
            "id":"110",
            "name":null,
            "source":"48",
            "target":"25"
          },
          {
            "id":"111",
            "name":null,
            "source":"48",
            "target":"27"
          },
          {
            "id":"109",
            "name":null,
            "source":"48",
            "target":"47"
          },
          {
            "id":null,
            "name":null,
            "source":"49",
            "target":"11"
          },
          {
            "id":"113",
            "name":null,
            "source":"49",
            "target":"26"
          },
          {
            "id":null,
            "name":null,
            "source":"50",
            "target":"24"
          },
          {
            "id":"115",
            "name":null,
            "source":"50",
            "target":"49"
          },
          {
            "id":"119",
            "name":null,
            "source":"51",
            "target":"11"
          },
          {
            "id":"118",
            "name":null,
            "source":"51",
            "target":"26"
          },
          {
            "id":"117",
            "name":null,
            "source":"51",
            "target":"49"
          },
          {
            "id":null,
            "name":null,
            "source":"52",
            "target":"39"
          },
          {
            "id":"120",
            "name":null,
            "source":"52",
            "target":"51"
          },
          {
            "id":"122",
            "name":null,
            "source":"53",
            "target":"51"
          },
          {
            "id":"125",
            "name":null,
            "source":"54",
            "target":"26"
          },
          {
            "id":"124",
            "name":null,
            "source":"54",
            "target":"49"
          },
          {
            "id":"123",
            "name":null,
            "source":"54",
            "target":"51"
          },
          {
            "id":"131",
            "name":null,
            "source":"55",
            "target":"11"
          },
          {
            "id":"132",
            "name":null,
            "source":"55",
            "target":"16"
          },
          {
            "id":"133",
            "name":null,
            "source":"55",
            "target":"25"
          },
          {
            "id":null,
            "name":null,
            "source":"55",
            "target":"26"
          },
          {
            "id":"128",
            "name":null,
            "source":"55",
            "target":"39"
          },
          {
            "id":"134",
            "name":null,
            "source":"55",
            "target":"41"
          },
          {
            "id":"135",
            "name":null,
            "source":"55",
            "target":"48"
          },
          {
            "id":"127",
            "name":null,
            "source":"55",
            "target":"49"
          },
          {
            "id":"126",
            "name":null,
            "source":"55",
            "target":"51"
          },
          {
            "id":"129",
            "name":null,
            "source":"55",
            "target":"54"
          },
          {
            "id":"136",
            "name":null,
            "source":"56",
            "target":"49"
          },
          {
            "id":"137",
            "name":null,
            "source":"56",
            "target":"55"
          },
          {
            "id":null,
            "name":null,
            "source":"57",
            "target":"41"
          },
          {
            "id":null,
            "name":null,
            "source":"57",
            "target":"48"
          },
          {
            "id":"138",
            "name":null,
            "source":"57",
            "target":"55"
          },
          {
            "id":"145",
            "name":null,
            "source":"58",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"58",
            "target":"27"
          },
          {
            "id":"142",
            "name":null,
            "source":"58",
            "target":"48"
          },
          {
            "id":"141",
            "name":null,
            "source":"58",
            "target":"55"
          },
          {
            "id":"144",
            "name":null,
            "source":"58",
            "target":"57"
          },
          {
            "id":"148",
            "name":null,
            "source":"59",
            "target":"48"
          },
          {
            "id":"147",
            "name":null,
            "source":"59",
            "target":"55"
          },
          {
            "id":null,
            "name":null,
            "source":"59",
            "target":"57"
          },
          {
            "id":"146",
            "name":null,
            "source":"59",
            "target":"58"
          },
          {
            "id":"150",
            "name":null,
            "source":"60",
            "target":"48"
          },
          {
            "id":"151",
            "name":null,
            "source":"60",
            "target":"58"
          },
          {
            "id":"152",
            "name":null,
            "source":"60",
            "target":"59"
          },
          {
            "id":"153",
            "name":null,
            "source":"61",
            "target":"48"
          },
          {
            "id":"158",
            "name":null,
            "source":"61",
            "target":"55"
          },
          {
            "id":"157",
            "name":null,
            "source":"61",
            "target":"57"
          },
          {
            "id":"154",
            "name":null,
            "source":"61",
            "target":"58"
          },
          {
            "id":"156",
            "name":null,
            "source":"61",
            "target":"59"
          },
          {
            "id":"155",
            "name":null,
            "source":"61",
            "target":"60"
          },
          {
            "id":"164",
            "name":null,
            "source":"62",
            "target":"41"
          },
          {
            "id":"162",
            "name":null,
            "source":"62",
            "target":"48"
          },
          {
            "id":"159",
            "name":null,
            "source":"62",
            "target":"55"
          },
          {
            "id":null,
            "name":null,
            "source":"62",
            "target":"57"
          },
          {
            "id":"160",
            "name":null,
            "source":"62",
            "target":"58"
          },
          {
            "id":"161",
            "name":null,
            "source":"62",
            "target":"59"
          },
          {
            "id":null,
            "name":null,
            "source":"62",
            "target":"60"
          },
          {
            "id":"165",
            "name":null,
            "source":"62",
            "target":"61"
          },
          {
            "id":null,
            "name":null,
            "source":"63",
            "target":"48"
          },
          {
            "id":"174",
            "name":null,
            "source":"63",
            "target":"55"
          },
          {
            "id":null,
            "name":null,
            "source":"63",
            "target":"57"
          },
          {
            "id":null,
            "name":null,
            "source":"63",
            "target":"58"
          },
          {
            "id":"167",
            "name":null,
            "source":"63",
            "target":"59"
          },
          {
            "id":null,
            "name":null,
            "source":"63",
            "target":"60"
          },
          {
            "id":"172",
            "name":null,
            "source":"63",
            "target":"61"
          },
          {
            "id":"169",
            "name":null,
            "source":"63",
            "target":"62"
          },
          {
            "id":"184",
            "name":null,
            "source":"64",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"64",
            "target":"48"
          },
          {
            "id":"175",
            "name":null,
            "source":"64",
            "target":"55"
          },
          {
            "id":"183",
            "name":null,
            "source":"64",
            "target":"57"
          },
          {
            "id":"179",
            "name":null,
            "source":"64",
            "target":"58"
          },
          {
            "id":"182",
            "name":null,
            "source":"64",
            "target":"59"
          },
          {
            "id":"181",
            "name":null,
            "source":"64",
            "target":"60"
          },
          {
            "id":"180",
            "name":null,
            "source":"64",
            "target":"61"
          },
          {
            "id":"176",
            "name":null,
            "source":"64",
            "target":"62"
          },
          {
            "id":"178",
            "name":null,
            "source":"64",
            "target":"63"
          },
          {
            "id":"187",
            "name":null,
            "source":"65",
            "target":"48"
          },
          {
            "id":"194",
            "name":null,
            "source":"65",
            "target":"55"
          },
          {
            "id":"193",
            "name":null,
            "source":"65",
            "target":"57"
          },
          {
            "id":null,
            "name":null,
            "source":"65",
            "target":"58"
          },
          {
            "id":"192",
            "name":null,
            "source":"65",
            "target":"59"
          },
          {
            "id":null,
            "name":null,
            "source":"65",
            "target":"60"
          },
          {
            "id":"190",
            "name":null,
            "source":"65",
            "target":"61"
          },
          {
            "id":"188",
            "name":null,
            "source":"65",
            "target":"62"
          },
          {
            "id":"185",
            "name":null,
            "source":"65",
            "target":"63"
          },
          {
            "id":"186",
            "name":null,
            "source":"65",
            "target":"64"
          },
          {
            "id":"200",
            "name":null,
            "source":"66",
            "target":"48"
          },
          {
            "id":"196",
            "name":null,
            "source":"66",
            "target":"58"
          },
          {
            "id":"197",
            "name":null,
            "source":"66",
            "target":"59"
          },
          {
            "id":"203",
            "name":null,
            "source":"66",
            "target":"60"
          },
          {
            "id":"202",
            "name":null,
            "source":"66",
            "target":"61"
          },
          {
            "id":"198",
            "name":null,
            "source":"66",
            "target":"62"
          },
          {
            "id":"201",
            "name":null,
            "source":"66",
            "target":"63"
          },
          {
            "id":"195",
            "name":null,
            "source":"66",
            "target":"64"
          },
          {
            "id":"199",
            "name":null,
            "source":"66",
            "target":"65"
          },
          {
            "id":"204",
            "name":null,
            "source":"67",
            "target":"57"
          },
          {
            "id":null,
            "name":null,
            "source":"68",
            "target":"11"
          },
          {
            "id":null,
            "name":null,
            "source":"68",
            "target":"24"
          },
          {
            "id":"205",
            "name":null,
            "source":"68",
            "target":"25"
          },
          {
            "id":"208",
            "name":null,
            "source":"68",
            "target":"27"
          },
          {
            "id":null,
            "name":null,
            "source":"68",
            "target":"41"
          },
          {
            "id":"209",
            "name":null,
            "source":"68",
            "target":"48"
          },
          {
            "id":"213",
            "name":null,
            "source":"69",
            "target":"11"
          },
          {
            "id":"214",
            "name":null,
            "source":"69",
            "target":"24"
          },
          {
            "id":"211",
            "name":null,
            "source":"69",
            "target":"25"
          },
          {
            "id":null,
            "name":null,
            "source":"69",
            "target":"27"
          },
          {
            "id":"217",
            "name":null,
            "source":"69",
            "target":"41"
          },
          {
            "id":"216",
            "name":null,
            "source":"69",
            "target":"48"
          },
          {
            "id":"212",
            "name":null,
            "source":"69",
            "target":"68"
          },
          {
            "id":"221",
            "name":null,
            "source":"70",
            "target":"11"
          },
          {
            "id":"222",
            "name":null,
            "source":"70",
            "target":"24"
          },
          {
            "id":"218",
            "name":null,
            "source":"70",
            "target":"25"
          },
          {
            "id":"223",
            "name":null,
            "source":"70",
            "target":"27"
          },
          {
            "id":"224",
            "name":null,
            "source":"70",
            "target":"41"
          },
          {
            "id":"225",
            "name":null,
            "source":"70",
            "target":"58"
          },
          {
            "id":"220",
            "name":null,
            "source":"70",
            "target":"68"
          },
          {
            "id":"219",
            "name":null,
            "source":"70",
            "target":"69"
          },
          {
            "id":"230",
            "name":null,
            "source":"71",
            "target":"11"
          },
          {
            "id":"233",
            "name":null,
            "source":"71",
            "target":"25"
          },
          {
            "id":"226",
            "name":null,
            "source":"71",
            "target":"27"
          },
          {
            "id":"232",
            "name":null,
            "source":"71",
            "target":"41"
          },
          {
            "id":null,
            "name":null,
            "source":"71",
            "target":"48"
          },
          {
            "id":"228",
            "name":null,
            "source":"71",
            "target":"68"
          },
          {
            "id":"227",
            "name":null,
            "source":"71",
            "target":"69"
          },
          {
            "id":"229",
            "name":null,
            "source":"71",
            "target":"70"
          },
          {
            "id":"236",
            "name":null,
            "source":"72",
            "target":"11"
          },
          {
            "id":"234",
            "name":null,
            "source":"72",
            "target":"26"
          },
          {
            "id":"235",
            "name":null,
            "source":"72",
            "target":"27"
          },
          {
            "id":"237",
            "name":null,
            "source":"73",
            "target":"48"
          },
          {
            "id":"238",
            "name":null,
            "source":"74",
            "target":"48"
          },
          {
            "id":"239",
            "name":null,
            "source":"74",
            "target":"73"
          },
          {
            "id":"242",
            "name":null,
            "source":"75",
            "target":"25"
          },
          {
            "id":"244",
            "name":null,
            "source":"75",
            "target":"41"
          },
          {
            "id":null,
            "name":null,
            "source":"75",
            "target":"48"
          },
          {
            "id":"241",
            "name":null,
            "source":"75",
            "target":"68"
          },
          {
            "id":"240",
            "name":null,
            "source":"75",
            "target":"69"
          },
          {
            "id":"245",
            "name":null,
            "source":"75",
            "target":"70"
          },
          {
            "id":"246",
            "name":null,
            "source":"75",
            "target":"71"
          },
          {
            "id":"252",
            "name":null,
            "source":"76",
            "target":"48"
          },
          {
            "id":"253",
            "name":null,
            "source":"76",
            "target":"58"
          },
          {
            "id":"251",
            "name":null,
            "source":"76",
            "target":"62"
          },
          {
            "id":"250",
            "name":null,
            "source":"76",
            "target":"63"
          },
          {
            "id":"247",
            "name":null,
            "source":"76",
            "target":"64"
          },
          {
            "id":"248",
            "name":null,
            "source":"76",
            "target":"65"
          },
          {
            "id":"249",
            "name":null,
            "source":"76",
            "target":"66"
          }
        ],
        "categories":[
          {
            "name":"Category 0"
          },
          {
            "name":"Category 1"
          },
          {
            "name":"Category 2"
          },
          {
            "name":"Category 3"
          },
          {
            "name":"Category 4"
          },
          {
            "name":"Category 5"
          },
          {
            "name":"Category 6"
          },
          {
            "name":"Category 7"
          },
          {
            "name":"Category 8"
          }
        ],
        "label":{
          "normal":{
            "position":"right"
          }
        },
        "symbol": "circle",
        "itemStyle": {
          normal: {
            opacity: 0.8
          }
        },
        lineStyle: {
          normal: {
            curveness: 0.3
          }
        }
      }
    ]
  }, {
    title: {
      text: 'Heatmap'
    },
    xAxis: {
      type: 'category',
      data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a', '12p']
    },
    yAxis: {
      type: 'category',
      data: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun']
    },
    visualMap: {
      min: 1,
      max: 10,
      calculable: true
    },
    grid: {
      left: 90,
      right: 20,
      top: 40,
      bottom: 40
    },
    series: [{
      name: 'Heat',
      type: 'heatmap',
      data: (function() {
        var data = [[0,0,5],[0,1,1],[0,2,3],[0,3,2],[0,4,1],[0,5,4],[0,6,6],
          [0,7,6],[0,8,4],[0,9,7],[0,10,0],[0,11,2],[1,0,7],[1,1,0],[1,2,0],
          [1,3,0],[1,4,5],[1,5,7],[1,6,9],[1,7,4],[1,8,7],[1,9,9],[1,10,5],
          [1,11,2],[2,0,7],[2,1,6],[2,2,5],[2,3,5],[2,4,9],[2,5,8],[2,6,0],
          [2,7,0],[2,8,0],[2,9,4],[2,10,3],[2,11,2],[3,0,7],[3,1,3],[3,2,0],
          [3,3,0],[3,4,3],[3,5,0],[3,6,4],[3,7,5],[3,8,1],[3,9,3],[3,10,5],
          [3,11,4],[3,12,7],[4,0,6],[4,1,3],[4,2,6],[4,3,0],[4,4,5],[4,5,1],
          [4,6,0],[4,7,0],[4,8,5],[4,9,2],[4,10,4],[4,11,4],[5,0,2],[5,1,1],
          [5,2,0],[5,3,3],[5,4,8],[5,5,4],[5,6,6],[5,7,0],[5,8,2],[5,9,0],
          [5,10,4],[5,11,1],[6,0,1],[6,1,0],[6,2,8],[6,3,6],[6,4,2],[6,5,0],
          [6,6,0],[6,7,8],[6,8,5],[6,9,10],[6,10,1],[6,11,0]];
        return data.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });
      })(),
      label: {
        normal: {
          show: true
        }
      }
    }]
  }, {
    title: {
      text: 'Tree'
    },
    series: [{
      type: 'treemap',
      label: {
        show: true,
        formatter: '{b}'
      },
      roam: false,
      data: (function() {
        var data = [];
        for (var i = 0; i < groupCnt; ++i) {
          var children = [];
          var cSum = 0;
          for (var c = 0, clen = Math.ceil(Math.random() * 5); c < clen; ++c) {
            var grand = [];
            var gSum = 0;
            for (var g = 0, glen = Math.ceil(Math.random() * 3); g < glen;
              ++g) {
              var v = Math.ceil(Math.random() * 100);
              grand.push({
                value: v,
                name: (i + 1) + '-' + (c + 1) + '-' + (g + 1),
                path: (i + 1) + '/' + (i + 1) + '-' + (c + 1) + '/' +
                  (i + 1) + '-' + (c + 1) + '-' + (g + 1)
              });
              gSum += v;
            }
            children.push({
              value: gSum,
              name: (i + 1) + '-' + (c + 1),
              path: (i + 1) + '/' + (i + 1) + '-' + (c + 1),
              children: grand
            });
            cSum += gSum;
          }
          data.push({
            value: cSum,
            name: '' + (i + 1),
            path: '' + (i + 1),
            children: children
          });
        }
        return data;
      })()
    }]
  }];

  for (var i = 0; i < options.length; ++i) {
    options[i].legend = options[i].legend || legend;
    options[i].tooltip = options[i].tooltip || tooltip;
    options[i].grid = options[i].grid || grid;
  }
  return options;
}
