<script setup lang="ts">
import {defineModel} from "vue";
// 为本组建命名
defineOptions({
  name: 'PagiNation'
})
// 定义响应式状态变量
const pageSize = defineModel("size");
const pageNum = defineModel("current");
const total = defineModel("total")

// 接收父组件传递过来的参数
const $emit = defineEmits(['getTableData'])

// 每页几条数据发生改变
function handleSizeChange(size: number) {
  pageSize.value = size
  $emit('getTableData')
}

// 当前第几页发生变化
const handleCurrentChange = (current: number) => {
  pageNum.value = current
  $emit('getTableData')
}
</script>

<template>
  <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      size="small"
      :background="true"
      layout="->,total,sizes,prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<style scoped>

</style>