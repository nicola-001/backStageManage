<script setup lang="ts">
import {ref} from "vue";
// 定义组建名称
defineOptions({
  name: 'tableManage'
})
// 定义从父组件传递的属性
const props = defineProps({
  drawerData: {
    type: Array,
    default: () => []
  }
})
// 定义响应式变量
const rowDrawer = ref(false)
const drawerData = ref(props.drawerData)

const openTable = () => {
  // 打开抽屉
  rowDrawer.value = true
}


defineExpose({
  openTable
})
</script>
<template>
  <el-drawer v-model="rowDrawer" title="列设置" size="400">
    <el-table border :data="drawerData">
      <el-table-column label="列名" prop="name" align="center"></el-table-column>
      <el-table-column label="显示" prop="display" align="center">
        <template v-slot="scope">
          <el-switch v-model="scope.row.display"/>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="order" align="center">
        <template #default="{row}">
          <el-switch v-model="row.order"></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<style scoped>

</style>