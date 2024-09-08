<script setup lang="ts">
import SuportLabelDialog from "@/views/apartManage/attribute/component/SupportLabel/SuportLabelDialog.vue";

defineOptions({
  name: 'SupportLabel',
})
//查询标签信息列表
import {reqLabelList} from "@/api/apartment/apartManageMent";
import {onMounted, ref} from "vue";
import {BuildingTypeTypeMap} from "@/enums/constenmus";
import {reqDeleteLabel} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
// 存储标签类表信息
const labelTypeList = ref()
const getLabelList = async () => {
  // 将类型赋值给labelTypeList
  labelTypeList.value = JSON.parse(JSON.stringify(BuildingTypeTypeMap))
  const {data} = await reqLabelList()
  data.forEach((item: any) => {
    const targetType = labelTypeList.value.find((item2: any) => item2.value === item.type)
    if (targetType) {
      targetType.children = targetType.children || []
      targetType.children.push(item)
    }
  })
}
// 删除按钮的回调
const deleteLabelHandle = async (item: any) => {
  console.log(item.id)
  const result = await reqDeleteLabel(item.id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    //   重新获取数据
    await getLabelList()
  }
}
// 编辑按钮的回调
const editLabelHandle = (item: any) => {

  supportLabelDialog.value.open(item.type,item)
}
//添加按钮的回调
const addLabelHandle = (item: any) => {
  supportLabelDialog.value.open(item.value)
}
// 获取ref定义supportLabelDialog组件实例
const supportLabelDialog = ref()

onMounted(() => {
//   获取标签列表的信息
  getLabelList()
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>标签信息管理</span>
      </div>
    </template>
    <el-row class="container" v-for="item in labelTypeList" :key="item">
      <el-col :span="2" class="text-center">{{ item.label }}标签</el-col>
      <el-col :span="22" class="item-container">
        <el-popconfirm
            v-for="item2 in item.children || []"
            :key="item2.id"
            width="220"
            confirm-button-text="删除"
            cancel-button-text="修改"
            cancel-button-type="warning"
            @confirm="deleteLabelHandle(item2)"
            @cancel="editLabelHandle(item2)"
            :title="`修改或删除${item2.name}`"
        >
          <template #reference>
            <div class="item m-r-10 pointer">
              <el-tag style="padding: 13px;margin: 0 5px">{{ item2.name }}</el-tag>
            </div>
          </template>
        </el-popconfirm>
        <el-icon
            class="item m-r-10 m-t-5 pointer"
            :size="35"
            color="#567722"
            @click="addLabelHandle(item)"
        >
          <CirclePlus/>
        </el-icon>
      </el-col>
    </el-row>
    <SuportLabelDialog ref="supportLabelDialog" :getAllLabelList="getLabelList"></SuportLabelDialog>
  </el-card>
</template>

<style scoped lang="scss">
.card-header  span{
  font-size: 18px;
  font-weight: bold;
}

.text-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

.container:not(:first-child) {
  margin-top: 20px;
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

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>