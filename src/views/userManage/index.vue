<script lang="ts">
export default {
  name: 'userManage'
}
</script>
<script setup lang="ts">

import {Refresh, Search, Setting} from "@element-plus/icons-vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
import {onMounted, reactive, ref} from "vue";
import {reqUpdateUser, reqUserPage} from "@/api/user";
import messageBox from "@/untils/MessageBox";
import PagiNation from "@/components/PagiNation/index.vue";
import useLayOutsettingStore from "@/stores/modules/setting";
import TableManage from "@/components/tableManage/index.vue";
// 引入仓库数据
const useSettingStore = useLayOutsettingStore();
// 查询用户信息请求参数
const userParams = ref({
  current: 1,  //当前页
  size: 10,   //每页数据大小
  phone: "", //用户手机号码
  status: "" //用户帐号状态
})
const status = [
  {
    value: '0',
    label: '禁用',
  },
  {
    value: '1',
    label: '正常',
  }
]
const total = ref(0)
// 存储请求回数据的参数
let userData = ref([])
const tableManageRef = ref()
const tableData: any = reactive([
  {name: "昵称", display: true, order: false, prop: 'nickname'},
  {name: "头像", display: true, order: false, prop: 'avatarUrl'},
  {name: "手机", display: true, order: false, prop: 'phone'},
  {name: "账号状态", display: true, order: false, prop: 'status'},
])
// 查询用户信息
const getUserPage = async () => {
  const result: any = await reqUserPage(userParams.value)
  if (result.code == 200) {
    //   存储数据
    userData.value = result.data.records
    // 总条数
    total.value = result.data.total
  }
}
//账号状态回调
const chengeAccountStatus = async (row: any) => {
  console.log(row.id, row.status)
  const result = await reqUpdateUser(row.id, row.status)
  if (result.code == 200) {
    messageBox.messageInfo('success', '修改成功')
  }
}
onMounted(() => {
// 查询用户信息
  getUserPage()
})
// 刷新
const goRefresh = () => {
  useSettingStore.refresh = !useSettingStore.refresh
}
// 列设置
const goSetting = () => tableManageRef.value.openTable();
// 搜索按钮的回调
const goSearch = () => {
  getUserPage()
}
// 重置按钮的回调
const goReset=()=>{
 useSettingStore.refresh = !useSettingStore.refresh
}

</script>

<template>
  <el-card>
    <div class="user_container">
      <el-form :inline="true" class="form_header">
        <div>
          <el-form-item label="手机:" style="width:400px">
            <el-input placeholder="请输入手机号" v-model="userParams.phone" clearable/>
          </el-form-item>
          <el-form-item label="账号状态:" style="width: 280px">
            <el-select
                clearable
                v-model="userParams.status"
                placeholder="请选择状态"
            >
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-button type="primary" :icon="Search" @click="goSearch">搜索</el-button>
          <el-button :icon="Search" @click="goReset">重置</el-button>
        </div>
      </el-form>
      <div class="user_center">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="刷新"
            placement="bottom"
        >
          <el-button circle :icon="Refresh" @click="goRefresh"></el-button>
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
      <div>
        <el-table border :data="userData" stripe style="width: 100%" class="user_bottom">
          <template v-for="(item,index) in tableData" :key="index">
            <el-table-column v-if="item.display" :label="item.name" align="center" :prop="item.prop"
                             :sortable="item.order">
              <template #default="{row}">
                <img :src="row.avatarUrl" v-if="item.prop=='avatarUrl'" style="width: 60px;height:60px"/>
                <el-switch @change="chengeAccountStatus(row)" v-if="item.prop=='status'" v-model="row.status"
                           :active-value="1" :inactive-value="0"/>
              </template>
            </el-table-column>
          </template>
          <template #empty>
            <div style="margin-top: 30px">
              <img src="/src/assets/images/notData.png" alt="notData"/>
              <div>暂无数据</div>
            </div>
          </template>
        </el-table>
        <!--分页器-->
        <PagiNation
            v-model:size="userParams.size"
            v-model:current="userParams.current"
            v-model:total="total"
            @getTableData="getUserPage"
        ></PagiNation>
      </div>
      <BottomLogo></BottomLogo>
    </div>
  </el-card>
  <table-manage :drawer-data="tableData" ref="tableManageRef"></table-manage>
</template>

<style scoped lang="scss">
.user_container {
  .form_header {
    display: flex;
    justify-items: center;
    justify-content: space-between;
  }

  .user_center {
    display: flex;
    justify-content: flex-end;
  }

  .user_bottom {
    margin: 15px 0;
  }
}
</style>