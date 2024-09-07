<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  reqAgreement,
  reqApartmentList,
  reqAreaList,
  reqListByProvince,
  reqListCity
} from "@/api/apartment/apartManageMent";
import {reqBasicApartment, reqSaveOrUpdateAgreement} from "@/api/leaseManage/lease";
import {reqPayMent, reqTermList} from "@/api/apartment/roomManageMent";
import messageBox from "@/untils/MessageBox";

defineOptions({
  name: 'AddOrUpdateLease',
})
// 引入路由
const router = useRouter()
const route = useRoute()
// 获取路由跳转传递过来的id
let id = route.query.id;
// 取消按钮
const goCancel = () => {
  router.push({name: 'Lease'})
}

// 新增或修改请求参数
const addOrUpdateParams = reactive({
  id: undefined,
  phone: undefined,//承租人手机号码
  name: undefined,//承租人姓名
  identificationNumber: undefined,//承租人身份证号码
  apartmentId: undefined,//签约公寓id
  roomId: undefined,//签约房间id
  leaseStartDate: undefined,//租约开始日期
  leaseEndDate: undefined,//租约结束日期
  leaseTermId: undefined,//租期id
  rent: 0,//租金（元/月）
  deposit: 0,//	押金（元）
  paymentTypeId: undefined,//	支付类型id
  status: 1,//租约状态,可用值:1,2,3,4,5,6,7
  sourceType: undefined,//租约来源,可用值:1,2
  additionalInfo: undefined,//备注信息
})

// 存储省份信息
const province: any = ref({})
// 存储城市信息
const city: any = ref({})
// 存储区域信息
const area: any = ref({})
// 存储公寓信息
const apartment: any = ref({})
// 存储房间信息
const room: any = ref({})
// 存储支付方式信息
const paymentData: any = ref({})
// 存储租期信息
const rentList: any = ref([])
// 收集省份id
const provinceId = ref(undefined)
// 收集城市id
const cityId: any = ref(undefined)
// 收集区域id
const districtId: any = ref(undefined)


// 获取省份信息
const getProvince = async () => {
  const {data} = await reqListByProvince()
  province.value = data
}
// 获取城市数据
const getCity = async () => {
  const {data} = await reqListCity(provinceId.value)
  city.value = data
}
// 获取区域数据
const getAreaList = async () => {
  const {data} = await reqAreaList(cityId.value)
  area.value = data
}
// 获取公寓列表
const getApartMent = async () => {
  const {data} = await reqApartmentList(districtId.value)
  apartment.value = data
}
// 获取房间数据
const getBasicApartment = async () => {
  const {data} = await reqBasicApartment(addOrUpdateParams.apartmentId)
  room.value = data
}
// 根据省份id获取城市数据
watch(() => provinceId.value, () => {
  getCity()
//   清除数据
  cityId.value = undefined
  districtId.value = undefined
  addOrUpdateParams.apartmentId = undefined
  addOrUpdateParams.roomId = undefined

})
// 根据城市数据获取区域数据
watch(() => cityId.value, () => {
  getAreaList()
//   清除数据
  districtId.value = undefined
  addOrUpdateParams.apartmentId = undefined
  addOrUpdateParams.roomId = undefined

})
// 根据区域id获取公寓列表
watch(() => districtId.value, () => {
  getApartMent()
  //   清除数据
  addOrUpdateParams.apartmentId = undefined
  addOrUpdateParams.roomId = undefined
})
watch(() => addOrUpdateParams.apartmentId, () => {
  getBasicApartment()
  addOrUpdateParams.roomId = undefined
})

// 获取支付方式接口
const getPayMent = async () => {
  const {data} = await reqPayMent()
  paymentData.value = data
}
// 查询全部租期列表
const getTermList = async () => {
  const {data} = await reqTermList()
  rentList.value = data
}
// 根据id查询租约信息
const getAgreement = async () => {
  const {data} = await reqAgreement(id)
  Object.assign(addOrUpdateParams, data)
}
onMounted(() => {
  // 获取省份信息
  getProvince()
//   获取支付方式接口
  getPayMent()
  // 查询租期列表
  getTermList()
//   根据id查询租约信息
  getAgreement()
})
// 新增或修改按钮的回调
const addOrUpdateBtn = async () => {
  const result: any = await reqSaveOrUpdateAgreement(addOrUpdateParams)
  if (result.code == 200) {
    console.log(result.data)
    messageBox.messageInfo('success', addOrUpdateParams.id ? '修改成功' : '新增成功')
    await router.push({name: 'Lease'})
  }
}
</script>

