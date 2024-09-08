<script setup lang="ts">
import {computed, nextTick, reactive, ref} from "vue";
import {reqLabelList} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";

defineOptions({
  name: 'SuportLabelDialog',
})
// 获取父组件传递过来函数
const props = defineProps(['getAllLabelList'])
// 列举数据
const defaultFormData = {
  id: '',
  type: '',
  name: '',
}
// 收集表单数据
const formData = ref({
  ...defaultFormData
})
// 控制是否打开弹出框
const dialogVisible = ref(false)
// 获取ref标记的ruleFormRef实例对象
const ruleFormRef = ref()
// 打开弹窗的回调
const open = async (type: any, item?: any) => {
  formData.value.type = type
  Object.assign(formData.value, item)
  // 打开弹窗
  dialogVisible.value = true
  // 清除表单数据
  await nextTick() // 确保对话框和表单完全渲染
  if (ruleFormRef.value) {
    ruleFormRef.value.clearValidate('name')
  }
  // 清理数据
  Object.assign(formData.value, {
    id: '',
    type: '',
    name: '',
  })
}

// 关闭弹窗的回调
const close = () => {
  dialogVisible.value = false
}
// 新增或修改标签信息
const getLabelList = async () => {
  const result: any = await reqLabelList(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    close()
    //   重新获取数据
    props.getAllLabelList()
  }
}
// 关闭弹出框
const handleClose = () => {
  // 关闭弹出框
  close()
}
const goConcel = () => {
  // 关闭弹出框
  close()
}
const goConfirm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      getLabelList()
      // 关闭弹出框
      dialogVisible.value = false
    } else {
     messageBox.messageInfo('error','标签名称不能为空！')
    }
  })
}
// 表单验证规则
const rules = reactive({
  name: {required: true, message: '标签名称', trigger: 'blur'},
})
// 弹出框标题
const title=computed(()=>{
    return(
     (formData.value.id?'修改':'新增')+(formData.value.type=='1'?'公寓':'房间')+'标签'
    )
})
// 暴露数据
defineExpose({
  open,
  close
})
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="600"
      :before-close="handleClose"
  >
    <el-form
        ref="ruleFormRef"
        :model="formData"
        style="margin-top: 15px"
        :rules="rules"
    >
      <el-form-item label-width="90" label="标签名称" prop="name">
        <el-input
            v-model.trim="formData.name"
            placeholder="请输入标签名称"
            clearable
        />
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