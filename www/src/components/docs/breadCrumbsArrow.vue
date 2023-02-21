<script setup lang="ts">
import clsx from "clsx";

const props = defineProps({ isRtl: Boolean });
</script>

<template>
  <svg
    :class="clsx(props.isRtl && 'rotate-180')"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
    />
  </svg>
</template>
