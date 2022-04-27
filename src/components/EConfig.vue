<template>
  <el-collapse value="core" :accordion="true">
    <el-collapse-item title="核心功能" name="core">
      <div class="item-row">
        <el-button-group>
          <el-button type="primary" @click="download()">
            <el-icon><download /></el-icon>
            下载主题
          </el-button>
          <el-button>
            <el-icon><bottom-right /></el-icon>
            导入配置
          </el-button>
          <el-button>
            <el-icon><top-right /></el-icon>
            导出配置
          </el-button>
        </el-button-group>
      </div>
      <div class="item-row">
        <el-button-group>
          <el-button>
            <el-icon><refresh /></el-icon>
            刷新
          </el-button>
          <el-button>
            <el-icon><refresh-left /></el-icon>
            复原
          </el-button>
          <el-button>
            <el-icon><question-filled /></el-icon>
            帮助
          </el-button>
        </el-button-group>
      </div>
      <div class="item-row-lg">
        <el-row>
          <el-col :span="columnSize.left">
            <h5>主题名称</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input
              placeholder="custom"
              size="medium"
              v-model="themeName"
              @change="onConfigChange"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="columnSize.left">
            <h5>系列数量</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input
              placeholder="5"
              size="medium"
              v-model="seriesCount"
              @change="onConfigChange"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </el-collapse-item>

    <el-collapse-item
      v-for="group in configs"
      :key="group.groupName"
      :title="group.groupName"
      :name="group.groupName"
    >
      <el-row v-for="item in group.items" :key="item.name" :name="item.name">
        <el-col :span="columnSize.left">
          <el-checkbox
            v-if="item.showOptionPath"
            v-model="item.isShow"
            @change="onConfigChange"
          >
            {{ item.name }}
          </el-checkbox>
          <h5 v-else>{{ item.name }}</h5>
        </el-col>
        <el-col :span="columnSize.right">
          <el-checkbox
            v-if="item.type === 'boolean'"
            v-model="item.value"
            @change="onConfigChange"
          >
            {{ item.name }}
          </el-checkbox>
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.value"
            @change="onConfigChange"
          >
            <el-option
              v-for="option in item.selectOptions"
              :key="option.value"
              :label="option.name"
              :value="option.value"
            >
            </el-option>
          </el-select>
          <div v-else-if="item.type === 'color'">
            <div v-if="item.multipleColor">
              <div v-for="(v, id) in item.value" v-bind:key="v.key">
                <div class="color-picker">
                  <el-color-picker
                    v-model="item.value[id]"
                    size="small"
                    @change="onConfigChange"
                  >
                  </el-color-picker>
                </div>
                <div class="color-input">
                  <el-input
                    size="medium"
                    v-model="item.value[id]"
                    @change="onConfigChange"
                  >
                  </el-input>
                </div>
              </div>
              <div class="color-operations">
                <el-button
                  v-on:click="addColor(item)"
                  icon="el-icon-plus"
                  size="small"
                >
                  <el-icon><plus /></el-icon>
                  增加
                </el-button>
                <el-button v-on:click="removeColor(item)" size="small">
                  <el-icon><minus /></el-icon>
                  减少
                </el-button>
              </div>
            </div>
            <div v-else>
              <div class="color-picker">
                <el-color-picker
                  v-model="item.value"
                  size="small"
                  @change="onConfigChange"
                >
                </el-color-picker>
              </div>
              <div class="color-input">
                <el-input
                  size="medium"
                  v-model="item.value"
                  @change="onConfigChange"
                >
                </el-input>
              </div>
            </div>
          </div>
          <el-input
            v-else
            size="medium"
            v-model="item.value"
            @change="onConfigChange"
          ></el-input>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { tr } from 'element-plus/lib/locale';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  optionPathAlias,
  Theme,
  ThemeConfigItem,
  themeConfigs
} from '../data/themeConfigs';

const emit = defineEmits(['configChange']);
defineExpose({
  getTheme
});

const themeName = ref('custom');
const seriesCount = ref('5');

const configs = ref(themeConfigs);
const columnSize = {
  left: 10,
  right: 14
};

function onConfigChange() {
  emit('configChange');
}

function addColor(item: ThemeConfigItem) {
  if (typeof item.value === 'object') {
    item.value.push('#000');
  }
  onConfigChange();
}

function removeColor(item: ThemeConfigItem) {
  if (typeof item.value === 'object') {
    item.value.splice(-1, 1);
  }
  onConfigChange();
}

function download() {
  const theme = getTheme();
  saveJsonFile(theme, themeName.value);
}

