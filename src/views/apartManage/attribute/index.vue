<script lang="ts">
export default {
  name: 'attriBute'
}
</script>
<script setup lang="ts">

import SupportFacility from "@/views/apartManage/attribute/component/SupportFacility.vue";
import SupportLabel from "@/views/apartManage/attribute/component/SupportLabel.vue";
</script>

<template>
  <el-card>
    <div class="attribute_container">
      <!--配套信息管理-->
      <SupportFacility></SupportFacility>
      <!--标签信息管理-->
      <SupportLabel></SupportLabel>
      <!--房间基本信息管理-->
      <SupportRoomBase></SupportRoomBase>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.attribute_container {
  display: flex;
  flex-direction: column;
  gap: 15px; // 设置两个组件之间的上下间隔为 15px
}
</style>