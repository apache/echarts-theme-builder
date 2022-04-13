<template>
  <el-collapse value="core" :accordion="true">
    <el-collapse-item title="核心功能" name="core">
      <div class="item-row">
        <el-button-group>
          <el-button type="primary">
            <i class="el-icon-download"></i>
            下载主题
          </el-button>
          <el-button icon="el-icon-bottom-right">
            导入配置
          </el-button>
          <el-button icon="el-icon-top-right">导出配置</el-button>
        </el-button-group>
      </div>
      <div class="item-row">
        <el-button-group>
          <el-button>
            <i class="el-icon-refresh"></i>
            刷新
          </el-button>
          <el-button icon="el-icon-refresh-left">
            复原
          </el-button>
          <el-button icon="el-icon-question">帮助</el-button>
        </el-button-group>
      </div>
      <div class="item-row-lg">
        <el-row>
          <el-col :span="columnSize.left">
            <h5>主题名称</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input placeholder="custom" size="medium"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="columnSize.left">
            <h5>系列数量</h5>
          </el-col>
          <el-col :span="columnSize.right">
            <el-input placeholder="5" size="medium"></el-input>
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
            @change="onConfigChange()"
          >
            {{ item.name }}
          </el-checkbox>
          <h5 v-else>{{ item.name }}</h5>
        </el-col>
        <el-col :span="columnSize.right">
          <el-checkbox
            v-if="item.type === 'boolean'"
            v-model="item.value"
            @change="onConfigChange()"
          >
            {{ item.name }}
          </el-checkbox>
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.value"
            @change="onConfigChange()"
          >
            <el-option
              v-for="option in item.selectOptions"
              :key="option.value"
              :label="option.name"
              :value="option.value"
            >
            </el-option>
          </el-select>
          <EColorPicker
            v-else-if="item.type === 'color'"
            :value="item.value"
            :multiple="item.multipleColor"
            @change="onConfigChange()"
          >
          </EColorPicker>
          <el-input
            v-else
            size="medium"
            v-model="item.value"
            @change="onConfigChange()"
          ></el-input>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import EColorPicker from './EColorPicker.vue';
import { themeConfigs } from '../data/themeConfigs';

const emit = defineEmits(['configChange']);

const configs = ref(themeConfigs);
const columnSize = {
  left: 10,
  right: 14
};

function onConfigChange() {
  emit('configChange', getTheme());
}

function getTheme() {
  const theme = {};
  if (configs.value) {
    for (let group of configs.value) {
      console.log(group);
      for (let item of group.items) {
        const optionPath = item.optionPath.split('.');
        let themeObj: object = theme;
        for (let i = 0; i < optionPath.length; i++) {
          const path = optionPath[i] as keyof typeof themeObj;
          if (i === optionPath.length - 1) {
            // @ts-ignore
            themeObj[path] = item.value;
          } else {
            if (!themeObj.hasOwnProperty(path)) {
              // @ts-ignore
              themeObj[path] = {};
            }
            themeObj = themeObj[path];
          }
        }
      }
    }
  }
  return theme;
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
</style>
