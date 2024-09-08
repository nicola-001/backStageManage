<script setup lang="ts">
import {reactive, ref} from 'vue'
import {reqAttrKeyAddOrUpdate} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";
// 控制弹出框的打开与关闭
const dialogVisible = ref(false)
// 获取父组件传递过来的数据
const props = defineProps(['getAttrList'])
// 获取ref标记的form对象
const ruleFormRef = ref()
const defaultFormData = {
  id: '',
  attrKeyId: '',
  name: '',
  attrKeyName: '',
}
// 保存数据
const formData = ref({
  ...defaultFormData
})
// 打开弹出框
const open = (item?: any) => {
  // 清空数据
  formData.value = defaultFormData
  // 判断是添加还是修改->是否赋值
  if (item) {
    formData.value = item
  }
  dialogVisible.value = true
//  清空表单验证
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
}
// 关闭弹出框
const close = () => {
  dialogVisible.value = false
}
// 新增或修改属性名称
const getAttrAddOrUpdate = async () => {
  const result = await reqAttrKeyAddOrUpdate(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    props.getAttrList()
  }
}
// 取消按钮的回调
const goCancel = () => {
  // 关闭弹出框
  close()
}
// 确定按钮的回调
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      // 新增或修改属性名称
      getAttrAddOrUpdate()
      // 关闭弹出框
      close()
    } else {
      messageBox.messageInfo('error', '表单输入有误')
    }
  })
}
const rules = reactive({
  name: [
    {required: true, message: '请输入属性名称', trigger: 'blur'},
  ]
})
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
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
    >
      <el-form-item
          style="margin-top: 30px"
          label="属性名称"
          label-width="120"
          prop="name"
      >
        <el-input placeholder="请输入属性名称" v-model="formData.name"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="goCancel">取消</el-button>
        <el-button type="primary" @click="goConfirm(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>