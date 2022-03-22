<template>
  <div class="color-input">
    <el-col class="color-input-picker" :span="3">
      <el-color-picker v-model="props.value" size="small"></el-color-picker>
    </el-col>
    <el-col :span="15">
      <el-input size="medium" v-model="props.value"></el-input>
    </el-col>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['value']);
</script>
