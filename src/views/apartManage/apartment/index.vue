<script setup lang="ts">
import {Delete, Plus, Refresh, Search, Setting, Edit} from "@element-plus/icons-vue";
// 为当前组件命名
defineOptions({
  name: 'apartMent'
})
import {onMounted, type Reactive, reactive, ref, watch} from 'vue'
import {reqApartment, reqAreaList, reqListByProvince, reqListCity, reqRemoveById} from "@/api/apartment";
import type {
  ApartmantAllData, AreaAllData,
  CityAllData, DeleteAllData, DeleteData,
  ProvinceAllData,
  Records
} from "@/api/apartment/type";
import PagiNation from "@/components/PagiNation/index.vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
import useLayOutsettingStore from "@/stores/modules/setting";
import TableManage from "@/components/tableManage/index.vue";
import {useRouter} from "vue-router";
import {ArrowUp, ArrowDown} from '@element-plus/icons-vue';
import Message from "@/untils/MessageBox";
// 引入仓库的数据
const settingStore = useLayOutsettingStore()
// 表头数据
const tableData = reactive([
  {name: "名称", display: true, order: false, prop: 'name'},
  {name: "详细地址", display: true, order: false, prop: 'addressDetail'},
  {name: "空闲房间数", display: true, order: false, prop: 'freeRoomCount'},
  {name: "房间总数", display: true, order: false, prop: 'totalRoomCount'},
  {name: "所处省份", display: true, order: false, prop: 'provinceName'},
  {name: "所处城市", display: true, order: false, prop: 'cityName'},
  {name: "联系方式", display: true, order: false, prop: 'phone'},
  {name: "入住状态", display: true, order: false, prop: 'isCheck'},
  {name: "发布状态", display: true, order: false, prop: 'isRelease'},
])
// 当前页获取条数大小
const size = ref(10)
// 当前页所在页
const current = ref(1)
// 当前页返回数据总条数
const total = ref(0)
// 存储公寓管理请求回的数据
let apartmentData: Records[] = reactive([])
// 获取自定义列标题组建设
const tableManageRef = ref()
// from表单控制是否折叠 展开
const isExtend = ref<boolean>(true)
// 存储获取省份数据
const province: any = reactive({})
// 选择省份id
const provinceId = ref<number>('')
// 存储获取城市数据
let city: any = ref({})
// 选择城市id
const cityId = ref<number>('')
// 存数获取地区数据
const area: any = ref({})
// 选择区域id
const districtId = ref<number>('')
// 获取数据
const getApartment = async () => {
  const result: ApartmantAllData = await reqApartment(current.value, size.value, provinceId.value, cityId.value, districtId.value)
  if (result.code == 200) {
    apartmentData = result.data.records
    size.value = result.data.size
    current.value = result.data.current
    total.value = result.data.total
  }
}
// 刷新按钮
const refresh = () => {
  // 控制数据的刷新
  settingStore.refresh = !settingStore.refresh
}
// 设置按钮
const settingData = () => tableManageRef.value.openTable();
const router = useRouter();
// 新增公寓
const addManagement = () => {
  router.push({name: "addOrUpdatePage"})
}
// 修改操作
const updateOPeration = () => {
}
//获取查询省份信息列表
const getListByProvince = async () => {
  const result: ProvinceAllData = await reqListByProvince()
  if (result.code == 200) {
    Object.assign(province, result.data)
  }
}
// 事件监听  若有id则发送请求 获取  城市列表
watch(provinceId, async (newValue) => {
  await getCityList(newValue)
})
// 根据省份id获取城市id
const getCityList = async () => {
  const result: CityAllData = await reqListCity(provinceId.value)
  if (result.code == 200) {
    city.value = result.data
  }
}
// 监听城市id，若城市id有数据则发送请求
watch(cityId, async (newValue) => {
  await getAreaList(newValue)
})
// 根据城市id获取区域id
const getAreaList = async () => {
  const result: AreaAllData = await reqAreaList(cityId.value)
  if (result.code == 200) {
    area.value = result.data
  }
}
// 挂载时
onMounted(() => {
  // 获取表格内数据
  getApartment()
  //获取查询省份信息列表
  getListByProvince()
})
// 搜索按钮
const goSearch = async () => {
  if (provinceId.value == '' && cityId.value == '' && districtId.value == '') {
    return
  } else {
    await getApartment()
  }
}
// 重置按钮
const goReset = () => {
  // 刷新操作
  settingStore.refresh = !settingStore.refresh
}
// 删除按钮的回调
const deleteItem = async (id: number) => {
  const result: DeleteAllData = await reqRemoveById(id)
  if (result.code == 200) {
    // 删除提示框
    Message.messageInfo('success', "删除成功")
    //   重新获取数据
    await getApartment()
  }
}
</script>

