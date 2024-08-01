<script lang="ts">
export default {
  name: 'LOGO'
}
</script>
<script setup lang="ts">
//引入项目名称
import setting from '@/setting/setting'
import useLayOutsettingStore from "@/stores/modules/setting";
// 获取仓库中的数据用于控制菜单的展示与折叠
const useSettingStore = useLayOutsettingStore()
</script>

<template>
  <div class="logo-wrapper">
    <img :src="setting.logo">
    <span :class="{fold:useSettingStore.fold?true:false}">{{ setting.PROJECT_NAME }}</span>
  </div>
</template>

<style scoped lang="scss">
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 22px;
  width: 100%;
  height: $base-nav-hight;
  transition: all 0.3s;

  img {
    width: 30px;
    border-radius: 20px;
  }

  span {
    font-size: $base-nav-p;
    color: white;
    font-weight: 900;
  }
  .fold{
    display: none;
  }
}
</style>