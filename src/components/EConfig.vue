<template>
  <el-collapse>
    <el-collapse-item title="基本功能" name="basic">
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
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
</script>
