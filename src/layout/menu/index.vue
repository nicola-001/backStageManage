<script setup lang="ts">
defineOptions({
  name:'MENU'
})
import {useRouter} from "vue-router";
import Menu from '@/layout/menu/index.vue'

//获取父组件传递过来的数据 menuList:路由菜单
defineProps(['menuList'])
// 获取路由对象
let $router = useRouter()
// 点击菜单的回调
const goRoute = (vc: any) => {
  // 路由跳转
  $router.push(vc.index)
}
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!--没有子路由的情况-->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--有且只有一个子路由-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0]["meta"].title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--有子路由，子路由的个数大于1-->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<style scoped>

</style>