<template>
  <el-collapse value="core" :accordion="true">
    <el-collapse-item :title="$t('core')" name="core">
      <div class="item-row">
        <el-button-group>
          <el-button type="primary" @click="downloadJs">
            <el-icon><download /></el-icon>
            {{ $t('downloadJs') }}
          </el-button>
          <el-button @click="downloadJson">
            <el-icon><download /></el-icon>
            {{ $t('downloadJson') }}
          </el-button>
        </el-button-group>
      </div>
      <div class="item-row">
        <el-button-group>
          <el-button @click="importTheme">
            <el-icon><bottom-right /></el-icon>
            {{ $t('importTheme') }}
          </el-button>
          <input
            type="file"
            @change="importFileChanged"
            id="input-file"
            style="display: none"
          />
          <el-button @click="exportTheme">
            <el-icon><top-right /></el-icon>
            {{ $t('exportTheme') }}
          </el-button>
        </el-button-group>
      </div>
      <div class="item-row-lg">
        <el-row>
          <el-col :span="columnSize.left">
            <h5>{{ $t('themeName') }}</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input
              placeholder="custom"
              v-model="themeName"
              @change="onConfigChange"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="columnSize.left">
            <h5>{{ $t('seriesNumber') }}</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input
              placeholder="5"
              v-model="seriesCount"
              @change="onConfigChange"
            >
            </el-input>
          </el-col>
        </el-row>
        <h5>{{ $t('seriesNumber') }}</h5>
        <div style="text-align: center">
          <div
            class="theme-group"
            v-for="theme in builtinThemes"
            :key="theme.name"
            @click="useBuiltinTheme(theme.configs, theme.name)"
          >
            <div
              class="theme-group-item"
              v-for="(color, index) in theme.configs[0].items[3].value"
              :key="index"
              :style="{
                backgroundColor: color,
                display: index > 5 ? 'none' : 'inline-block'
              }"
            ></div>
          </div>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item
      v-for="group in configs"
      :key="group.groupName"
      :title="$t(group.groupName)"
      :name="$t(group.groupName)"
    >
      <el-row
        v-for="item in group.items"
        :key="item.name"
        :name="$t(item.name)"
      >
        <el-col :span="columnSize.left">
          <el-checkbox
            v-if="item.showOptionPath"
            v-model="item.isShow"
            @change="onConfigChange"
          >
            {{ $t(item.name) }}
          </el-checkbox>
          <h5 v-else>{{ $t(item.name) }}</h5>
        </el-col>
        <el-col :span="columnSize.right">
          <el-checkbox
            v-if="item.type === 'boolean'"
            v-model="item.value"
            @change="onConfigChange"
          >
            {{ $t(item.name) }}
          </el-checkbox>
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.value"
            @change="onConfigChange"
          >
            <el-option
              v-for="option in item.selectOptions"
              :key="option.value"
              :label="$t(option.name)"
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
                  <el-input v-model="item.value[id]" @change="onConfigChange">
                  </el-input>
                </div>
              </div>
              <div class="color-operations">
                <el-button @click="addColor(item)" size="small">
                  <el-icon><plus /></el-icon>
                  {{ $t('increase') }}
                </el-button>
                <el-button @click="removeColor(item)" size="small">
                  <el-icon><minus /></el-icon>
                  {{ $t('decrease') }}
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
                <el-input v-model="item.value" @change="onConfigChange">
                </el-input>
              </div>
            </div>
          </div>
          <el-input
            v-else
            v-model="item.value"
            @change="onConfigChange"
          ></el-input>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { tr } from 'element-plus/lib/locale';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  optionPathAlias,
  Theme,
  ThemeConfig,
  ThemeConfigItem,
  themeConfigs,
  getMergedConfigs
} from '../data/themeConfigs';
import defaultThemes from '../data/defaultThemes';

const emit = defineEmits(['configChange']);
defineExpose({
  getTheme
});

const themeName = ref('custom');
const seriesCount = ref('5');
const downloadDrawer = ref(false);
const helpModal = ref(false);

const configs = ref(themeConfigs);
const columnSize = {
  left: 10,
  right: 14
};

const builtinThemes = defaultThemes.map(theme => getMergedConfigs(theme));

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

function useBuiltinTheme(builtinConfig: ThemeConfig[], name: string) {
  configs.value = builtinConfig;
  themeName.value = name;
  onConfigChange();
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
  return theme;
}

function downloadJs() {
  saveJsFile(getExportJsFile(), themeName.value);
}

function downloadJson() {
  saveJsonFile(getTheme().config, themeName.value);
}

function saveJsonFile(json: object, name: string) {
  var data = JSON.stringify(json, null, '    ');
  saveFile(data, name, 'json');
}

function saveJsFile(data: string, name: string) {
  saveFile(data, name, 'js');
}

function exportTheme() {
  const data = JSON.stringify(
    {
      version: 2,
      themeName: themeName.value,
      groupCount: parseInt(seriesCount.value, 10),
      config: configs.value
    },
    null,
    '    '
  );
  saveFile(data, 'echarts-theme-builder', 'json');
}

function importTheme() {
  const el = document.getElementById('input-file');
  if (el) {
    el.click();
  }
}

function importFileChanged(e: any) {
  if (!e.target.files) {
    // cancelled selecting, do nothing
    return;
  }
  var file = e.target.files[0];

  var extension = file.name.slice(file.name.lastIndexOf('.'));
  if (extension !== '.json') {
    alert('非法后缀！请使用本网站导出的 *.json 文件。');
    return;
  }

  // read local file
  var reader = new FileReader();
  reader.onload = function() {
    // update theme
    const json = JSON.parse(reader.result as string);
    if (!json.version || json.version !== 2) {
      alert('不兼容的版本！请使用本网站导出的 *.json 文件。');
      return;
    }
    seriesCount.value = json.groupCount || 5;
    themeName.value = json.themeName || 'custom';
    configs.value = json.config;
    onConfigChange();
  };
  reader.onerror = function(e) {
    alert('打开文件失败！');
    console.error(e);
  };
  reader.readAsText(file);
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

function getExportJsFile() {
  // format theme with 4 spaces
  let theme = JSON.stringify(getTheme().config, null, '    ');
  // indent with 4 spaces
  theme = theme.split('\n').join('\n    ');
  return `
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define(['exports', 'echarts'], factory);
      } else if (typeof exports === 'object' && typeof
        exports.nodeName !== 'string') {
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
      echarts.registerTheme("${themeName.value}", ${theme});
    }));
  `;
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

.theme-group {
  display: inline-block;
  margin: 5px;
  border-radius: 6px;
  padding: 8px 4px 0 6px;
  border: 1px solid #eee;
  cursor: pointer;
}

.theme-group-item {
  width: 19px;
  height: 19px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 4px;
}
</style>
