<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
import {Plus} from '@element-plus/icons-vue'
import type {UploadProps} from 'element-plus'
import router from "@/router";
import {
  reqApartmentList,
  reqAreaList, reqDetailById,
  reqFacilityList, reqFileUload, reqLabelList,
  reqListByProvince,
  reqListCity, reqRoomDetailById
} from "@/api/apartment/apartManageMent";
import type {ImgList, ProvinceAllData} from "@/api/apartment/apartManageMent/type";
import {reqAttrList, reqPayMent, reqTermList} from "@/api/apartment/roomManageMent";
import messageBox from "@/untils/MessageBox";
import {reqSaveOrUpdate} from "@/api/system/user";
import {useRoute} from "vue-router";

// 组件命名
defineOptions({
  name: 'AddOrUpdateRoom',
})

// 取消按钮的回调
const cancel = () => {
  router.push({name: 'Room'})
}
// 通过路由传递过来的参数
const route = useRoute()
const queryParams = route.query

// 收集数据
const addOrUpdataParams: any = ref({
  id: "",
  roomNumber: '',//房间号
  rent: 0,//租金（元/月）
  apartmentId: "", //所属公寓id
  isRelease: 0, //是否发布,可用值:1,0
  graphVoList: [],//图片信息
  attrValueIds: [],//属性信息列表
  facilityInfoIds: [],//配套信息列表
  labelInfoIds: [],//标签信息列表
  paymentTypeIds: [],//支付方式列表
  leaseTermIds: []//可选租期列表
})

// 收集省份id
const provinceId = ref(undefined)
// 收集城市id
const cityId = ref(undefined)
// 收集区域id
const districtId = ref(undefined)


// 存储省份信息
const provinceData: any = ref({})
// 存储城市数据
const cityData: any = ref({})
// 存储区域数据
const districtData: any = ref({})
// 存储公寓数据
const apartmentData: any = ref({})

// 存储全部属性名称和属性值列表的数据
const attrList: any = ref({})
// 存储房间配套的数据
const roomList: any = ref({})
// 存储房间标签的数据
const roomLabelList: any = ref({})
// 存储支付方式的数据
const payMentList: any = ref({})
// 存储全部租期列表的数据
const termList: any = ref({})

// 获取省份数据
const getProvince = async () => {
  const result: ProvinceAllData = await reqListByProvince()
  if (result.code == 200) {
    provinceData.value = result.data
  }
}
// 根据省份id获取城市数据
const getCity = async () => {
  const result = await reqListCity(provinceId.value)
  if (result.code == 200) {
    cityData.value = result.data
  }
}
// 根据城市id获取区域数据
const getDistrictList = async () => {
  const result = await reqAreaList(cityId.value)
  if (result.code == 200) {
    districtData.value = result.data
  }
}
// 根据区域数据获取公寓数据
const getApartment = async () => {
  const result = await reqApartmentList(districtId.value)
  if (result.code == 200) {
    apartmentData.value = result.data
  }
}

// 监听事件，根据省份id获取城市数据
watch(provinceId, () => {
  // 获取数据
  getCity()
//   清空数据
  cityId.value = undefined
  districtId.value = undefined
  addOrUpdataParams.value.apartmentId = ""
})
// 监听事件，根据城市id获取区域数据
watch(cityId, () => {
  getDistrictList()
  //   清空数据
  districtId.value = undefined
  addOrUpdataParams.value.apartmentId = ""
})
// 监听事件，根据区域id获取公寓数据
watch(districtId, () => {
  getApartment()
//   清空数据
  addOrUpdataParams.value.apartmentId = ""
})

//查询全部属性名称和属性值列表
const getAttrList = async () => {
  const result = await reqAttrList()
  if (result.code == 200) {
    attrList.value = result.data
  }
}
// 获取房间配套
const getRoomList = async () => {
  const result = await reqFacilityList("2")
  if (result.code == 200) {
    roomList.value = result.data
  }
}
// 获取房间标签
const getLabelList = async () => {
  const result = await reqLabelList("2")
  if (result.code == 200) {
    roomLabelList.value = result.data
  }
}
// 获取支付方式
const getPayMent = async () => {
  const result = await reqPayMent()
  if (result.code == 200) {
    payMentList.value = result.data
  }
}
// 获取全部租期列表
const getTermList = async () => {
  const result = await reqTermList()
  if (result.code == 200) {
    termList.value = result.data
  }
}
// 根据id获取房间详细信息
const getDetailRoom = async () => {
  const result: any = await reqRoomDetailById(queryParams.ItemId)
  console.log(result)
  if (result.code == 200) {
    console.log(result.data)
    //   合并参数
    addOrUpdataParams.value = result.data
    //   属性id
    addOrUpdataParams.value.attrValueIds = result.data.attrValueIds.map((item: any) => item.attrValueId) || []
  }
}

