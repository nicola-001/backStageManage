<script setup lang="ts">
import {reqDeletePayment, reqPayment} from "@/api/apartment/attributeManageMent";
import {onMounted, ref} from "vue";
import SupportPaymentDialog from "@/views/apartManage/attribute/component/SupportPayment/SupportPaymentDialog.vue";
import messageBox from "@/untils/MessageBox";

defineOptions({
  name: 'SupportPayment'
})
// 存储全部支付方式
const paymentList = ref()
// 获取ref定义的组件实例
const paymentDialog = ref()
// 查询全部支付方式列表
const getPayment = async () => {
  const {data} = await reqPayment()
  paymentList.value = data
}
// 新增支付方式的回调
const addPayment = () => {
  paymentDialog.value.open()
}
// 修改支付方式的回调
const updatePayment = (item: any) => {
  paymentDialog.value.open(item)
}
// 删除支付方式的回调
const deletePayment = async (id: number) => {
  const result = await reqDeletePayment(id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    // 重新获取数据
    await getPayment()
  }
}
onMounted(() => {
  // 查询全部支付方式
  getPayment()
})
</script>

<template>
  <div class="payment_container">
    <el-card>
      <template #header>
        <span class="payment_title">支付管理</span>
      </template>
      <el-row>
        <el-col :span="2" class="text-center">
          <span>支付方式</span>
        </el-col>
        <el-col :span="22" class="item-container">
          <el-popconfirm
              v-for="item in paymentList"
              :key="item.id"
              :title="`修改或删除${item.name}${item.additionalInfo}`"
              width="220"
              confirm-button-text="删除"
              cancel-button-text="修改"
              @cancel="updatePayment(item)"
              @confirm="deletePayment(item.id)"
              cancel-button-type="warning"
          >
            <template #reference>
              <el-tag style="padding: 13px;margin: 0 5px">{{ item.name }}({{ item.additionalInfo }})</el-tag>
            </template>
          </el-popconfirm>
          <el-icon :size="35" color="#567722" @click="addPayment">
            <CirclePlus/>
          </el-icon>
        </el-col>
      </el-row>
      <SupportPaymentDialog ref="paymentDialog" :getPayment="getPayment"></SupportPaymentDialog>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.payment_container {
  .payment_title {
    font-weight: bold;
    font-size: 18px;
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
    margin: 5px 0;
  }
}
</style>