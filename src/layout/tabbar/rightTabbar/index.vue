<script lang="ts">
export default {
  name: 'rightTabbar'
}
</script>
<script setup lang="ts">
import {FullScreen, Refresh, Setting} from '@element-plus/icons-vue'
import useLayOutsettingStore from "@/stores/modules/setting";
import useUserStore from "@/stores/modules/user";
import {ref} from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
// @ts-ignore
import {removeToken} from '@/untils/auth'
import router from "@/router";
// 引入仓库中的数据用于控制刷新效果
const layoutSettingStore = useLayOutsettingStore()
// 获取仓库中的用户信息（用户名，头像）
const userStore = useUserStore()
// 引入删除token方法
// 刷新按钮的回调
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮的回调
const fullScreen = () => {
//   dom对象属性
  const full = document.fullscreenElement
//   如果是全屏：true  不是全屏：false
  if (full) {
    // 退出全屏模式
    document.exitFullscreen()
  } else {
    // 实现全屏模式
    document.documentElement.requestFullscreen()
  }
}
// 控制抽屉的显示与隐藏
const drawer = ref(false)
// 全局颜色
const color = ref('rgba(20, 108, 231, 0.9)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 设置主题色的回调
const setColor = () => {
//   通知js修改根节点的样式  属性与属性值
  let Html = document.documentElement
  Html.style.setProperty('--el-color-primary', color.value)
}
// 暗黑模式
const blackMode = ref(false)
// 暗黑模式的回调
const changeDark = () => {
//   获取根节点
  let html = document.documentElement
//   判断HTML标签是否有类名blackMode
  blackMode.value ? html.className = 'dark' : html.className = ''

}
// 退出登录的回调
const logout = () => {
  // 清除token
  removeToken()
  // 跳转到登录页
  router.push({path: '/login'})
}
// 退出登录按钮遮罩层
const open = () => {
  ElMessageBox.confirm(
      '您确定要退出吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        logout()
        ElMessage({
          type: 'success',
          message: '退出登录成功',
        })
      })
}
</script>

<template>
  <div class="tabbar_right">
    <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-button @click="refresh" circle :icon="Refresh"></el-button>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
    >
      <el-button circle :icon="FullScreen" @click="fullScreen"></el-button>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="系统设置"
        placement="bottom"
    >
      <el-button circle :icon="Setting" @click="drawer = true"></el-button>
    </el-tooltip>
    <el-dropdown>
         <span class="el-dropdown-link">
             <img :src="userStore.avatar" alt="" style="height: 32px;width: 32px;border-radius: 50%;margin-left: 10px;">
              <span>{{ userStore.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
       </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="open">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <!--主题设置抽屉-->
  <el-drawer
      v-model="drawer"
      append-to-body
      size="350"
      title="主题设置"
  >
    <el-form>
      <div style="display: flex;justify-content: space-around">
        <el-form-item label="主题颜色"/>
        <el-color-picker @click.stop append-to-body @change="setColor" v-model="color" size="small" show-alpha
                         :predefine="predefineColors" :teleported="false"/>
      </div>
      <div style="display: flex;justify-content: space-around">
        <el-form-item label="暗黑模式"/>
        <el-switch v-model="blackMode" @change="changeDark">

          <template #active-action>
            <!--打开暗黑模式-->
            <span class="custom-active-action">
                <el-icon><Moon/></el-icon>
            </span>
          </template>
          <template #inactive-action>
            <!-- 默认亮色-->
            <span class="custom-inactive-action">
                <el-icon><Sunny/></el-icon>
            </span>
          </template>
        </el-switch>
      </div>
    </el-form>
  </el-drawer>
</template>
<style scoped lang="scss">

</style>