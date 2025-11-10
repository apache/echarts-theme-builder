# Apache ECharts Theme Builder

Design your own theme for Apache ECharts.

[Online Theme Builder](https://echarts.apache.org/theme-builder.html)

[![Build and Deploy](https://github.com/apache/echarts-theme-builder/actions/workflows/deploy.yml/badge.svg)](https://github.com/apache/echarts-theme-builder/actions/workflows/deploy.yml)


## Build

```bash
npm i
npm run build
```

## Release to echarts-www

Update the [echarts-www](https://github.com/apache/echarts-www) and [echarts-website](https://github.com/apache/echarts-website) project path in `config/env.asf.js` before run

```bash
npm run release
```

It will generate the html to the `_generated` folder of [echarts-www](https://github.com/apache/echarts-www) and other resources to the [echarts-website](https://github.com/apache/echarts-website) folder.
