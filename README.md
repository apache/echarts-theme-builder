# Apache ECharts Theme Builder

## Dependencies

- TypeScript
- Vue 3
- Element Plus
- Vite

## Structure

- `index.html` Entry HTML that for development preview usage
- `body.html` Body HTML that will be final integrated when deploying
- `src` Source folder.
- `dist` Distribution folder. It will be copied when deploying.

## Recommanded Environment

- VSCode + Volar

Vetur need to be disabled in this workspace because it's not support [setup](https://github.com/vuejs/rfcs/pull/227) feature yet.
You can replace the code using [setup](https://github.com/vuejs/rfcs/pull/227) feature if you don't like it.

## Use

Get boilerplate

```shell
degit pissang/echarts-www-spa-boilerplate yourProjectName
```

Install

```shell
npm i
```

Start dev

```shell
npm run dev
```

Release

```shell
npm run release
```

## Create a Page in echarts-www

```shell
cd echarts-www
npm run create:page
```

- Project Name: Name of this project. It will be used to locate the project folder.
- Page Name: Page name of this tool. Page URL will be `https://echarts.apache.org/zh/${pageName}/index.html`.
- Page Title: Title of this page tool.
- Page Chinese Title: Chinese title of this page tool.

## Global Variables from echarts-www

- `ECHARTS_WEBSITE_LANGUAGE`

Language of page. Can be 'zh' or 'en'
