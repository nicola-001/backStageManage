<script lang="ts">
export default {
  name: 'TabBar'
}
</script>
<script setup lang="ts">
import LeftTabbar from "@/layout/tabbar/leftTabbar/index.vue";
import RightTabbar from "@/layout/tabbar/rightTabbar/index.vue";

</script>

<template>
  <el-card>
    <div class="tabbar_container">
      <LeftTabbar></LeftTabbar>
      <RightTabbar></RightTabbar>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.tabbar_container {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>