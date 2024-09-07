<script lang="ts">
export default {
  name: 'LEASE'
}
</script>
<script setup lang="ts">
import {ArrowDown, ArrowUp, Delete, Edit, Warning, Plus, Refresh, Search, Setting} from "@element-plus/icons-vue";
import {onMounted, reactive, ref, watch} from "vue";
import {reqArrageMent} from "@/api/leaseManage/lease";
import {
  reqApartmentList,
  reqAreaList,
  reqDeleteAgreement,
  reqListByProvince,
  reqListCity, reqUpdateStatusById
} from "@/api/apartment/apartManageMent";
import useLayOutsettingStore from "@/stores/modules/setting";
import TableManage from "@/components/tableManage/index.vue";
import {useRouter} from "vue-router";
import PagiNation from "@/components/PagiNation/index.vue";
import messageBox from "@/untils/MessageBox";

// 控制按钮的展开与合并
const isExpend = ref<boolean>(false)
// 控制按钮的展开与合并
const toggleExpand = () => isExpend.value = !isExpend.value;
// 获取仓库数据
const useSettingStore = useLayOutsettingStore()
// 获取tableRef标识
const tableManageRef = ref()
// 存储表格数据
const tableData = reactive([
  {name: "姓名", display: true, order: false, prop: 'name'},
  {name: "手机", display: true, order: false, prop: 'phone'},
  {name: "房间", display: true, order: false, prop: 'roomInfo.roomNumber'},
  {name: "签约公约", display: true, order: false, prop: 'apartmentInfo.name'},
  {name: "所处省份", display: true, order: false, prop: 'apartmentInfo.provinceName'},
  {name: "所处城市", display: true, order: false, prop: 'apartmentInfo.cityName'},
  {name: "所处区域", display: true, order: false, prop: 'apartmentInfo.districtName'},
  {name: "租约周期", display: true, order: false, prop: 'leaseStartDate'},
  {name: "租金（元/月）", display: true, order: false, prop: 'rent'},
  {name: "押金（元）", display: true, order: false, prop: 'deposit'},
  {name: "支付方式", display: true, order: false, prop: 'paymentType.name'},
  {name: "租期（月）", display: true, order: false, prop: 'leaseTerm.monthCount'},
  {name: "租约来源", display: true, order: false, prop: 'sourceType'},
  {name: "租约状态", display: true, order: false, prop: 'status'},
])
// 存储省份信息
const provinceData: any = ref({})
// 存储城市信息
const cityData: any = ref({})
// 存储区域信息
const areaData: any = ref({})
// 存储公寓信息
const apartmentData: any = ref([])

const router = useRouter();

// 根据条件分页查询租期列表参数
const arrageMentParams = reactive({
  current: 1,
  size: 10,
  provinceId: undefined,
  cityId: undefined,
  districtId: undefined,
  apartmentId: undefined,
  roomNumber: undefined,
  name: undefined,
  phone: undefined,
})
// 存储数据总条数
const total = ref(0)
// 存储请求回的数据
const arrageMentData: any = ref([])
// 根据条件分页查询租期列表
const getArrageMent = async () => {
  const result = await reqArrageMent(arrageMentParams)
  if (result.code == 200) {
    arrageMentData.value = result.data.records
    total.value = result.data.total
  }
}
// 租约状态
const leaseStatus = (value: number) => {
  switch (value) {
    case 1:
      return "签约待确认";
    case 2:
      return "已签约";
    case 3:
      return "已取消";
    case 4:
      return "已到期";
    case 5:
      return "退租待确认";
    case 6:
      return "已退租";
    case 7:
      return "续约待确认";
    default:
      return "未知状态";
  }
}
// 获取省份信息
const getProvince = async () => {
  const {data} = await reqListByProvince()
  provinceData.value = data
}
// 获取城市信息
const getCity = async () => {
  const {data} = await reqListCity(arrageMentParams.provinceId)
  cityData.value = data
}
// 获取区域信息
const getAreaList = async () => {
  const {data} = await reqAreaList(arrageMentParams.cityId)
  areaData.value = data
}
// 获取公寓信息
const getApartMent = async () => {
  const {data} = await reqApartmentList(arrageMentParams.districtId)
  apartmentData.value = data
}
// 根据省份id获取城市信息
watch(() => arrageMentParams.provinceId, () => getCity())
// 根据城市id获取区域信息
watch(() => arrageMentParams.cityId, () => getAreaList())
// 根据区域id获取公寓信息
watch(() => arrageMentParams.districtId, () => getApartMent())
// 重置按钮的回调
const goReset = () => useSettingStore.refresh = !useSettingStore.refresh
const goSetting = () => tableManageRef.value.openTable()
// 新增租约->路由跳转
const addLease = () => router.push({name: 'AddOrUpdateLease'})
// 搜索按钮
const goSearch = () => {
  getArrageMent()
}
onMounted(() => {
  // 根据条件获取分页查询租期列表
  getArrageMent()
  //获取省份信息
  getProvince()
})
// 修改信息
const updateInfo = async (id: number) => {
  await router.push({name: 'AddOrUpdateLease', query: {id: id}})
}
// 删除回调
const deleteItem = async (id: number) => {
  const result: any = await reqDeleteAgreement(id)
  if (result.code == 200) {
    messageBox.messageInfo('success', '删除成功！')
    //   重新获取数据
    await getArrageMent()
  }
}
//取消租约的回调
const cancelItem = async (id:number) => {
  const result: any = await reqUpdateStatusById(id, '3')
  if (result.code == 200) {
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    await getArrageMent()
  }
}
</script>

