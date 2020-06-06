<template>
  <div class="Drawer">
    <slot />
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="less">
.Drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: #fff;
}
</style>