<template>
  <el-card>
    <div class="apartment_container">
      <!--顶部表单-->
      <el-form :inline="true">
        <div class="apartment_top">
          <el-form-item label="省份：">
            <el-select class="select" v-model="provinceId" placeholder="请选择省份" clearable>
              <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="城市：">
            <el-select class="select" v-model="cityId" placeholder="请选择城市" clearable>
              <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isExtend" label="区域：" class="area">
            <el-select class="select" placeholder="请选择区域：" clearable v-model="districtId">
              <el-option v-for="item in area" :value="item.id" :label="item.name" :key="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="goSearch">搜索</el-button>
            <el-button :icon="Delete" @click="goReset">重置</el-button>
            <el-button type="primary" link @click="isExtend=!isExtend" class="control">
              {{ isExtend ? '合并' : '展开' }}
              <el-icon>
                <component :is="isExtend ? ArrowUp : ArrowDown"/>
              </el-icon>
            </el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-form v-if="false">
        <el-form-item style="float: right">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button :icon="Delete">重置</el-button>
          <el-button type="primary" link @click="isExtend=!isExtend" class="control">
            {{ isExtend ? '展开' : '合并' }}
            <el-icon>
              <component :is="isExtend ? ArrowDown : ArrowUp"/>
            </el-icon>
          </el-button>
        </el-form-item>
      </el-form>
      <!--新增公寓以及刷新设置按钮-->
      <div class="apartment_bottom">
        <div class="bottom_button">
          <el-button type="primary" :icon="Plus" @click="addManagement">新增公寓</el-button>
          <div class="bottom_right">
            <!--刷新-->
            <el-tooltip
                class="box-item"
                effect="dark"
                content="刷新"
                placement="bottom"
            >
              <el-button :icon="Refresh" size="small" circle @click="refresh"></el-button>
            </el-tooltip>
            <!--设置-->
            <el-tooltip
                class="box-item"
                effect="dark"
                content="列设置"
                placement="bottom"
            >
              <el-button :icon="Setting" size="small" circle type="info" @click="settingData"></el-button>
            </el-tooltip>

          </div>
        </div>
      </div>
      <!--表格-->
      <el-table border :data="apartmentData" style="width: 100%;margin: 20px 0">
        <template v-for="(item,index) in tableData" :key="index">
          <el-table-column v-if="item.display" :sortable="item.order" show-overflow-tooltip :label="item.name"
                           align="center" :prop="item.prop">
            <!--table中内容不同显示状态-->
            <template #default="{row}">
              <!--判断是否可入住-->
              <el-tag v-if="item.prop === 'isCheck'" :type="row.freeRoomCount > 0 ? 'success' : 'info'">
                {{ row.freeRoomCount > 0 ? '可入住' : '已满房' }}
              </el-tag>
              <!--发布状态switch-->
              <el-switch v-if="item.prop=='isRelease'" v-model="row.isRelease" :active-value="1" :inactive-value="0"/>
            </template>
          </el-table-column>
        </template>
        <!--操作-->
        <el-table-column align="center" fixed="right" label="操作" min-width="180">
          <template #default="{row}">
            <el-button type="success" size="small" :icon="Edit" @click="updateOPeration">修改</el-button>
            <el-popconfirm :title="`你确定要删除${row.name}吗?`" @confirm="deleteItem(row.id)">
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!--表格没有数据-->
        <template #empty>
          <div style="margin-top: 30px">
            <img src="/src/assets/images/notData.png" alt="notData"/>
            <div>暂无数据</div>
          </div>
        </template>
      </el-table>
      <!--分页器-->
      <PagiNation v-model:current="current" v-model:size="size" v-model:total="total"
                  @getTableData="getApartment"></PagiNation>
      <!-- 底部-->
      <BottomLogo></BottomLogo>
    </div>
  </el-card>
  <!--弹出框列设置按钮-->
  <table-manage ref="tableManageRef" :drawer-data="tableData"></table-manage>
</template>

<style scoped lang="scss">
.apartment_container {
  .apartment_top {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .select {
      width: 180px;
      height: 30px;
    }

    .extend:hover {
      cursor: pointer;
    }

  }

  .apartment_bottom {
    margin-top: 20px;

    .bottom_button {
      display: flex;
      justify-content: space-between;

      .bottom_right {
        display: flex;
      }
    }
  }
}
</style>