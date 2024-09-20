<script setup lang="ts">
//控制弹出框的打开与关闭
import {reactive, ref} from "vue";
import {reqAddOrUpdatePayment} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";

const dialogVisible = ref(false)
// 接收父组件传递的数据
const props = defineProps(['getPayment'])
// 获取ref定义的form实例
const ruleFormRef = ref()
// 打开弹出框的回调
const open = (item?: any) => {
  // 清空表单校验功能
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
  // 清空数据
  Object.assign(formData.value, defaultFormData)
  if (item) {
    Object.assign(formData.value, item)
  }
  // 打开弹出框
  dialogVisible.value = true;
}
// 关闭弹出框的回调
const close = () => dialogVisible.value = false
// 准备数据
const defaultFormData = {
  id: '',
  name: '',
  payMonthCount: 1,
  additionalInfo: '',
}
const formData = ref({
  ...defaultFormData
})
// 保存或更新支付方式的请求
const getAddOrUpdate = async () => {
  const result = await reqAddOrUpdatePayment(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    props.getPayment()
  }
}
// 取消按钮的回调
const goCalcel = () => {
  close()
}
// 确定按钮的回调
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      getAddOrUpdate()
      close()
    } else {
      messageBox.messageInfo('error', '表单校验有误，请检查')
    }
  })
}
// 表单验证规则
const rules = reactive({
  name: [
    {required: true, message: '请输入，例：月付', trigger: 'blur'},
  ],
  payMonthCount: [
    {required: true, message: '请输入每次支付月数', trigger: 'blur'},
  ],
  additionalInfo: [
    {required: true, message: '请输入，例：押一付一', trigger: 'blur'},
  ],

})
// 暴露函数
defineExpose({
  open,
  close
})
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title="`${formData.id?'修改':'新增'}支付方式`"
      width="650"
  >
    <el-form
        :rules="rules"
        :model="formData"
        ref="ruleFormRef"
        style="margin-top: 20px"
        label-width="120"
    >
      <el-form-item label="支付方式名称" prop="name">
        <el-input placeholder="请输入，例：月付" v-model.trim="formData.name"/>
      </el-form-item>
      <el-form-item label="每次支付月数" prop="payMonthCount">
        <el-input-number v-model="formData.payMonthCount" :min="1"/>
      </el-form-item>
      <el-form-item label="支付方式说明" prop="additionalInfo">
        <el-input placeholder="请输入，例：押一付一" v-model.trim="formData.additionalInfo"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="goCalcel">取消</el-button>
        <el-button type="primary" @click="goConfirm(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>