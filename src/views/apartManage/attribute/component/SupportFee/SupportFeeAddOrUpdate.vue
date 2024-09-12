<script setup lang="ts">
import {reactive, ref} from "vue";
import {reqAttrAddOrUpdate} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";


defineOptions({
  name: 'SupportFeeAddOrUpdate'
})
// 控制表单的折叠与打开
const dialogVisible = ref(false)
// 获取ref标记的对象实力 ruleFormRef
const ruleFormRef = ref()
// 获取父组件传递过来的数据
const props = defineProps(['getFeeList'])
// 准备数据
const defaultFormData = {
  id: '',
  name: '',
  unit: '',
  feeKeyId: '',
  feeKeyName: '',
}
const form = ref({
  ...defaultFormData
})
// 新增或修改杂费值信息
const getAttrAddOrUpdate = async () => {
  const result: any = await reqAttrAddOrUpdate(form.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    props.getFeeList()
  }
}
// 打开按钮弹出框的回调
const open = (item: any, fee?: any) => {
  // 清除表单验证
  if (ruleFormRef.value){
    ruleFormRef.value.resetFields()
  }
  // 合并参数
  form.value.feeKeyId = item.id
  form.value.feeKeyName = item.name
  if (fee) {
    Object.assign(form.value, fee)
  }
  // 控制表单的打开
  dialogVisible.value = true
}
// 关闭弹出框的回调
const close = () => {
  dialogVisible.value = false
}
// 取消按钮的回调
const goConsel = () => {
  close()
}
// 确定按钮的回调
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 向服务器发送新增或修改数据的请求
      getAttrAddOrUpdate()
      close()
    } else {
      messageBox.messageInfo('error', '表单验证失败，请检查')
    }
  })

}
// 表单验证规则
const rules = reactive({
  name: [
    {required: true, message: '请输入属性值名称', trigger: 'blur'},
  ],
  unit: [
    {required: true, message: '请输入，例：元/月', trigger: 'blur'},
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
      title="新增属性"
      width="650"
  >
    <el-form
        ref="ruleFormRef"
        :model="form"
        label-width="120"
        :rules="rules"
        style="margin-top: 15px">
      <el-form-item label="属性值名称" prop="name">
        <el-input
            placeholder="请输入属性值名称"
            v-model.trim="form.name"
        />
      </el-form-item>
      <el-form-item label="属性值单位" prop="unit">
        <el-input
            placeholder="请输入，例：元/月"
            v-model.trim="form.unit"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="goConsel">取消</el-button>
        <el-button type="primary" @click="goConfirm(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>