<script setup lang="ts">
import {reactive, ref} from "vue";
import {reqUpdateOrAddFacility} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import {reqFacilityList} from "@/api/apartment/apartManageMent";
import {BuildingTypeTypeMap} from "@/enums/constenmus";
import type {FacilityListData} from "@/api/apartment/apartManageMent/type";

defineOptions({
  name: 'SupportFacilityDialog',
})

// 接收数据
const facilityTypeList: any = defineModel('facilityTypeList')
// const props = defineProps(['getFacilityList'])

const dialogVisible = ref(false)
// 展示方法
const show = (type: number, item2?: any) => {
  console.log(type, item2)
  if (item2) {
    Object.assign(formData.value, item2)
    // 打开遮罩层
    dialogVisible.value = true
  } else {
    // 清空数据
    Object.assign(formData.value, {
      id: '',
      type: type,
      name: '',
      icon: '',
    })
    // 打开遮罩层
    dialogVisible.value = true
  }

}
// 关闭方法
const close = () => dialogVisible.value = false
// 收集form表单的数据
const defaultFormData = {
  id: '',
  type: '',
  name: '',
  icon: '',
}
const getFacilityList = async () => {
  const {data} = await reqFacilityList()
  facilityTypeList.value.length = 0
  Object.assign(facilityTypeList.value, JSON.parse(JSON.stringify(BuildingTypeTypeMap)))
  // facilityTypeList.value = JSON.parse(JSON.stringify(BuildingTypeTypeMap))
  data.forEach((item: FacilityListData) => {
    const targetType = facilityTypeList.value.find(
        (item2: any) => item2.value === item.type
    )
    if (targetType) {
      targetType.children = targetType.children || []
      targetType.children.push(item)
    }
  })
}
// 收集数据
const formData = ref({
  ...defaultFormData,
})
// 新增或修改配套信息管理
const getAddOrUpdateFacility = async () => {
  const result: any = await reqUpdateOrAddFacility(formData.value)
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    // props.getFacilityList()
    await getFacilityList()
    //   关闭弹出框
    close()
  }
}
// 确定按钮的回调
const confirm =  () => {
  getAddOrUpdateFacility()
};
//获取ref标记的表单数据
const ruleFormRef = ref()
// 表单验证规则
const rules = reactive({
  name: {required: true, message: '请输入配套姓名', trigger: 'blur'},
  icon: {required: true, message: '请选择配套图标', trigger: 'change'},
})
// 对外暴露
defineExpose({
  show,
  close
})
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title="`${formData.id?'修改':'新增'}${formData.type=='1'?'房间':'公寓'}配套`"
      style="max-width: 700px"
  >
    <el-form label-width="120"
             v-model="formData"
             ref="ruleFormRef"
             :rules="rules"
    >
      <el-form-item label="配套姓名" prop="name">
        <el-input
            v-model.trim="formData.name"
            placeholder="请输入配套姓名"
            clearable
        />
      </el-form-item>
      <el-form-item label="配套图标" prop="icon">
        <el-select
            v-model="formData.icon"
            placeholder="请选择配套图标"
            clearable
        >
          <el-option
              v-for="item in facilityTypeList[0].children"
              :key="item.id"
              :label="item.icon"
              :value="item.icon"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>