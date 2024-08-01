<script lang="ts">
export default {
  name: 'LAYOUT'
}
</script>
<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import TabBar from "@/layout/tabbar/tabbar.vue";
import Main from "@/layout/main/index.vue";
import {computed, onMounted, ref} from "vue";
import useUserStore from "@/stores/modules/user";
import MENU from "@/layout/menu/index.vue";
import useLayOutsettingStore from "@/stores/modules/setting";
import {useRoute} from "vue-router";
// 引入仓库中的数据用于渲染导航菜单
const userStore = useUserStore()
// 获取仓库中的数据用于控制菜单的展示与折叠
const LayOutSettingStore = useLayOutsettingStore()
const route=useRoute()
const activeMenu = computed(() =>
    route.meta.activeMenu ? (route.meta.activeMenu as string) : route.path,
)
</script>

<template>
  <div class="layout_container">
    <!--左侧导航-->
    <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
      <el-scrollbar>
        <!--顶部导航-->
        <Logo></Logo>
        <!--动态生成菜单组建-->
        <el-menu router :collapse="LayOutSettingStore.fold?true:false" :default-active="activeMenu" background-color="#001529" text-color="#fff">
          <!-- 传递路由数据给menu组件 -->
          <MENU  :menuList="userStore.menuRoutes"></MENU>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航栏-->
    <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
      <TabBar></TabBar>
    </div>
    <!--主内容区-->
    <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
      <el-scrollbar>
        <Main></Main>
      </el-scrollbar>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
}

.layout_slider {
  height: 100vh;
  max-height: 100vh;
  width: $base-menu-width;
  background-color: $base-menu-background;
  transition: all 0.3s;

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-nav-hight);

    .el-menu {
      border-right: none;
    }
  }

  &.fold {
    width: $base-menu-min-width;
  }
}

.layout_tabbar {
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-hight;
  position: fixed;
  top: 0;
  left: calc($base-menu-width);
  transition: all 0.3s;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}

.layout_main {
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-hight);
  position: absolute;
  top: $base-tabbar-hight;
  left: $base-menu-width;
  padding: 20px;
  transition: all 0.3s;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
</style>