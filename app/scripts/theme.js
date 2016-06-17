(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('theme', {
        "color": [
            "#293c55",
            "#a9334c",
            "#3095c6"
        ],
        "backgroundColor": "#fff",
        "textStyle": {
            "color": "#999"
        },
        "title": {
            "textStyle": {
                "color": "#333"
            },
            "subtextStyle": {
                "color": "#666"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 2
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": 8,
            "symbol": "emptyCircle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 2
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": 8,
            "symbol": "emptyCircle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#e43c59",
                    "color0": "#fff",
                    "borderColor": "#a9334c",
                    "borderColor0": "#3095c6",
                    "borderWidth": 1
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaa"
                }
            },
            "symbolSize": 8,
            "symbol": "emptyCircle",
            "smooth": false,
            "color": [
                "#293c55",
                "#a9334c",
                "#3095c6"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eee"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#ececec",
                    "borderColor": "#999",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "#ddd",
                    "borderColor": "#888",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#333"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#333"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#ececec",
                    "borderColor": "#999",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "#ddd",
                    "borderColor": "#888",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#333"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#333"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ddd"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#666"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "#efefef"
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": "#fff"
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ddd"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#666"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "#efefef"
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": "#fff"
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ddd"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#666"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "#efefef"
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": "#fff"
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ddd"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#666"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#999"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "#efefef"
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": "#fff"
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999"
                },
                "emphasis": {
                    "borderColor": "#666"
                }
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#ccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#ccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#293c55",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#293c55",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#a9334c"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#293c55",
                    "borderColor": "#293c55",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#e43c59",
                "borderColor": "rgba(194,53,49, 0.5)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#293c55"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#a9334c",
                "#eddcdf"
            ]
        },
        "dataZoom": {
            "backgroundColor": "#fff",
            "dataBackgroundColor": "#ccc",
            "fillerColor": "rgba(194,53,49, 0.1)",
            "handleColor": "#bbb",
            "handleSize": "100%",
            "textStyle": {
                "color": "#999"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eee"
                    }
                }
            }
        }
    });
}));
