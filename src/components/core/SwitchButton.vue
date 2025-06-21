<template>
  <div class="switch" :class="{ 'switch--checked': modelValue }" @click="toggle">
    <div class="switch__track"></div>
    <div class="switch__thumb"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitchButton',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.switch {
  $switch-width: 44px;
  $switch-height: 24px;
  $thumb-size: 20px;
  $transition: 0.2s;

  position: relative;
  width: $switch-width;
  height: $switch-height;
  display: inline-block;
  cursor: pointer;

  &__track {
    width: 100%;
    height: 100%;
    background: #ccc;
    border-radius: $switch-height;
    transition: background $transition;
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: $thumb-size;
    height: $thumb-size;
    background: #fff;
    border-radius: 50%;
    transition:
      left $transition,
      background $transition;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &--checked {
    .switch__track {
      background: var(--blue);
    }
    .switch__thumb {
      left: calc(100% - #{$thumb-size} - 2px);
      background: #fff;
    }
  }
}
</style>
