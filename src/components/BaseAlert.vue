<template>
  <div 
    class="p-4 rounded-md flex items-center text-gray-800" 
    :class="{'bg-red-100': messageType === 'danger', 'bg-green-100': messageType === 'success'}"
  >
    <i class="mr-2">
      <IconDanger v-if="messageType === 'danger'" class="text-red-400" width="24" height="24"></IconDanger>
      <IconSuccess v-else class="text-green-400" width="24" height="24"></IconSuccess>
    </i>
    <slot></slot>
  </div>
</template>

<script setup>
import IconDanger from './icons/IconDanger.vue';
import IconSuccess from './icons/IconSuccess.vue';

defineProps(['messageType']);
</script>