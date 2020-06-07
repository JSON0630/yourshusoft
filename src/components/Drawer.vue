<template>
  <div class="Drawer">
    <div class="Drawer_layer" :class="{open: value}" @click="$emit('input', false)"></div>
    <div class="Drawer_content" :class="{open: value}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>

<style lang="less">
.Drawer {
  &_layer {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    display: none;
    background: rgba(0, 0, 0, .3);
    &.open {
      display: block;
    }
  }
  &_content {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 4;
    height: 100vh;
    transform: translateX(100%);
    transform-origin: right;
    transition: all .3s ease;
    background: #fff;
    &.open {
      transform: translateX(0);
    }
  }
}
</style>
