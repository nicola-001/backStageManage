<script setup lang="ts">
import BottomLogo from "@/components/BottomLogo/index.vue";

defineOptions({
  name: 'addOrUpdatePage'
})
import {onMounted, ref, watch} from 'vue'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

import type {UploadFile} from 'element-plus'
import router from "@/router";
import {reqAreaList, reqFeeList, reqListByProvince, reqListCity} from "@/api/apartment";
import type {ProvinceAllData, ProvinceData} from "@/api/apartment/type";
import {all} from "axios";
// 取消按钮的回调
const cancel = () => {
  router.push({name: "Apart"})
}
// 准备数据
const addOrUpdateData = ref({
  name: "",//公寓名称
  provinceId: null,//省份id
  cityId: null,//城市id
  districtId: null,//区域id
  introduction: "",//公寓介绍
  addressDetail: "",//详细地址
  phone: "",//公寓前台电话
  isRelease: "",//是否发布
  feeValueIds: [],//获取公寓杂费

})
// 存储省份数据
const provinceData = ref()
// 存储城市数据
const cityData = ref()
// 存储区域数据
const areaData = ref()
// 存储公寓杂费
const feeValueIds = ref([])
// 获取省份信息
const getListByProvince = async () => {
  const result: ProvinceAllData = await reqListByProvince()
  if (result.code == 200) {
    provinceData.value = result.data
  }
}
// 获取城市信息
const getCityList = async (provinceId: number) => {
  const result = await reqListCity(provinceId)
  if (result.code == 200) {
    cityData.value = result.data
  }
}
//监听省份id获取城市信息
watch(() => addOrUpdateData.value.provinceId, async (newProvinceId) => {
  //只有newProvinceId不为null或undefined时 才调用 getCityList
  if (newProvinceId !== null && newProvinceId !== undefined) {
    await getCityList(newProvinceId);
  }
})
// 获取区域信息
const getAreaList = async (cityId: number) => {
  const result = await reqAreaList(cityId)
  if (result.code == 200) {
    areaData.value = result.data
  }
}
// 监听城市id获取区域信息
watch(() => addOrUpdateData.value.cityId, async (newCityId) => {
  if (newCityId !== null && newCityId !== undefined) {
    await getAreaList(newCityId);
  }
})
// 获取公寓杂费
const getFeeList = async () => {
  const result = await reqFeeList()
  if (result.code == 200) {
   feeValueIds.value = result.data
  }
}
// 挂载时
onMounted(() => {
//   获取省份信息
  getListByProvince()
//   获取公寓杂费
  getFeeList()
})
// 测试
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const value = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
</script>

<template>
  <el-card>
    <div class="container">
      <!--顶部标题-->
      <div class="addHeader">
        <h1>新增公寓</h1>
        <el-divider style="margin-top: 15px"/>
      </div>
      <!--form表单-->
      <div class="addBody">
        <el-form :model="addOrUpdateData">
          <el-form-item label="公寓名称" label-width="100" style="width: 40%" size="default">
            <el-input v-model="addOrUpdateData.name"/>
          </el-form-item>
          <el-form-item label="公寓介绍" label-width="100" style="width: 40%" size="small">
            <el-input type="textarea" v-model:="addOrUpdateData.introduction"/>
          </el-form-item>
          <el-form-item label="所处区域" label-width="100">
            <el-select v-model="addOrUpdateData.provinceId" placeholder="请选择省份" style="width: 12%">
              <el-option
                  v-for="item in provinceData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
            <el-select v-model="addOrUpdateData.cityId" placeholder="请选择城市" style="width: 12%">
              <el-option
                  v-for="item in cityData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
            <el-select v-model="addOrUpdateData.districtId" placeholder="请选择区域" style="width: 12%">
              <el-option
                  v-for="item in areaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100" style="width: 40%">
            <el-input placeholder="请输入详细地址查询" v-model="addOrUpdateData.addressDetail"/>
          </el-form-item>
          <el-form-item label="公寓前台电话" label-width="100" style="width: 40%">
            <el-input placeholder="请输入公寓前台电话" v-model="addOrUpdateData.phone"/>
          </el-form-item>
          <el-form-item label="是否发布" label-width="100">
            <el-radio-group v-model="addOrUpdateData.isRelease">
              <el-radio value="1" size="small">未发布</el-radio>
              <el-radio value="0" size="small">已发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公寓配套" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓配套">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓标签" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓标签">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓杂费" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓杂费">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片" label-width="100">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <el-icon>
                <Plus/>
              </el-icon>

              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                  <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
                </div>
              </template>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image"/>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <!--底部-->
      <div class="addBottom">
        <el-button type="info" style="width: 120px" @click="cancel">取消</el-button>
        <el-button type="primary" style="width: 120px">新增</el-button>
      </div>
      <!--logo-->
      <BottomLogo></BottomLogo>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  .addHeader {
    h1 {
      font-weight: 800;
      font-size: 16px;
    }
  }

  .addBottom {
    display: flex;
    justify-content: center;
  }
}
</style>