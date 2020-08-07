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

Update the echarts-www project path in `config/env.js` before run

```bash
npm run release
```

It will generate the contents to the `_generated` folder of echarts-www. Then run release in echarts-www.
