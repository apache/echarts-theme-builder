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
          <el-col :span="6">
            <h5>主题名称</h5>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="custom" size="medium"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h5>系列数量</h5>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="5" size="medium"></el-input>
          </el-col>
        </el-row>
      </div>
    </el-collapse-item>

    <el-collapse-item
      v-for="group in configs"
      :title="group.groupName"
      :name="group.groupName"
      v-bind:key="group.groupName"
    >
      <el-row
        v-for="item in group.items"
        :name="item.name"
        v-bind:key="item.name"
      >
        <el-col :span="6">
          <h5>{{ item.name }}</h5>
        </el-col>
        <el-col :span="18" v-if="item.type === 'boolean'">
          <el-checkbox v-model="item.value">{{ item.name }}</el-checkbox>
        </el-col>
        <div class="color-input" v-if="item.type === 'color'">
          <EColorPicker :value="item.value"></EColorPicker>
        </div>
        <el-col :span="18" v-else>
          <el-input size="medium" v-model="item.value"></el-input>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import EColorPicker from './EColorPicker.vue';

type ThemeConfigItem = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color' | 'colorArray';
  value: string | number | boolean | string[];
  optionPath: string;
};

type ThemeConfig = {
  groupName: string;
  items: ThemeConfigItem[];
};

const configs: ThemeConfig[] = [
  {
    groupName: '基本配置',
    items: [
      {
        name: '背景色',
        type: 'color',
        value: 'rgba(0, 0, 0, 0)',
        optionPath: 'backgroundColor'
      },
      {
        name: '标题色',
        type: 'color',
        value: '#464646',
        optionPath: 'title.textStyle.color'
      },
      {
        name: '副标题色',
        type: 'color',
        value: '#6e7079',
        optionPath: 'title.subtextStyle.color'
      }
      //   {
      //     name: '主题调色板',
      //     type: 'colorArray',
      //     value: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
      //     optionPath: 'color'
      //   }
    ]
  }
  //   {
  //     groupName: '视觉映射',
  //     items: [
  //       {
  //         name: '视觉映射',
  //         type: 'colorArray',
  //         value: ['#bf444c', '#d88273', '#f6efa6'],
  //         optionPath: 'visualMap.color'
  //       }
  //     ]
  //   }
];
</script>

<style scoped>
.item-row {
  margin: 10px 0;
}

.item-row-lg {
  margin: 20px 0;
}

h5 {
  margin: 8px 0;
  font-size: 13px;
  color: #666;
}

.color-input-picker {
  text-align: right;
  padding: 2px 5px 0 5px;
}
</style>