<template>
  <div class="lease_container">
    <el-card>
      <div class="lease_header">
        <el-form :inline="true" label-width="70" class="lease_header">
          <el-form-item label="姓名：" style="width:350px">
            <el-input placeholder="请输入姓名" v-model="arrageMentParams.name"/>
          </el-form-item>
          <el-form-item label="手机：" style="width:350px">
            <el-input placeholder="请输入手机" v-model="arrageMentParams.phone"/>
          </el-form-item>
          <el-form-item label="房间：" style="width:350px" v-if="isExpend">
            <el-input placeholder="请输入房间号" v-model="arrageMentParams.roomNumber"/>
          </el-form-item>
          <el-form-item label="省份：" style="width:350px" v-if="isExpend">
            <el-select v-model="arrageMentParams.provinceId" placeholder="请选择省份">
              <el-option
                  v-for="item in provinceData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="城市：" style="width:350px" v-if="isExpend">
            <el-select placeholder="请选择城市" v-model="arrageMentParams.cityId">
              <el-option
                  v-for="item in cityData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="区域 ：" style="width:350px" v-if="isExpend">
            <el-select placeholder="请选择区域" v-model="arrageMentParams.districtId">
              <el-option
                  v-for="item in areaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓：" style="width:350px" v-if="isExpend">
            <el-select placeholder="请选择公寓" v-model="arrageMentParams.apartmentId">
              <el-option
                  v-for="item in apartmentData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="goSearch">搜索</el-button>
            <el-button :icon="Delete" @click="goReset">重置</el-button>
            <el-button link type="primary" @click="toggleExpand">
              {{ isExpend ? '合并' : '展开' }}
              <el-icon>
                <!--component动态组件，根据条件动态切换组件-->
                <component :is="isExpend ? ArrowUp : ArrowDown"/>
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="lease_center">
        <el-button type="primary" :icon="Plus" @click="addLease">新增租约</el-button>
        <div>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新"
              placement="bottom"
          >
            <el-button circle :icon="Refresh" @click="goReset"></el-button>
          </el-tooltip>

          <el-tooltip
              class="box-item"
              effect="dark"
              content="列设置"
              placement="bottom"
          >
            <el-button circle type="info" :icon="Setting" @click="goSetting"></el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="lease_bottom">
        <el-table border :data="arrageMentData" style="width: 100%">
          <template v-for="(item,index) in tableData" :key="index">
            <el-table-column :label="item.name" align="center" show-overflow-tooltip
                             :prop="item.prop" :sortable="item.order" v-if="item.display">
              <template #default="{row}">
                <template v-if="item.prop=='sourceType'">
                  {{ row.sourceType == 1 ? '新签' : '' }}
                </template>
                <template v-if="item.prop=='status'">
                  <el-tag>
                    {{ leaseStatus(row.status) }}
                  </el-tag>
                </template>
              </template>

            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" label="操作" min-width="270">
            <template #default="{row}">
              <el-button type="success" :icon="Edit" size="small" @click="updateInfo(row.id)">修改</el-button>
              <el-popconfirm :title="`你确定要删除${row.name}吗？`" width="200" @confirm="deleteItem(row.id)">
                <template #reference>
                  <el-button type="danger" :icon="Delete" size="small">删除</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm :title="`你确定要取消${row.name}租约吗？`" width="200" @confirm="cancelItem(row.id)">
                <template #reference>
                  <el-button type="warning" :icon="Warning" size="small" v-if="row.status==1">
                    取消租约
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template #empty>
            <div style="margin-top: 40px">
              <img src="/src/assets/images/notData.png" alt="notData"/>
              <span>暂无数据</span>
            </div>
          </template>
        </el-table>
      </div>
      <PagiNation v-model:total="total"
                  v-model:size="arrageMentParams.size"
                  v-model:current="arrageMentParams.current"
                  @getTableData="getArrageMent"
      ></PagiNation>
    </el-card>
    <table-manage :drawer-data="tableData" ref="tableManageRef"></table-manage>
  </div>
</template>

<style scoped lang="scss">
.lease_container {
  padding: 20px;

  .lease_header {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .lease_center {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .lease_bottom {
    margin-bottom: 20px;
  }
}
</style>