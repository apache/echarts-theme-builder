<template>
<h1>{{msg}}</h1>
<el-input-number v-model="count"></el-input-number>
<p>Input Number: {{count}}</p>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

defineProps({
    msg: {
        type: String,
        required: true
    }
});

const count = ref(10);
</script>

<style scoped lang="scss">
a {
    color: #42b983;
}
label {
    margin: 0 0.5em;
    font-weight: bold;
}
code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>