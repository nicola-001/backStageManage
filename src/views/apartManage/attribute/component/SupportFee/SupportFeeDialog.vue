<script setup lang="ts">
import {reactive, ref} from "vue";
import {reqFeeAddOrUpdate} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";

const dialogVisible = ref(false)
// 接收父组件传递过来的数据
const props = defineProps(['getFeeList'])
// 获取ref标记的foem表单
const ruleFormRef = ref()
// 打开弹出框的回调
const open = (item?: any) => {
  //  清空数据
  formData.value = defaultFormData
  if (item) {
    formData.value = item
  }
  dialogVisible.value = true
}
// 关闭弹出框的回调
const close = () => {
  dialogVisible.value = false
}
// 取消按钮
const goConcel = () => {
  close()
}
//保存或更新杂物信息
const getFeeAddOrUpdate = async () => {
  const result = await reqFeeAddOrUpdate(formData.value)
  if (result.code == 200) {
    // 消息提醒
    messageBox.messageInfo('success', '操作成功')
    // 重新获取数据
    props.getFeeList()
  }
}
// 确定按钮
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 保存或更新杂费信息
      getFeeAddOrUpdate()
      // 关闭遮罩层
      close()
    } else {
      messageBox.messageInfo('error', '表单有误,请检查')
    }
  })

}
// 收集数据
const defaultFormData = {
  id: '',
  name: '',
  unit: '',
  feeKeyId: '',
  feeKeyName: '',
}
const formData = ref({
  ...defaultFormData
})
// 表单规则
const rules = reactive({
  name: [
    {required: true, message: '请输入属性名称', trigger: 'blur'},
  ]
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
      :title="`${formData.id?'修改':'新增'}属性`"
      width="650"
  >
    <el-form
        :model="formData"
        :rules="rules"
        ref="ruleFormRef"
    >
      <el-form-item label="属性名称" label-width="120" style="margin-top:30px" prop="name">
        <el-input placeholder="请输入属性名称" v-model="formData.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="goConcel">取消</el-button>
        <el-button type="primary" @click="goConfirm(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>