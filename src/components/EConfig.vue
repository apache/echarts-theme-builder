<template>
  <el-collapse>
    <el-collapse-item title="基本功能" name="basic">
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
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
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
</style>
