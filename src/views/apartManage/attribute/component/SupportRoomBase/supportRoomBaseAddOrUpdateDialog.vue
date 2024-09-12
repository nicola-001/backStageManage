<script setup lang="ts">
import { reactive, ref} from "vue";
import {reqAttrValueSaveOrUpdate} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import type {FormInstance} from "element-plus";
// 获取子组件的数据
const props = defineProps(['getAttrList'])
// 获取ref标记的组件实例对象ruleFormRef
const ruleFormRef = ref()
// 控制弹出框的显示与隐藏
const dialogVisible = ref(false)
// 关闭按钮的回调
const close = () => {
  dialogVisible.value = false
}
// 打开按钮的回调
const open = (attr: any, item?: any) => {
  // 清空表单校验功能
  if (ruleFormRef.value) {
    ruleFormRef.value.clearValidate('name')
  }
  // 清空数据
  Object.assign(formData.value, defaultFormData)
  // 合并参数
  formData.value.attrKeyId = attr.id
  formData.value.attrKeyName = attr.name
  // 合并数据
  if (item) {
    Object.assign(formData.value, item)
  }
  dialogVisible.value = true
}
// 新增或更新属性值
const getAttrValue = async () => {
  const result: any = await reqAttrValueSaveOrUpdate(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    props.getAttrList()
  }
}
// 确定按钮的回调
const goConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      getAttrValue()
      close()
    } else {
      messageBox.messageInfo('error','表单填写有误，请检查')
    }
  })

}
// 取消按钮的回调
const goCancel = () => {
  close()
}
const defaultFormData = {
  id: '',
  name: '',
  attrKeyId: '',
  attrKeyName: ''
}
const formData = ref({
  ...defaultFormData
})

// 表单验证规则
const rules = reactive({
  name: [
    {required: true, message: '表单有误，请检查', trigger: 'blur'},
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
      :title="`${formData.id?'修改':'新增'}${formData.attrKeyName}属性`"
      width="650"
  >
    <el-form
        :model="formData"
        :rules="rules"
        ref="ruleFormRef"
    >
      <el-form-item label="属性值名称" label-width="150px" style="margin-top: 20px" prop="name">
        <el-input placeholder="请输入属性值名称" v-model="formData.name"/>
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