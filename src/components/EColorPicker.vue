<template>
  <div>
    <div v-if="props.multiple">
      <div v-for="(item, index) in colors" v-bind:key="item.name">
        <div class="color-picker">
          <el-color-picker v-model="item.value" size="small"></el-color-picker>
        </div>
        <div class="color-input">
          <el-input size="medium" v-model="item.value"></el-input>
        </div>
      </div>
      <div class="color-operations">
        <el-button v-on:click="addColor" icon="el-icon-plus" size="small">
          增加
        </el-button>
        <el-button v-on:click="addColor" icon="el-icon-minus" size="small">
          减少
        </el-button>
      </div>
    </div>
    <div v-else>
      <div class="color-picker">
        <el-color-picker v-model="props.value" size="small"></el-color-picker>
      </div>
      <div class="color-input">
        <el-input size="medium" v-model="props.value"></el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['value', 'multiple']);
const colors = props.multiple
  ? (props.value || []).map((item: string) => {
      return {
        value: item
      };
    })
  : [];
</script>

<style scoped>
.color-picker {
  display: inline-block;
  text-align: right;
  margin-left: 20px;
  padding: 2px 5px 0 5px;
}

.color-input {
  display: inline-block;
  position: relative;
  top: -11px;
}

.color-operations {
  margin-left: 25px;
  margin-bottom: 20px;
}
</style>
