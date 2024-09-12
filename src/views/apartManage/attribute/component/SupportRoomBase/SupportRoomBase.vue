<script setup lang="ts">
import {reqAttrList} from "@/api/apartment/roomManageMent";
import {onMounted, ref} from "vue";
import type {ATTRListInterface} from "@/api/apartment/roomManageMent/type";
import SupportRoomBaseDialog from "@/views/apartManage/attribute/component/SupportRoomBase/SupportRoomBaseDialog.vue";
import {reqAttrDelete, reqAttrDeleteValue} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import SupportRoomBaseAddOrUpdateDialog
  from "@/views/apartManage/attribute/component/SupportRoomBase/supportRoomBaseAddOrUpdateDialog.vue";

defineOptions({
  name: 'SupportRoomBase',
})
// 存储属性名
let attrList = ref()
// 存储值
let attrValue = ref({})
// 存储属性列表
let attrTypeList = ref<ATTRListInterface[]>([])
// 获取ref定义的组件实例对象 SupportRoomBaseDialog
const roomBaseDialog = ref()
// 获取ref定义的组件实例对象 roomBaseAddOrUpdateDialog
const roomBaseAddOrUpdateDialog = ref()
//获取全部属性值和属性名称列表
const getAttrList = async () => {
  const {data} = await reqAttrList()
  data.forEach(item => {
    // 存储属性名
    attrList.value = item
    item.attrValueList?.forEach((attr: any) => {
      // 存储属性值
      attrValue.value = attr
    })
  })
  // 存储属性列表
  attrTypeList.value = data
}
// 添加新属性的回调
const addAttrHandler = () => {
  roomBaseDialog.value.open()
}
// 删除按钮的回调
const goDelete = async (id: number) => {
  const result: any = await reqAttrDelete(id)
  if (result.code == 200) {
    //   重新获取数据
    await getAttrList()
    messageBox.messageInfo('success', '删除成功')
  }
}
// 修改按钮的回调
const goUpdate = (item: any) => {
  console.log(item)
  roomBaseDialog.value.open(item)
}
// 添加
const goAddAttr = (attr: any) => {
  roomBaseAddOrUpdateDialog.value.open(attr)
}
// 修改属性
const updateAttr = (item: any, attr: any) => {
  roomBaseAddOrUpdateDialog.value.open(item, attr)
}
// 删除属性
const deleteAttr = async (id: number) => {
  const result: any = await reqAttrDeleteValue(id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    //   重新获取数据
    await getAttrList()
  }
}
onMounted(() => {
  getAttrList()
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>房间基本信息管理</span>
      </div>
    </template>
    <el-row v-for="(item,index) in attrTypeList" :key="index">
      <el-col :span="2" class="text-center">
        <el-popconfirm
            :title="`修改或删除${item.name}`"
            width="180"
            confirm-button-text="删除"
            cancel-button-text="修改"
            cancel-button-type="warning"
            @confirm="goDelete(item.id)"
            @cancel="goUpdate(item)"
        >
          <template #reference>
            <div class="supportRoomBase_icon">
              <span>{{ item.name }}</span>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="点击属性名可进行修改/删除操作"
                  placement="top-start"
              >
                <el-icon>
                  <InfoFilled/>
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-popconfirm>
      </el-col>
      <el-col :span="22" class="item-container">
        <el-popconfirm
            v-for="attr in item.attrValueList"
            :key="attr.id"
            :title="`修改或删除${attr.name }`"
            confirm-button-text="删除"
            cancel-button-text="修改"
            cancel-button-type="warning"
            width="180"
            @cancel="updateAttr(item,attr)"
            @confirm="deleteAttr(attr.id)"
        >
          <template #reference>
            <!--tag标签-->
            <el-tag type="primary" style="margin: 0 5px;padding: 13px">{{ attr.name }}</el-tag>
          </template>
        </el-popconfirm>
        <el-icon class="item m-r-10 m-t-5 pointer"
                 :size="35"
                 color="#567722"
                 @click="goAddAttr(item)"
        >
          <CirclePlus/>
        </el-icon>
      </el-col>
    </el-row>
    <el-button type="primary" @click="addAttrHandler">添加新属性</el-button>
  </el-card>
  <!--属性管理-->
  <SupportRoomBaseDialog ref="roomBaseDialog" :getAttrList="getAttrList"></SupportRoomBaseDialog>
  <!--属性值管理-->
  <SupportRoomBaseAddOrUpdateDialog ref="roomBaseAddOrUpdateDialog"
                                    :getAttrList="getAttrList"></SupportRoomBaseAddOrUpdateDialog>
</template>

<style scoped lang="scss">
.card-header span {
  font-size: 18px;
  font-weight: bold;
}

.text-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

.supportRoomBase_icon {
  display: flex;
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
</style>