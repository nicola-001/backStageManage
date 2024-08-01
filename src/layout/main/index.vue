<script lang="ts">
export default {
  name: 'MAIN'
}
</script>
<script setup lang="ts">
import useLayOutsettingStore from "@/stores/modules/setting";
import {nextTick, ref, watch} from "vue";
//引入仓库中的数据，用于控制刷新功能
const layoutSettingStore = useLayOutsettingStore()

//控制当前组是否销毁重建
const flag = ref<boolean>(true)
// 监听仓库中的数据是否发生变化，如果发生变化则销毁重建
watch(() => layoutSettingStore.refresh, () => {
  // 点击刷新按钮，路由组件销毁
  flag.value = false
  nextTick(() => {
    // 重建
    flag.value = true
  })
})
</script>

<template>
  <div class="main_container">
      <router-view v-slot="{Component}">
        <transition name="fade">
          <component :is="Component" v-if="flag"></component>
        </transition>
      </router-view>
  </div>
</template>

<style scoped>
.main_container {
  margin-top: 15px;
}
</style>