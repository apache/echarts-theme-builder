<template>
  <van-field :label="label">
    <template #input>
      <van-checkbox v-if="canDisable" :model-value="enabled" @update:model-value="$emit('update:enabled', $event)" style="margin-right: 8px;" />
      <div class="color-picker-wrapper" v-show="!canDisable || enabled">
        <ColorPicker
          :pureColor="modelValue"
          @pureColorChange="handleColorChange"
          format="hex"
          :pickerType="'fk'"
          :shape="'square'"
          :size="32"
        />
        <van-field
          :model-value="modelValue"
          @update:model-value="handleTextChange"
          placeholder="#000000"
          class="color-text"
        />
      </div>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

interface Props {
  modelValue: string
  label: string
  canDisable?: boolean
  enabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'update:enabled', value: boolean): void
}

withDefaults(defineProps<Props>(), {
  canDisable: false,
  enabled: true
})

const emit = defineEmits<Emits>()

const handleColorChange = (color: string) => {
  emit('update:modelValue', color)
}

const handleTextChange = (value: string) => {
  // Validate color format
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([^)]+\)$|^[a-zA-Z]+$/
  if (colorRegex.test(value) || value === '') {
    emit('update:modelValue', value)
  }
}
</script>

<style scoped>
.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.color-text {
  flex: 1;
}

:deep(.van-field__control) {
  display: flex;
  align-items: center;
}

:deep(.vc-color-wrap) {
  border-radius: 4px;
  border: 1px solid #dcdee0;
}
</style>
