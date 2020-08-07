# ECharts-Theme-Builder

Design your own theme for ECharts

[Online Theme Builder](https://echartsjs.com/theme-builder/)

![](https://raw.githubusercontent.com/Ovilia/ECharts-Theme-Builder/master/assets/essos.png)

## Build

```bash
npm install
npm run build
```

## Release to echarts-www

Update the echarts-www and incubator-echarts-website project path in `config/env.asf.js` before run

```bash
npm run release
```

It will generate the html to the `_generated` folder of echarts-www. And other resources to the incubator-echarts-website folder
