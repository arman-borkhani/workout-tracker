<template>
  <button class="inline-flex align-middle py-2 px-6 rounded-sm self-start text-sm
    text-white bg-c-green duration-200 border-solid border-2 border-transparent hover:border-c-green
    hover:bg-white hover:text-c-green transition-all" :class="{'pointer-events-none bg-opacity-80': loading}"
  >
    <IconLoading v-if="loading" class="animate-spin -ml-2 mr-3 text-white" width="20" height="20"></IconLoading>
    <slot></slot>
  </button>
</template>

<script setup>
import IconLoading from './icons/IconLoading.vue';

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>