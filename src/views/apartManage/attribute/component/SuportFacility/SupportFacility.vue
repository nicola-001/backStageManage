<script setup lang="ts">
import {onMounted, ref} from "vue";
import {reqFacilityList} from "@/api/apartment/apartManageMent";
import {BuildingTypeTypeMap} from "@/enums/constenmus";
import {reqDeleteAttribute} from "@/api/apartment/attributeManageMent";
import messageBox from "@/untils/MessageBox";
import SupportFacilityDialog from '@/views/apartManage/attribute/component/SuportFacility/SupportFacilityDialog.vue'
import type {FacilityListData} from "@/api/apartment/apartManageMent/type";
import Icon_svg from "@/components/Icon_Svg/index.vue";

type SupportFacilityInterface = {
  label: string
  value: string
  children?: FacilityListData[]
}
defineOptions({
  name: 'SupportFacility'
})
// 配套类型
const facilityTypeList = ref<SupportFacilityInterface[]>([])
const supportDialog = ref()

// 获取配套信息列表
const getFacilityList = async () => {
  const {data} = await reqFacilityList()
  // 将BuildingTypeTypeMap深拷贝给facilityTypeList
  facilityTypeList.value = JSON.parse(JSON.stringify(BuildingTypeTypeMap))
  /*
  [
     {label: '公寓', value: 1,children[1,1]},
     {label: '房间', value:2 }
   ]
*/
  // data数组中每个item的 type值   归属到 facilityTypeList的类型中
  data.forEach((item: FacilityListData) => {
    const targetType = facilityTypeList.value.find(
        (item2: any) => item2.value === item.type
    )
    if (targetType) {
      // 这行代码确保 targetType 对象有一个 children 属性，且该属性是一个数组。
      targetType.children = targetType.children || []
      targetType.children.push(item)
    }
  })
}
onMounted(() => {
  getFacilityList()
})
// 删除配套信息
const deleteFacilityHandle = async (item2: any) => {
  const result: any = await reqDeleteAttribute(item2.id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功')
    //   重新获取数据
    await getFacilityList()
  }
}
// 修改配套信息
const editFacilityHandle = (item2: any) => {
  supportDialog.value.show(item2.id,item2)
}
// 添加配套信息
const addFacilityHandle = (item:any) => {
  console.log('父组件',item)
  // 打开遮罩层
  supportDialog.value.show(item.value)
}

</script>

<template>
  <el-card class="Facility_container">
    <template #header>
      <div class="card_header">
        <span>配套信息管理</span>
      </div>
    </template>
    <el-row class="Facility_center" v-for="item in facilityTypeList" :key="item">
      <el-col :span="2" class="Facility_text">{{ item.label }}配套</el-col>
      <el-col :span="22" class="Facility_item">
        <el-popconfirm
            v-for="item2 in item.children || []"
            :key="item2.id"
            width="220"
            confirm-button-text="删除"
            cancel-button-text="修改"
            cancel-button-type="warning"
            @confirm="deleteFacilityHandle(item2)"
            @cancel="editFacilityHandle(item2)"
            :title="`修改或删除${item2.name}`"
        >
          <template #reference >
            <div class="item m-r-10 m-t-10 pointer">
              <Icon_svg size="25" color="black" :name="`rent-${item2.icon}`"/>
              <span>{{ item2.name }}</span>
            </div>
          </template>
        </el-popconfirm>
        <el-icon class="CirclePlus" size="35" @click="addFacilityHandle(item)">
          <CirclePlus/>
        </el-icon>
      </el-col>
    </el-row>
  </el-card>
  <!--添加修改按钮遮罩层-->
  <SupportFacilityDialog
      ref="supportDialog"
      v-model:facilityTypeList="facilityTypeList"
  ></SupportFacilityDialog>
</template>

<style scoped lang="scss">
.Facility_container {
  .card_header {
    font-size: 18px;
    font-weight: bold;
  }

  .Facility_center {
    .Facility_text {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
    }

    .Facility_item {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 10px 15px;
      background-color: #efefef;
      border-radius: 20px;

      .item {
        margin: 0 3px;
      }

      .CirclePlus {
        height: 40px;
        width: 40px;
        color: green;
      }
    }
  }
}

</style>