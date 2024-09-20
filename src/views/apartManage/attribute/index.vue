<script lang="ts">
export default {
  name: 'attriBute'
}
</script>
<script setup lang="ts">

import SupportFacility from "@/views/apartManage/attribute/component/SuportFacility/SupportFacility.vue";
import SupportLabel from "@/views/apartManage/attribute/component/SupportLabel/SupportLabel.vue";
import SupportRoomBase from "@/views/apartManage/attribute/component/SupportRoomBase/SupportRoomBase.vue";
import SupportFee from "@/views/apartManage/attribute/component/SupportFee/SupportFee.vue";
import SupportTerm from "@/views/apartManage/attribute/component/SupportTerm/SupportTerm.vue";
import SupportPayment from "@/views/apartManage/attribute/component/SupportPayment/SupportPayment.vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
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
      <!--杂费信息管理-->
      <SupportFee></SupportFee>
      <!--租期管理-->
      <SupportTerm></SupportTerm>
      <!--支付方式管理-->
      <SupportPayment></SupportPayment>
      <!--底部logo-->
      <BottomLogo></BottomLogo>
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