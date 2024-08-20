<script lang="ts">
export default {
  name: 'ROOM'
}
</script>
<script setup lang="ts">

import {Delete, Edit, Plus, Refresh, Search, Setting} from "@element-plus/icons-vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
import {onMounted, reactive, ref} from "vue";
import {reqRoomPageItem} from "@/api/apartment/roomManageMent";
import PagiNation from "@/components/PagiNation/index.vue";

const paginationNumber = reactive({
  current: 1,//当前所在页
  size: 10,//当前所在页数大小
  provinceId: undefined,//省份id
  cityId: undefined,//城市id
  districtId: undefined,//区域id
})
const total = ref(0)
// 保存请求返回的数据
const recordsData = reactive([])

// 准备table中数据
const tableData = reactive([
  {name: "房间号", display: true, order: false, prop: 'roomNumber'},
  {name: "租金(元/月)", display: true, order: false, prop: 'rent'},
  {name: "所处省份", display: true, order: false, prop: 'apartmentInfo.provinceName'},
  {name: "所处城市", display: true, order: false, prop: 'apartmentInfo.cityName'},
  {name: "所处区域", display: true, order: false, prop: 'apartmentInfo.districtName'},
  {name: "所处公寓", display: true, order: false, prop: 'apartmentInfo.name'},
  {name: "入住状态", display: true, order: false, prop: 'isCheckIn'},
  {name: "发布状态", display: true, order: false, prop: 'isRelease'}
])
// 获取数据
const getRoomPageItem = async () => {
  const result = await reqRoomPageItem(paginationNumber)
  if (result.code === 200) {
    // 请求数据前将存储数据的容器置空
    recordsData.length = 0
    // 将获取到的数据存数到
    Object.assign(recordsData, result.data.records)
    total.value = result.data.total
  }
}
// 获取省份信息

onMounted(() => {
  // 获取数据
  getRoomPageItem()
})
</script>

<template>
  <el-card class="roomManage_container">
    <!--顶部-选择省份-城市-区域-->
    <div class="roomManage_top">
      <el-form :inline="true">
        <el-form-item label="省份">
          <el-select placeholder="请选择省份" style="width: 200px"></el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select placeholder="请选择城市" style="width: 200px"></el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select placeholder="请选择区域" style="width: 200px"></el-select>
        </el-form-item>
        <el-form-item label="公寓">
          <el-select placeholder="请选择公寓" style="width: 200px"></el-select>
        </el-form-item>
      </el-form>
      <div style="display: flex">
        <el-button :icon="Search" type="primary">搜索</el-button>
        <el-button :icon="Delete">重置</el-button>
      </div>
    </div>
    <div class="roomManage_Center">
      <!--新增房间-->
      <div style="display: flex;justify-content: space-between;margin: 15px 0">
        <el-button type="primary" :icon="Plus">新增房间</el-button>
        <div>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新"
              placement="bottom"
          >
            <el-button :icon="Refresh" circle/>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="列设置"
              placement="bottom"
          >
            <el-button type="info" :icon="Setting" circle/>
          </el-tooltip>
        </div>
      </div>
      <!--表格-->
      <el-table border style="width: 100%;margin: 15px 0" :data="recordsData">
        <template v-for="(item,index) in tableData" :key="index">
          <el-table-column :label="item.name" align="center" :prop="item.prop">
            <template #default="{row}">
              <!--table中现实不同的状态-->
              <!--入住状态-->
              <el-tag v-if="item.prop==='isCheckIn'" :type="row.isCheckIn ? 'success' : 'info'">
                {{ row.isCheckIn ? '可入住' : '未入住' }}
              </el-tag>
              <!--发布状态-->
              <el-switch v-if="item.prop==='isRelease'" v-model="row.isRelease" :active-value="1" :inactive-value="0"/>
            </template>
          </el-table-column>
        </template>

        <!--操作-->
        <el-table-column align="center" label="操作" width="180">
          <template #default="{row}">
            <el-button :icon="Edit" type="success" size="small">修改</el-button>
            <el-button :icon="Delete" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <PagiNation v-model:current="paginationNumber.current" v-model:size="paginationNumber.size"
                  v-model:total="total"
                  @getTableData="getRoomPageItem"></PagiNation>
    </div>
    <BottomLogo></BottomLogo>
  </el-card>
</template>

<style scoped lang="scss">
.roomManage_container {
  .roomManage_top {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

}
</style>