onMounted(() => {
  // 获取省份信息
  getProvince()
  //获取全部属性名称和属性值列表
  getAttrList()
  //获取房间配套
  getRoomList()
  //获取房间标签
  getLabelList()
  //获取支付方式
  getPayMent()
  //获取全部租期列表
  getTermList()
  // 获取房间全部信
  getDetailRoom()
  // 根据id获取编辑的信息
  console.log('111', queryParams.ItemId)
})


const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 上传之前的回调
const beforeUpdate = async (file: any) => {
  console.log('215487/7454548', file)
  // 返回false阻止默认行为 不往文件列表中添加该文件 可以在onChange钩子中手动添加
  return false;
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  // 上传图片成功后被用来更新对话框的元素
  dialogImageUrl.value = uploadFile.url!
  // 打开图片预览功能
  dialogVisible.value = true
}
// 图片改变的回调
const handleChange = async (file: any) => {
  //   构造formatData的实例
  const formData = new FormData()
  formData.append('file', file.raw);
  const result = await reqFileUload(formData);
  if (result.code == 200) {
    const imgObj: ImgList = {name: file.name, url: result.data,}
    addOrUpdataParams.value.graphVoList.push(imgObj)
    messageBox.messageInfo('success', '上传成功！')
  } else {
    messageBox.messageInfo('error', '上传失败！')
  }
}
// 新增或修改按钮
const addBtn = async () => {
  const result: any = await reqSaveOrUpdate(addOrUpdataParams.value)
  if (result.code == 200) {
    // 添加成功之后进行路由跳转
    await router.push({name: "Room"})
  }
}


</script>

<template>
  <el-card>
    <div class="container">
      <!--顶部标题-->
      <div class="header">
        <h1>新增房间</h1>
        <el-divider/>
      </div>
      <!--form表单-->
      <div class="center">
        <el-form label-width="120" :model="addOrUpdataParams">
          <el-form-item label="房间号" style="width: 53%">
            <el-input v-model="addOrUpdataParams.roomNumber" clearable/>
          </el-form-item>
          <el-form-item label="租金(元/月)">
            <el-input-number v-model="addOrUpdataParams.rent" :min="0"/>
          </el-form-item>
          <el-form-item label="所属公寓">
            <el-form-item style="width: 130px">
              <el-select placeholder="请选择省份" v-model="provinceId" clearable>
                <el-option
                    v-for="item in provinceData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="width: 130px">
              <el-select placeholder="请选择城市" v-model="cityId" clearable>
                <el-option
                    v-for="item in cityData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="width: 130px">
              <el-select placeholder="请选择区域" v-model="districtId" clearable>
                <el-option
                    v-for="item in districtData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="width: 130px">
              <el-select placeholder="请选择公寓" v-model="addOrUpdataParams.apartmentId" clearable>
                <el-option
                    v-for="item in apartmentData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-radio-group v-model="addOrUpdataParams.isRelease">
              <el-radio :value="0" size="large">未发布</el-radio>
              <el-radio :value="1" size="large">已发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间属性" style="width: 53%">
            <el-select placeholder="请选择房间属性" clearable v-model="addOrUpdataParams.attrValueIds" multiple>
              <el-option
                  v-for="item in attrList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="房间配套" style="width: 53%">
            <el-select placeholder="请选择房间配套" v-model="addOrUpdataParams.facilityInfoIds" clearable multiple>
              <el-option
                  v-for="item in roomList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="房间标签" style="width: 53%">
            <el-select placeholder="请选择房间标签" v-model="addOrUpdataParams.labelInfoIds" clearable multiple>
              <el-option
                  v-for="item in roomLabelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式" style="width: 53%">
            <el-select placeholder="请选择支付方式" v-model="addOrUpdataParams.paymentTypeIds" clearable multiple>
              <el-option
                  v-for="item in payMentList"
                  :key="item.id"
                  :label="`${item.name}(${item.additionalInfo})`"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="可选租期" style="width: 53%">
            <el-select placeholder="请选择租期列表" v-model="addOrUpdataParams.leaseTermIds" clearable multiple>
              <el-option
                  v-for="item in termList"
                  :key="item.id"
                  :label="`${item.monthCount} ${item.unit}`"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
                v-model:file-list="addOrUpdataParams.graphVoList"
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpdate"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :accept="'image/*'"
                :http-request="()=>{}"
            >
              <!--重写http方法，用来上传文件以及文件大小-->
              <el-icon>
                <Plus/>
              </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image"/>
            </el-dialog>
          </el-form-item>
        </el-form>
        <div class="center_button">
          <el-button type="info" style="width: 150px" @click="cancel">取消</el-button>
          <el-button type="primary" style="width: 150px" @click="addBtn">新增</el-button>
        </div>
      </div>
      <!--底部logo-->
      <BottomLogo/>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  padding: 5px;

  h1 {
    font-weight: 800;
    font-size: 16px;
  }

  .center {
    .center_button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>