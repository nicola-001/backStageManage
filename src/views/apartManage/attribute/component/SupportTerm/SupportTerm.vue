<script setup lang="ts">
import {reqTermList} from "@/api/apartment/roomManageMent";
import {onMounted, ref} from "vue";
import SupportTermDialog from "@/views/apartManage/attribute/component/SupportTerm/SupportTermDialog.vue";
import {reqTermDelete} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";

defineOptions({
  name: 'SupportTerm',
})
// 存储全部租期列表
const termList = ref()
// 获取ref定义的组件实例
const termDialog = ref()
// 获取全部租期列表
const getTermList = async () => {
  const {data} = await reqTermList()
  termList.value = data
}
// 添加租期
const addTerm = () => {
  // 打开弹出框
  termDialog.value.open()
}
// 修改按钮的操作
const updateTerm = (item: any) => {
  termDialog.value.open(item)
}
// 删除按钮的操作
const deleteTerm = async (id: number) => {
  const result = await reqTermDelete(id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    //   重新获取数据
    await getTermList()
  }
}
onMounted(() => {
  getTermList()
})
</script>

<template>
  <div class="supportTerm_container">
    <el-card>
      <template #header>
        <span class="supportTerm_tittle">租期管理</span>
      </template>
      <el-row>
        <el-col :span="2" class="text-center">
          租期
        </el-col>
        <el-col :span="22" class="item-container">
          <el-popconfirm
              v-for="item in termList"
              :key="item.id"
              :title="`删除或修改${item.monthCount}${item.unit}`"
              cancel-button-text="修改"
              confirm-button-text="删除"
              cancel-button-type="warning"
              @cancel="updateTerm(item)"
              @confirm="deleteTerm(item.id)"
              width="200"
          >
            <template #reference>
              <el-tag style="padding: 13px;margin: 0 5px">
                {{ item.monthCount }}{{ item.unit }}
              </el-tag>
            </template>
          </el-popconfirm>
          <el-icon
              :size="35"
              color="#567722"
              @click="addTerm"
          >
            <CirclePlus/>
          </el-icon>
        </el-col>
      </el-row>
    </el-card>
    <SupportTermDialog ref="termDialog" :getTermList="getTermList"></SupportTermDialog>
  </div>
</template>

<style scoped lang="scss">
.supportTerm_container {
  .supportTerm_tittle {
    font-size: 18px;
    font-weight: bold;
  }

  .text-center {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 15px;
    background-color: #efefef;
    border-radius: 20px;

    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>