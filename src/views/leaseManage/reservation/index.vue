<script lang="ts">
export default {
  name: 'reservaTion'
}
</script>
<script setup lang="ts">
import {Delete, Refresh, Search, Setting, View} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {reqAppointMent, reqUpdateViewStatus} from "@/api/leaseManage/viewRoom";
import type {AppointMentInterface} from "@/api/leaseManage/viewRoom/type";
import messageBox from "@/untils/MessageBox";
import useLayOutsettingStore from "@/stores/modules/setting";
import TableManage from "@/components/tableManage/index.vue";
import PagiNation from "@/components/PagiNation/index.vue";
import BottomLogo from "@/components/BottomLogo/index.vue";

const tableData = reactive([
  {name: "姓名", display: true, order: false, prop: 'name'},
  {name: "手机", display: true, order: false, prop: 'phone'},
  {name: "所处省份", display: true, order: false, prop: 'apartmentInfo.addressDetail'},
  {name: "所处城市", display: true, order: false, prop: 'apartmentInfo.cityId'},
  {name: "所处区域", display: true, order: false, prop: 'apartmentInfo.districtName'},
  {name: "所处公寓", display: true, order: false, prop: 'apartmentInfo.name'},
  {name: "预约时间", display: true, order: false, prop: 'appointmentTime'},
  {name: "备注信息", display: true, order: false, prop: 'additionalInfo'},
  {name: "预约状态", display: true, order: false, prop: 'appointmentStatus'},
])
// 获取仓库数据
const useSettingStore = useLayOutsettingStore()
// 获取表格遮罩层
const tableManageRef = ref()
// 分页查询预约信息
const appointMentParams = reactive({
  current: 1,
  size: 10,
  provinceId: undefined,//预约公寓所在省份
  cityId: undefined,//预约公寓所在城市
  districtId: undefined,//	预约公寓所在区
  apartmentId: undefined,//预约公寓所在公寓
  name: undefined, //预约用户姓名
  phone: undefined//	预约用户手机号码
})
// 存储分页查询的数据
const appointMentDataItem: any = ref([])
// 存储数据总条数
const total = ref(0)

// 获取分页查询用户信息
const getAppointMent = async () => {
  const result: AppointMentInterface = await reqAppointMent(appointMentParams)
  if (result.code == 200) {
    appointMentDataItem.value = result.data.records
    total.value = result.data.total

  }
}
onMounted(() => {
  getAppointMent()
})
// 根据id更改预约状态的回调
const takeLookHandle = async (row: any) => {
  console.log(row.id, row.appointmentStatus)
  const result = await reqUpdateViewStatus(row.id, "3")
  if (result.code == 200) {
    // 消息提示
    messageBox.messageInfo('success', '操作成功')
    //   重新获取数据
    await getAppointMent()
  }
}
// 搜索按钮的回调
const goSearch = () => {
  getAppointMent()
}
// 重置按钮的回调
const goRest = () => {
  // 刷新按钮的回调
  useSettingStore.refresh = !useSettingStore.refresh
}
// 列设置
const goSetting = () => tableManageRef.value.openTable()
// 设置状态
const appointMentStatus = (status: number) => {
  switch (status) {
    case 1:
      return "待看房";
    case 2:
      return "已取消";
    case 3:
      return "已看房";
    case 4:
      return "已过期";
  }
}
</script>

<template>
  <el-card>
    <div class="ViewManage_container">
      <div class="view_header">
        <el-form :inline="true">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名:" style="width: 300px" v-model="appointMentParams.name" clearable/>
          </el-form-item>
          <el-form-item label="手机" v-model="appointMentParams.phone">
            <el-input placeholder="请输入手机号:" style="width: 300px" v-model="appointMentParams.phone" clearable/>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" :icon="Search" @click="goSearch">搜索</el-button>
          <el-button :icon="Delete" @click="goRest">重置</el-button>
        </div>
      </div>
      <div class="view_center">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="列设置"
            placement="bottom"
        >
          <el-button :icon="Refresh" size="small" circle @click="goRest"></el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="列设置"
            placement="bottom"
        >
          <el-button :icon="Setting" size="small" circle type="info" @click="goSetting"></el-button>
        </el-tooltip>
      </div>
      <div class="view_bottom">
        <el-table :data="appointMentDataItem" border style="margin: 10px 0">
          <template v-for="(item,index) in tableData" :key="index">
            <el-table-column v-if="item.display" :sortable="item.order" show-overflow-tooltip :label="item.name"
                             align="center" :prop="item.prop">
              <!--
                  当v-if和v-show同时写在一个标签中会  先渲染 v-for 在渲染v-if
              -->
              <template v-if="item.prop=='appointmentStatus'" #default="{row}">
                <el-tag :type="row.appointmentStatus==3?'info':'success'">
                  {{ appointMentStatus(row.appointmentStatus) }}
                </el-tag>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" align="center" width="150" #default="{row}">
            <el-button
                :icon="View"
                :type="row.appointmentStatus==3?'info':'primary'"
                :disabled="row.appointmentStatus !== 1"
                @click="takeLookHandle(row)"
            >待看
            </el-button>
          </el-table-column>
          <template #empty>
            <div style="margin-top: 30px">
              <img src="/src/assets/images/notData.png" alt="notData"/>
              <div>暂无数据</div>
            </div>
          </template>
        </el-table>
      </div>
      <PagiNation
          v-model:total="total"
          v-model:size="appointMentParams.size"
          v-model:current="appointMentParams.current"
          @getTableData=" getAppointMent"
      ></PagiNation>
    </div>
    <BottomLogo></BottomLogo>
  </el-card>
  <!--列设置弹出层-->
  <table-manage ref="tableManageRef" :drawer-data="tableData"></table-manage>
</template>

<style scoped lang="scss">
.ViewManage_container {
  padding: 20px;

  .view_header {
    display: flex;
    justify-content: space-between;
  }

  .view_center {
    display: flex;
    justify-content: flex-end;
  }

  .view_bottom {
    margin: 20px 0;
  }
}
</style>