<script setup lang="ts">
import {reactive, ref} from "vue";
import {reqTermAddOrUpdate} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";

defineOptions({
  name: 'SupportTermDialog'
})
// 获取子组件传递的数据
const props = defineProps(['getTermList'])
// 获取ref定义的组件实例 ruleFormRef
const ruleFormRef = ref()
// 控制弹出框的显示与隐藏
const dialogVisible = ref(false)
// 存储数据
const defaultFormData = {
  id: '',
  unit: '',
  monthCount: '',
}
const formData = ref({
  ...defaultFormData
})
//保存或更新租期信息
const getTermAddOrUpdate = async () => {
  const result = await reqTermAddOrUpdate(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    // 重新获取数据
    props.getTermList()
  }
}
// 打开弹出框按钮的回调
const open = (item?: any) => {
  // 清除表单校验功能
 if (ruleFormRef.value){
   ruleFormRef.value.resetFields()
 }
  // 清空数据
  Object.assign(formData.value, defaultFormData)
  if (item) {
    Object.assign(formData.value, item)
  }
  // 打开弹出框的操作
  dialogVisible.value = true
}
// 关闭弹出框的回调
const close = () => {
  dialogVisible.value = false
}
// 取消按钮的回调
const goConcel = () => {
  close()
}
// 确定按钮的回调
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
       getTermAddOrUpdate()
      close()
    } else {
      messageBox.messageInfo('error', '表单有误,请检查')
    }
  })

}
// 表单验证规则
const rules = reactive({
  monthCount: [
    { required: true, message: '请输入租期名称', trigger: 'blur' },
  ],
  unit:[
    { required: true, message: '请输入，例：月', trigger: 'blur' },
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
      :title="`${formData.id?'修改':'新增'}租期`"
      width="650"
  >
    <el-form
        :rules="rules"
        label-width="120"
        :model="formData"
        ref="ruleFormRef"
    >
      <el-form-item label="租期名称" prop="monthCount">
        <el-input placeholder="请输入租期名称" v-model="formData.monthCount"/>
      </el-form-item>
      <el-form-item label="租期单位" prop="unit">
        <el-input placeholder="请输入，例：月" v-model="formData.unit"/>
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