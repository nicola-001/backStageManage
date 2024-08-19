<script setup lang="ts">
import BottomLogo from "@/components/BottomLogo/index.vue";

defineOptions({
  name: 'addOrUpdatePage'
})
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import {Plus} from '@element-plus/icons-vue'

import type {UploadFile} from 'element-plus'
import router from "@/router";
import {
  reqAreaList,
  reqFacilityList,
  reqFeeList,
  reqFileUload,
  reqLabelList,
  reqListByProvince,
  reqListCity, reqSaveOrUpdate
} from "@/api/apartment";
import type {
  addressDetailList,
  FacilityListALLData,
  FeeValueListAllData, ImgList,
  LabelListAllData,
  ProvinceAllData, SaveOrUpdateData, SaveOrUpdateDataReaultAllData, TreeData,
} from "@/api/apartment/type";
import messageBox from "@/untils/MessageBox";
import axios from "axios";
import login from "@/views/login/index.vue";


// 取消按钮的回调
const cancel = () => {
  router.push({name: "Apart"})
}
// 准备数据
const addOrUpdateData: SaveOrUpdateData = reactive({
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
  graphVoList: [],
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
const feeValueIds = ref<TreeData[]>()
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
watch(() => addOrUpdateData.provinceId, async (newProvinceId) => {
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
watch(() => addOrUpdateData.cityId, async (newCityId) => {
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
    // 在用树形选择器---->整理杂费信息的数据
    feeValueIds.value = result.data.map(item => {
      return {
        value: item.id + item.name,
        label: item.name,
        children: item.feeValueList.map((child: any) => {
          return {
            value: child.id,
            label: `${child.name} ${child.unit}(${item.name})`,
            parentId: item.id + item.name,
          }
        })
      }
    })
  }
}
// 当节点被点击的时候触发
const feeNodeClickHandle = (currentNode: TreeData, currentNodeObj: any) => {

  // 保证每个子节点只有一个被选中
  // 确保有选中是子级元素
  if (currentNode.parentId) {
    // console.log(currentNode,currentNodeObj)
    nextTick(() => {
      // let tempArr=[...addOrUpdateData.feeValueIds!]
      // console.log("过滤之前",addOrUpdateData.feeValueIds)
      //所有子元素的集合
      const childNodesItem = currentNodeObj.parent.childNodes
      // console.log('id:', currentNodeObj.id, 'childNodesItem', childNodesItem);
      // 便利所有子集元素
      for (let item of childNodesItem) {
        // console.log('item', item.id)
        // 清空所有的子级元素
        addOrUpdateData.feeValueIds = addOrUpdateData.feeValueIds!.filter(feeValueIdsItem => feeValueIdsItem != item.data.value)
      }
      // console.log("过滤完成的",addOrUpdateData.feeValueIds)
      // addOrUpdateData.feeValueIds=tempArr;
      // 将选中的元素放到数组中
      addOrUpdateData.feeValueIds!.push(Number(currentNode.value))
    })

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
// 详情地址建议列表
const addressDetailOptions = ref<addressDetailList[]>([])
// 请输入详情地址的加载
const loading = ref(false)


// 预览的回调
const handlePictureCardPreview = (file: UploadFile) => {
  // 在swift中，file.url返回的是一个可选值，url?类型，
  // 这意味着也可能包含一个Url或者是nil，！是强制解包的方法，表示确定这个是一个可选值
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// 上传之前的回调
const beforeUpdate = async (file: any) => {
  console.log('215487/7454548', file)
  // 返回false阻止默认行为 不往文件列表中添加该文件 可以在onChange钩子中手动添加
  return false;
}
// 图片改变的回调
const handleChange = async (file: any) => {
  console.log(1489784518, file)
  //   构造formatData的实例
  const formData = new FormData()
  formData.append('file', file.raw);
  const result = await reqFileUload(formData);
  if (result.code == 200) {
    const imgObj: ImgList = {name: file.name, url: result.data,}
    addOrUpdateData.graphVoList.push(imgObj)
    messageBox.messageInfo('success', '上传成功！')
  } else {
    messageBox.messageInfo('error', '上传失败！')
  }
}
// 高德地图
const restapiAmap = async (keywords: string) => {
  const result = await axios({
    url: `https://restapi.amap.com/v3/assistant/inputtips?key=aebfa0e84a72f53d3f292652b8e9e38d&keywords=${keywords}`
  })
  if (result.data.status == 1) {
    addressDetailOptions.value = result.data.tips
  }
}
// 防抖和节流-->控制函数调用频率
/*
    防抖：
      --等待最后一次触发后的时间段才执行函数
     （ eg,用户输入事件，发送请求之前，窗口大小调整或滚动事件的最终处理）
    节流：
      --限制函数在时间间隔内的调用频率，确保每个时间间隔只执行一次。
      （eg,滚动事件的处理，动态加载内容，窗口大小调整的处理，频繁触发的操作）
 */

// 自定义远程搜索方法
// 防抖函数
const debounce = (func: Function, wait: number) => {
  let timeout: number | null = null;

  return (...args: any[]) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => func(...args), wait);
  };
};

// 设定防抖时间，例如 300ms
const debouncedRemoteMethod = debounce((query: string) => {
  if (query) {
    // 开始加载效果
    loading.value = true;
    setTimeout(() => {
      // 停止加载效果
      loading.value = false;
      restapiAmap(query);
    }, 200);
  } else {
    addressDetailOptions.value = [];
  }
}, 800);


// 使用防抖后的函数
const remoteMethod = (query: string) => {
  debouncedRemoteMethod(query);
};
// 新增公寓
const handleAddApartment = async () => {
  const result: SaveOrUpdateDataReaultAllData = await reqSaveOrUpdate(addOrUpdateData)
  if (result.code == 200) {
    //   路由跳转
    await router.push({name: "Apart"})
    messageBox.messageInfo('success', '添加成功')
  } else {
    messageBox.messageInfo('error', '添加失败')
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
            <!--            <el-input clearable placeholder="请输入详细地址查询" v-model="addOrUpdateData.addressDetail"/>-->
            <el-select
                v-model="addOrUpdateData.addressDetail"
                filterable
                remote
                clearable
                placeholder="请输入详细地址"
                :remote-method="remoteMethod"
                :loading="loading"
                style="width: 140%"
            >
              <el-option
                  v-for="item in addressDetailOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              />
            </el-select>
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
            <el-tree-select
                v-model="addOrUpdateData.feeValueIds"
                placeholder="请选择公寓杂费"
                :data="feeValueIds"
                multiple
                clearable
                :render-after-expand="true"
                @node-click="feeNodeClickHandle"
            ></el-tree-select>
          </el-form-item>
          <el-form-item label="图片" label-width="100">
            <el-upload
                v-model:file-list="addOrUpdateData.graphVoList"
                action="#"
                list-type="picture-card"
                :before-upload="beforeUpdate"
                :on-change="handleChange"
                :on-preview="handlePictureCardPreview"
                :http-request="()=>{}"
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
        <el-button type="primary" style="width: 120px" @click="handleAddApartment">新增</el-button>
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
