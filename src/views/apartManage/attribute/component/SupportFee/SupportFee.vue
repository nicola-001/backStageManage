<script setup lang="ts">
//获取杂费信息
import {reqFeeList} from "@/api/apartment/apartManageMent";
import {onMounted, ref} from "vue";
import SupportFeeDialog from "@/views/apartManage/attribute/component/SupportFee/SupportFeeDialog.vue";
import {reqFeeDelete, reqFeeKeyDelete} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import SupportFeeAddOrUpdate from "@/views/apartManage/attribute/component/SupportFee/SupportFeeAddOrUpdate.vue";

// 获取ref标记的组件实例对象SupportFeeDialog
const supportFee = ref()
// 获取ref标记的组件实例对象supportAddOrUpdate
const feeAddOrUpdate = ref()
// 存储杂费信息
const allFeeList = ref()

const getFeeList = async () => {
  const {data} = await reqFeeList()
  // data.forEach((item) => {
  //   console.log(item)
  // })
  allFeeList.value = data
}
// 添加属性的回调
const addAttr = () => {
  // 打开弹出框
  supportFee.value.open()
}
// 更新属性的回调
const updateFee = (item: any) => {
//   打开弹出框的回调
  supportFee.value.open(item)
}
// 删除属性的回调
const goDelete = async (item: any) => {
  const result: any = await reqFeeKeyDelete(item.id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    await getFeeList()
  }
}
// 添加属性的内容
const addItem = (item: any) => {
  //打开弹出框
  feeAddOrUpdate.value.open(item)
}
// 修改属性内容
const updateAttr = (item: any, fee: any) => {
  feeAddOrUpdate.value.open(item, fee)
}
// 删除属性内容
const deleteAttr = async (id: number) => {
  const result = await reqFeeDelete(id)
  if(result.code == 200) {
    messageBox.messageInfo('success','删除成功')
    await getFeeList()
  }
}
onMounted(() => {
  // 获取杂费信息
  getFeeList()
})
</script>

<template>
  <el-card class="fee_container">
    <template #header>
      <div class="card_header">
        <span>杂费信息管理</span>
      </div>
    </template>
    <el-row v-for="(item,index) in allFeeList" :key="index" class="fee_row">
      <el-col :span="2">
        <el-popconfirm
            :title="`修改或删除${item.name}`"
            cancel-button-text="修改"
            confirm-button-text="删除"
            cancel-button-type="warning"
            width="180"
            @cancel="updateFee(item)"
            @confirm="goDelete(item)"
        >
          <template #reference>
            <div class="fee_title_container">
              <span class="Fee_title">{{ item.name }}</span>
              <el-icon>
                <InfoFilled/>
              </el-icon>
            </div>
          </template>
        </el-popconfirm>
      </el-col>
      <el-col :span="22" class="item-container">
        <el-popconfirm
            v-for="fee in item.feeValueList"
            :key="fee.id"
            :title="`修改或删除${fee.name}`"
            cancel-button-text="修改"
            confirm-button-text="删除"
            cancel-button-type="warning"
            width="180"
            @cancel="updateAttr(item,fee)"
            @confirm="deleteAttr(fee.id)"
        >
          <template #reference>
            <el-tag type="primary" style="margin: 0 5px;padding: 13px">{{ fee.name }}</el-tag>
          </template>
        </el-popconfirm>
        <el-icon :size="35" color="#567722" @click="addItem(item)">
          <CirclePlus/>
        </el-icon>
      </el-col>
    </el-row>
    <el-button type="primary" @click="addAttr">添加新属性</el-button>
  </el-card>
  <SupportFeeDialog ref="supportFee" :getFeeList="getFeeList"></SupportFeeDialog>
  <SupportFeeAddOrUpdate ref="feeAddOrUpdate" :getFeeList="getFeeList"></SupportFeeAddOrUpdate>
</template>

<style scoped lang="scss">
.fee_container {
  .card_header {
    font-weight: 800;
    font-size: 18px;
  }

  .fee_row {
    display: flex;
    align-items: center;
    margin: 15px 0;

    .fee_title_container {
      display: flex;
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
    }
  }

}


</style>