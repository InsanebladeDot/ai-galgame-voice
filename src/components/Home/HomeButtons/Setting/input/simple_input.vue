<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
    type="text"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>