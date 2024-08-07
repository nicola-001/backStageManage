<script setup lang="ts">
import BottomLogo from "@/components/BottomLogo/index.vue";

defineOptions({
  name: 'addOrUpdatePage'
})
import {onMounted, ref, watch} from 'vue'
import {Delete, Plus, ZoomIn} from '@element-plus/icons-vue'

import type {UploadFile} from 'element-plus'
import router from "@/router";
import {
  reqAreaList,
  reqFacilityList,
  reqFeeList, reqFileUload,

  reqLabelList,
  reqListByProvince,
  reqListCity
} from "@/api/apartment";
import type {
  FacilityListALLData,
  FeeValueListAllData,
  LabelListAllData,
  ProvinceAllData, ResponseData,
} from "@/api/apartment/type";
import messageBox from "@/untils/MessageBox";


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
  isRelease: 0,//是否发布
  feeValueIds: [],//获取公寓杂费
  labelIds: null,//公寓标签
  facilityInfoIds: [],//公寓配套
  graphVoList: [{ //图片信息
    name: "", //图片名称
    url: ""
  }],
})
// 存储省份数据
const provinceData = ref()
// 存储城市数据
const cityData = ref()
// 存储区域数据
const areaData = ref()
// 存储配套信息列表
const facilityData = ref()
// 存储公寓标签
const labelListData = ref()
// 存储公寓杂费
const feeValueIds = ref()
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
// 获取配套信息列表
const getFacilityList = async () => {
  const result: FacilityListALLData = await reqFacilityList("1")
  if (result.code == 200) {
    facilityData.value = result.data
  }
}
// 获取公寓标签
const getLabelList = async () => {
  const result: LabelListAllData = await reqLabelList("1")
  if (result.code == 200) {
    labelListData.value = result.data
  }
}
// 获取公寓杂费
const getFeeList = async () => {
  const result: FeeValueListAllData = await reqFeeList()
  if (result.code == 200) {
    feeValueIds.value = result.data
  }
}
// 挂载时
onMounted(() => {
//   获取省份信息
  getListByProvince()
//   获取公寓配套信息列表
  getFacilityList()
//   获取公寓标签
  getLabelList()
//   获取公寓杂费
  getFeeList()
})
// 控制照片遮罩层的显示与隐藏
const dialogVisible = ref(false)
// 上传图片地址
const dialogImageUrl = ref('')

// 预览的回调
const handlePictureCardPreview = (file: UploadFile) => {
  console.log('file', file)
  // 在swift中，file.url返回的是一个可选值，url?类型，
  // 这意味着也可能包含一个Url或者是nil，！是强制解包的方法，表示确定这个是一个可选值
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// 删除照片的回调
const handleRemove = () => {
  console.log('删除！')
}
// 图片改变的回调
const handleChange = async (file: any) => {
//   构造formatData的实例
  const formData = new FormData()
  console.log(file)
  formData.append('file', file.raw);
  const result = await reqFileUload(formData);
  if (result.code == 200) {
    console.log(result)
    const url = result.data
    addOrUpdateData.value.graphVoList.push({
      name: 'image',
      url: url,
    })
    messageBox.messageInfo('success', '上传成功！')
  } else {
    messageBox.messageInfo('error', '上传失败！')
  }
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
            <el-select v-model="addOrUpdateData.provinceId" placeholder="请选择省份" style="width: 12%" clearable>
              <el-option
                  v-for="item in provinceData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
            <el-select v-model="addOrUpdateData.cityId" placeholder="请选择城市" style="width: 12%" clearable>
              <el-option
                  v-for="item in cityData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
            <el-select v-model="addOrUpdateData.districtId" placeholder="请选择区域" style="width: 12%" clearable>
              <el-option
                  v-for="item in areaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100" style="width: 40%">
            <el-input clearable placeholder="请输入详细地址查询" v-model="addOrUpdateData.addressDetail"/>
          </el-form-item>
          <el-form-item label="公寓前台电话" label-width="100" style="width: 40%">
            <el-input placeholder="请输入公寓前台电话" v-model="addOrUpdateData.phone"/>
          </el-form-item>
          <el-form-item label="是否发布" label-width="100">
            <el-radio-group v-model="addOrUpdateData.isRelease">
              <el-radio :value="0" size="small">未发布</el-radio>
              <el-radio :value="1" size="small">已发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公寓配套" label-width="100" style="width: 40%">
            <el-select v-model="addOrUpdateData.facilityInfoIds" placeholder="请选择公寓配套" clearable multiple>
              <el-option
                  v-for="item in facilityData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓标签" label-width="100" style="width: 40%">
            <el-select v-model="addOrUpdateData.labelIds" placeholder="请选择公寓标签" clearable multiple>
              <el-option
                  v-for="item in labelListData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓杂费" label-width="100" style="width: 40%">
            <el-select v-model="addOrUpdateData.feeValueIds" placeholder="请选择公寓杂费" clearable multiple>
              <el-option
                  v-for="item in feeValueIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片" label-width="100">
            <el-upload
                v-model:file-list="addOrUpdateData.graphVoList.url"
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handleChange"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :accept="'image/*'"
                :limit="5"
            >
              <el-icon>
                <Plus/>
              </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img style="width: 100%;height: 100%;" :src="dialogImageUrl" alt="Preview Image"/>
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