<script setup lang="ts">
import {ArrowDown, ArrowUp, Delete, Search} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import {reqApartmentList, reqAreaList, reqListByProvince, reqListCity} from "@/api/apartment/apartManageMent";
import type {ProvinceAllData} from "@/api/apartment/apartManageMent/type";
import useLayOutsettingStore from "@/stores/modules/setting";
//定义组件名称
defineOptions({
  name: 'ApartMeantRoomTop',
})
// 获取仓库数据 用于刷新按钮
const useSettingStore = useLayOutsettingStore();

// 存储省份信息
let provinceData: any = ref({})
// 存储城市信息
let cityData: any = ref({})
// 存储区域信息
let arrList: any = ref({})
// 存储公寓信息
let apartMent: any = ref({})

// 获取父组件传递过来的数据 - 获取表单数据的回调
const props = defineProps(['getPageItem', 'sentData','isApartment'])

// 存储省份id
const provinceId: any = ref(undefined)
// 存储城市id
const cityId: any = ref(undefined)
// 存储区域id
const districtId: any = ref(undefined)
// 存储公寓id
const apartmentId: any = ref(undefined)

// 控制表单是否折叠 -> 展开
const isExtend = ref<boolean>(true)

// 获取省份请求
const getProvince = async () => {
  const result: ProvinceAllData = await reqListByProvince()
  if (result.code == 200) {
    // 保存请求回的省份信息
    provinceData.value = result.data
  }
}
// 获取城市请求
const getCity = async () => {
  const result = await reqListCity(provinceId.value)
  if (result.code == 200) {
    cityData.value = result.data
  }
}
// 获取区域请求
const getAreaList = async () => {
  const result = await reqAreaList(cityId.value)
  if (result.code == 200) {
    arrList.value = result.data
    console.log('arrList.value',arrList.value)
  }
}
// 获取公寓请求
const getApartmentList = async () => {
  const result = await reqApartmentList(districtId.value)
  if (result.code == 200) {
    apartMent.value = result.data
    console.log('apartmentId',result.data)
  }

}


// 监听事件根据收集省份的变化，获取城市的数据
watch(provinceId, () => {
  // 获取数据
  getCity()
  //若身省份id发生变化则清空数据
  cityId.value = undefined
  districtId.value = undefined
})
// 监听事件根据城市的变化，获取区域的数据
watch(cityId, () => {
  // 获取数据
  getAreaList()
  //若城市id发生变化则清空区域数据
  districtId.value = undefined
})
// 监听事件根据区域的变化，获取公寓的数据
watch(districtId, () => {
  // 获取公寓数据
  getApartmentList()
})

// 搜索按钮的回调
const goSearch = () => {
  console.log(provinceId.value, cityId.value, districtId.value)
  //调用获取form表单的参数
  props.getPageItem()
  props.sentData(provinceId.value, cityId.value, districtId.value)
}
// 重置按钮的回调
const goReset = () => {
  // 控制form表单的刷新
  useSettingStore.refresh = !useSettingStore.refresh
}

// 在挂载时发送请求
onMounted(() => {
//   获取省份信息
  getProvince()
})

</script>

<template>
  <div class="roomManage_top">
    <el-form :inline="true">
      <el-form-item label="省份">
        <el-select placeholder="请选择省份" v-model="provinceId" style="width: 200px" clearable>
          <el-option
              v-for="item in provinceData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select placeholder="请选择城市" v-model="cityId" style="width: 200px" clearable>
          <el-option v-for="item in cityData"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域" v-if="isExtend">
        <el-select placeholder="请选择区域" v-model="districtId" style="width: 200px" clearable>
          <el-option
              v-for="item in arrList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <div v-if="props.isApartment">
        <el-form-item label="公寓" v-if="isExtend">
          <el-select placeholder="请选择公寓" v-model="apartmentId" style="width: 200px" clearable>
            <el-option
                v-for="item in apartMent"
                :key="item.id"
                :label="item.introduction"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <el-button :icon="Search" type="primary" @click="goSearch">搜索</el-button>
    <el-button :icon="Delete" @click="goReset">重置</el-button>
    <el-button type="primary" link @click="isExtend=!isExtend" class="control">
      {{ isExtend ? '合并' : '展开' }}
      <el-icon>
        <component :is="isExtend ? ArrowUp : ArrowDown"/>
      </el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.roomManage_top {
  display: flex;
}
</style>