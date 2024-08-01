<script lang="ts">
export default {
  name: 'leftTabbar'
}
</script>
<script setup lang="ts">
import {ArrowRight} from '@element-plus/icons-vue'
import useLayOutsettingStore from "@/stores/modules/setting";
// 引入仓库中用于保存菜单展示与收起的数据
let layoutSettingStore = useLayOutsettingStore()
// 用于切换菜单的展示与隐藏
const changeIcon = () => {
  // 切换图标
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<template>
  <div class="leftbar_container">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="layoutSettingStore.fold?'Expand':'Fold'"></component>
    </el-icon>
    <!--面包屑-->
    <!--
      elementUI面包屑：
      separator-icon：图表分隔符/组建名
      matched 属性是一个数组，包含当前路径匹配的所有路由记录
      :to 属性用于指定面包屑项的链接路径，item.path 是当前路由记录的路径
    -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index"
                          v-show="item.meta.title" :to="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="margin-left: 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.leftbar_container {
  display: flex;
  align-items: center;
  font-size: 22px;
}
</style>