<template>
  <el-card>
    <div class="addOrUpdateLease_container">
      <div class="addOrUpdateLeaseHeader">
        <h2>{{ addOrUpdateParams.id ? '修改' : '新增' }}租约</h2>
        <el-divider style="margin-top: 15px"></el-divider>
      </div>
      <div class="addOrUpdateCenter">
        <el-form label-width="110"
        >
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" style="width: 70%;" v-model="addOrUpdateParams.name"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input placeholder="请输入手机号码" style="width: 70%;" v-model="addOrUpdateParams.phone"/>
          </el-form-item>
          <el-form-item label="身份证号码" prop="identificationNumber">
            <el-input placeholder="请输入身份证号码" style="width: 70%;"
                      v-model="addOrUpdateParams.identificationNumber"/>
          </el-form-item>
          <el-form-item label="房间" required>
            <el-form-item>
              <el-select placeholder="请选择省份" style="width: 150px" v-model="provinceId" clearable>
                <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="请选择城市" style="width: 150px" v-model="cityId" clearable>
                <el-option
                    v-for="item in city"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="请选择区域" style="width: 150px"
                         v-model="districtId" clearable>
                <el-option
                    v-for="item in area"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="apartmentId">
              <el-select placeholder="请选择公寓" style="width: 150px" clearable
                         v-model="addOrUpdateParams.apartmentId">
                <el-option
                    v-for="item in apartment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="roomId">
              <el-select placeholder="请选择房间" style="width: 150px" v-model="addOrUpdateParams.roomId"
                         clearable>
                <el-option
                    v-for="item in room"
                    :key="item.id"
                    :label="item.roomNumber"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="开始时间" prop="startData">
            <el-date-picker
                v-model="addOrUpdateParams.leaseStartDate"
                type="date"
                placeholder="开始时间"
                style="width: 20%"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endData">
            <el-date-picker
                v-model="addOrUpdateParams.leaseEndDate"
                type="date"
                placeholder="结束时间"
                style="width: 20%"
            />
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentTypeId">
            <el-select placeholder="请选择支付方式"
                       v-model="addOrUpdateParams.paymentTypeId"
                       clearable
                       style="width: 70%">
              <el-option
                  v-for="item in paymentData"
                  :key="item.id"
                  :label="`${item.name} (${item.additionalInfo})`"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="可选租期" prop="leaseTermId">
            <el-select placeholder="请选择租期" style="width: 70%" v-model="addOrUpdateParams.leaseTermId" clearable>
              <el-option
                  v-for="item in rentList"
                  :key="item.id"
                  :label="`${item.monthCount}${item.unit}`"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租金（元/月）">
            <el-input-number v-model="addOrUpdateParams.rent" :min="0"/>
          </el-form-item>
          <el-form-item label="押金（元）">
            <el-input-number v-model="addOrUpdateParams.deposit" :min="0"/>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
                v-model="addOrUpdateParams.additionalInfo"
                style="width: 70%"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入备注信息"
            />
          </el-form-item>
          <div class="btn">
            <el-button type="info" class="btnItem" @click="goCancel">取消</el-button>
            <el-button type="primary" class="btnItem" @click="addOrUpdateBtn">
              {{ addOrUpdateParams.id ? '保存' : '新增' }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>

  </el-card>
</template>

<style scoped lang="scss">
.addOrUpdateLease_container {
  padding: 10px;

  .addOrUpdateLeaseHeader {
    h2 {
      font-weight: 800;
    }
  }

  .addOrUpdateCenter {
    .btn {
      display: flex;
      justify-content: center;

      .btnItem {
        width: 150px;
      }
    }
  }
}
</style>