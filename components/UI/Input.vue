<template>
    <div>
        <label class="block pl-3 ml-px text-sm font-medium text-gray-700" for="" v-if="props.label">{{ props.label }}</label>
        <input :type="props.type" :value="props.modelValue"
        @input="event => emits('update:modelValue', event.target.value)"
         class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="props.placeholder">
    </div>
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: null
    }
})
</script>