function getTheme(): Theme {
  function searchPath(
    optionPath: string,
    showOptionPath: number | undefined,
    isShow: boolean | undefined,
    themeObj: object,
    value: any
  ) {
    const optionPathArr = optionPath.split('.');
    for (let i = 0; i < optionPathArr.length; i++) {
      const path = optionPathArr[i] as keyof typeof themeObj;
      if (i === optionPathArr.length - 1) {
        // @ts-ignore
        themeObj[path] = value;
      } else {
        if (!themeObj.hasOwnProperty(path)) {
          // @ts-ignore
          themeObj[path] = {};
        }
        themeObj = themeObj[path];
        if (
          showOptionPath != null &&
          i === optionPathArr.length + showOptionPath
        ) {
          // @ts-ignore
          themeObj.show = isShow;
        }
      }
    }
  }

  const theme: Theme = {
    name: themeName.value,
    groupCount: parseInt(seriesCount.value, 10),
    config: {}
  };
  if (configs.value) {
    for (let group of configs.value) {
      for (let item of group.items) {
        let isAlias = false;
        for (let alias of optionPathAlias) {
          const optionPath = item.optionPath;
          if (optionPath.startsWith(`{${alias[0]}`)) {
            for (let realOption of alias[1]) {
              searchPath(
                `${realOption}` + optionPath.slice(optionPath.indexOf('.')),
                item.showOptionPath,
                item.isShow,
                theme.config,
                item.value
              );
            }
            isAlias = true;
            break;
          }
        }
        if (!isAlias) {
          searchPath(
            item.optionPath,
            item.showOptionPath,
            item.isShow,
            theme.config,
            item.value
          );
        }
      }
    }
  }
  console.log('theme', theme);
  return theme;
}

function saveJsonFile(json: object, name: string) {
  var data = JSON.stringify(json, null, '    ');
  saveFile(data, name, 'json');
}

function saveJsFile(data: string, name: string) {
  saveFile(data, name, 'js');
}

function saveFile(data: string, name: string, type: string) {
  if (isSafari()) {
    window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  } else {
    try {
      const file = new Blob([data], { type: type });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `${name}.${type}`;
      link.click();
    } catch (e) {
      console.error(e);
      window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    }
  }
}

function isSafari() {
  return (
    navigator.userAgent.indexOf('Safari') > 0 &&
    navigator.userAgent.indexOf('Chrome') < 0
  );
}

function isIe() {
  return navigator.userAgent.indexOf('MSIE') > 0;
}

function isEdge() {
  return navigator.userAgent.indexOf('Trident') > 0;
}

function isMac() {
  return navigator.userAgent.indexOf('Mac OS X') > 0;
}

function getExportJsFile() {
  // format theme with 4 spaces
  let theme = JSON.stringify(getTheme(), null, '    ');
  // indent with 4 spaces
  theme = theme.split('\n').join('\n    ');
  return (
    '(function (root, factory) {\n' +
    "    if (typeof define === 'function' && define.amd) {\n" +
    '        // AMD. Register as an anonymous module.\n' +
    "        define(['exports', 'echarts'], factory);\n" +
    "    } else if (typeof exports === 'object' && typeof " +
    "exports.nodeName !== 'string') {\n" +
    '        // CommonJS\n' +
    "        factory(exports, require('echarts'));\n" +
    '    } else {\n' +
    '        // Browser globals\n' +
    '        factory({}, root.echarts);\n' +
    '    }\n' +
    '}(this, function (exports, echarts) {\n' +
    '    var log = function (msg) {\n' +
    "        if (typeof console !== 'undefined') {\n" +
    '            console && console.error && console.error(msg);\n' +
    '        }\n' +
    '    };\n' +
    '    if (!echarts) {\n' +
    "        log('ECharts is not Loaded');\n" +
    '        return;\n' +
    '    }\n' +
    "    echarts.registerTheme('" +
    themeName +
    "', " +
    theme +
    ');\n' +
    '}));\n'
  );
}
</script>

<style scoped>
.item-row,
.el-row {
  margin: 5px 0;
}

.item-row-lg {
  margin: 20px 0;
}

h5 {
  margin: 8px 0;
  font-size: 13px;
  color: #666;
}

.el-checkbox {
  margin: 5px 0;
}

.color-picker {
  display: inline-block;
  text-align: right;
  padding: 2px 2px 0 0;
}

.color-input {
  display: inline-block;
  margin: 5px 0;
  width: calc(100% - 34px);
}

.el-icon {
  width: auto;
  margin-right: 3px;
}

.color-operations {
  margin-left: 25px;
  margin-bottom: 20px;
}
</style>
