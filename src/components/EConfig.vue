<template>
  <el-collapse value="core" :accordion="true">
    <el-collapse-item title="核心功能" name="core">
      <div class="item-row">
        <el-button-group>
          <el-button type="primary">
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
          <div v-else-if="item.type === 'color'">
            <div v-if="item.multipleColor">
              <div v-for="(v, id) in item.value" v-bind:key="v.key">
                <div class="color-picker">
                  <el-color-picker
                    v-model="item.value[id]"
                    size="small"
                    @change="onColorChange"
                  >
                  </el-color-picker>
                </div>
                <div class="color-input">
                  <el-input size="medium" v-model="item.value[id]"></el-input>
                </div>
              </div>
              <div class="color-operations">
                <el-button
                  v-on:click="addColor"
                  icon="el-icon-plus"
                  size="small"
                >
                  <el-icon><plus /></el-icon>
                  增加
                </el-button>
                <el-button v-on:click="addColor" size="small">
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
                  @change="onColorChange"
                ></el-color-picker>
              </div>
              <div class="color-input">
                <el-input size="medium" v-model="item.value"></el-input>
              </div>
            </div>
          </div>
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
import { themeConfigs } from '../data/themeConfigs';

const emit = defineEmits(['configChange']);
defineExpose({
  getTheme
});

const configs = ref(themeConfigs);
const columnSize = {
  left: 10,
  right: 14
};

function onColorChange(value: string) {
  console.log('color change', value);
}

function onConfigChange(value: string) {
  emit('configChange', value);
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
  console.log(theme);
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
