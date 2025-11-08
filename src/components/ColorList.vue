<template>
  <van-field :label="label">
    <template #input>
      <van-checkbox v-if="canDisable" :model-value="enabled" @update:model-value="$emit('update:enabled', $event)" style="margin-right: 8px;" />
      <div class="color-list-wrapper" v-show="!canDisable || enabled">
        <div class="color-items">
          <div
            v-for="(color, index) in modelValue"
            :key="index"
            class="color-item"
          >
            <ColorPicker
              :pureColor="color"
              @pureColorChange="(newColor: string) => updateColor(index, newColor)"
              format="hex"
              :pickerType="'fk'"
              :shape="'square'"
              :size="24"
            />
            <van-field
              :model-value="color"
              @update:model-value="(value: string) => updateColorText(index, value)"
              placeholder="#000000"
              class="color-text"
            />
            <van-button
              v-if="modelValue.length > 1"
              type="danger"
              size="mini"
              @click="removeColor(index)"
              icon="cross"
              plain
            />
          </div>
        </div>
        <div class="color-actions">
          <van-button
            type="primary"
            size="small"
            @click="addColor"
            icon="plus"
          >
            {{ $t('common.add') }}
          </van-button>
          <van-button
            v-if="modelValue.length > 1"
            size="small"
            @click="removeLastColor"
          >
            {{ $t('common.reduce') }}
          </van-button>
        </div>
      </div>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

interface Props {
  modelValue: string[]
  label: string
  canDisable?: boolean
  enabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:enabled', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  canDisable: false,
  enabled: true
})

const emit = defineEmits<Emits>()

const updateColor = (index: number, color: string) => {
  const newColors = [...props.modelValue]
  newColors[index] = color
  emit('update:modelValue', newColors)
}

const updateColorText = (index: number, value: string) => {
  // Validate color format
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([^)]+\)$|^[a-zA-Z]+$/
  if (colorRegex.test(value) || value === '') {
    const newColors = [...props.modelValue]
    newColors[index] = value
    emit('update:modelValue', newColors)
  }
}

const addColor = () => {
  const newColors = [...props.modelValue, '#333333']
  emit('update:modelValue', newColors)
}

const removeColor = (index: number) => {
  if (props.modelValue.length > 1) {
    const newColors = props.modelValue.filter((_, i) => i !== index)
    emit('update:modelValue', newColors)
  }
}

const removeLastColor = () => {
  if (props.modelValue.length > 1) {
    const newColors = [...props.modelValue]
    newColors.pop()
    emit('update:modelValue', newColors)
  }
}
</script>

<style scoped>
.color-list-wrapper {
  width: 100%;
}

.color-items {
  margin-bottom: 12px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.color-text {
  flex: 1;
  min-width: 0;
}

.color-actions {
  display: flex;
  gap: 8px;
}

:deep(.van-field__control) {
  display: flex;
  align-items: flex-start;
}

:deep(.van-button--mini) {
  padding: 4px;
  min-width: 32px;
}

:deep(.vc-color-wrap) {
  border-radius: 4px;
  border: 1px solid #dcdee0;
  flex-shrink: 0;
}
</style>
