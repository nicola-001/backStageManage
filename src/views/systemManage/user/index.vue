<script lang="ts">
export default {
  name: 'USER'
}
</script>
<script setup lang="ts">
import tableManage from '@/components/tableManage/index.vue'
import {Search, Delete, Plus, Setting, Refresh} from '@element-plus/icons-vue';
import {nextTick, onMounted, reactive, ref} from "vue";
import Message from '@/untils/MessageBox'
import {
  reqDeleteUser,
  reqIsUsernameAvailable,
  reqSaveOrUpdate,
  reqSystemUserPage,
  reqUpdateStatus
} from "@/api/system/user";
import {reqAllPost} from "@/api/system/post";
import type {ListRes} from "@/api/system/post/type";
import useLayOutsettingStore from "@/stores/modules/setting";
import PagiNation from "@/components/PagiNation/index.vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
// 分页器当前页数
const current = ref(1)
// 每页显示条数
const size = ref(10)
// 总条数
let total = ref<number>(0)
// 存数请求返回的员工数据
let employeeInfo = ref([])
// 控制抽屉的展示与隐藏
const drawer = ref<boolean>(false)

const tableManageRef = ref()

// 存储岗位信息
const allPost = reactive<ListRes[]>([])
// 获取el-from组件实例
let fromRef = ref()

// 新增或修改用户收集用户信息
const userInfo = reactive({
  // id
  id: 0,
  // 用户名
  username: '',
  //密码
  password: '',
  //昵称
  name: '',
  // 电话号
  phone: '',
  // 岗位
  postId: '',
  //类型
  type: -1,
})
// 员工姓名，手机号码
const employeeSearch = reactive({
  keywordName: '',
  keywordPhone: ''
})
// 获取仓库中的数据
let layOutSettingStore = useLayOutsettingStore()

// 抽屉的数据
const drawerData: any = reactive([
  {name: "员工姓名", display: true, order: false, prop: 'name'},
  {name: "手机号", display: true, order: false, prop: 'phone'},
  {name: "岗位", display: true, order: false, prop: 'postName'},
  {name: "用户类型", display: true, order: false, prop: 'type'},
  {name: "状态", display: true, order: false, prop: 'status'},
])
// 获取form组建实例
const employeeRef = ref()
//分页器- 每页条数改变时触发
const handleSizeChange = () => {
  getSystemUserPage()
}
//分页器- 当前页改变时触发
const handleCurrentChange = () => {
  getSystemUserPage()
}
// 获取后台用户列表
const getSystemUserPage = async () => {
  // 默认获取第一页数据
  const result: any = await reqSystemUserPage(current.value, size.value, employeeSearch.keywordName, employeeSearch.keywordPhone)
  if (result.code == 200) {
    // 获取返回的用户列表
    employeeInfo.value = result.data.records
    // 获取数据总条数
    total.value = result.data.total
  }
}
// 用户类型的映射
const employeeTypeMap: any = {
  0: '管理员',
  1: '普通用户'
}
// 添加员工按钮的回调
const addEmployee = async () => {
  // 打开抽屉
  drawer.value = true
  // 清空id
  userInfo.id = 0
  //  清空数据
  Object.assign(userInfo, {
    // 用户名
    username: '',
    //密码
    password: '',
    //昵称
    name: '',
    // 电话号
    phone: '',
    // 岗位
    postId: '',
    //类型
    type: -1
  })
  await nextTick(() => {
    //  移除表单验证结果
    fromRef.value.clearValidate()
  })
}
// 编辑按钮的回调
const editUser = async (row: any) => {
//   打开抽屉
  drawer.value = true
//   获取参数
  Object.assign(userInfo, row)
  await nextTick(() => {
    //   移除表单验证效果
    fromRef.value.clearValidate()
  })
}
// 删除按钮的回调
const deleteUser = async (row: any) => {
  const result = await reqDeleteUser(row.id)
  if (result.code == 200) {
    Message.messageInfo('success', '删除成功')
    //   重新获取数据
    await getSystemUserPage()
  }
}
// 抽屉确定按钮的回调
const confirm = async () => {
  // 表单验证通过后做其余操作
  await fromRef.value.validate()
//   添加或修改用户信息
  const result:any = await reqSaveOrUpdate(userInfo)
  if (result.code == 200) {
    Message.messageInfo('success', userInfo.id ? '修改成功' : '添加成功')
    //   重新获取用户数据
    await getSystemUserPage()
  }
//   关闭抽屉
  drawer.value = false
}
// 修改状态的回调
const changeStatus = async (row: any) => {
  await reqUpdateStatus(row.id, row.status)
}
// 获取全部岗位列表用于抽屉岗位选择
const getPost = async () => {
  const result = await reqAllPost()
  if (result.code == 200) {
    Object.assign(allPost, result.data)
  }
}
// 用户名自定义校验
const validateUsername = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    //发送请求判断用户名是否合法
    await reqIsUsernameAvailable(userInfo.username)
    callback()
  }
}
// 自定义校验密码
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 6) {
    callback(new Error('密码至少6位'))
  } else {
    //   通过验证
    callback()
  }
}
// 自定义校验昵称
const validateName = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请填写昵称'))
  } else {
    //   通过验证
    callback()
  }
}
// 自定义校验电话号
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请填写用户手机号'))
  } else {
    //   通过验证
    callback()
  }
}
// 表单校验规则
const rules = reactive({
  username: [{validator: validateUsername, trigger: 'blur', required: true}],
  password: [{validator: validatePassword, trigger: 'blur', required: true}],
  name: [{validator: validateName, trigger: 'blur', required: true}],
  phone: [{validator: validatePhone, trigger: 'blur', required: true}],
  postId: [{trigger: 'blur', required: true, message: '请选择岗位'}],
  type: [{trigger: 'blur', required: true, message: '请选择用户类型'}],
})
// 按条件搜索按钮的回调
const goSearch = async () => {
  if (employeeSearch.keywordName == '' && employeeSearch.keywordPhone == '') {
    return
  } else {
    // 发请求获取数据
    await getSystemUserPage()
  }

}

// 头部表单校验
const employeeRule = reactive({
  employeeName: [{trigger: 'blur'}],
  employeePhone: [{trigger: 'blur'}]
})
// 重置
const resetEmployeeForm = (aaa: any) => {
  // employeeRef.value.resetFields()
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
// 刷新表格
const tableRefresh = async () => {
//   重新发送请求或去表格中的数据
  await getSystemUserPage()
}

// 定义表格列的属性
onMounted(() => {
  // 页面挂载时获取数据
  getSystemUserPage()
//   获取岗位
  getPost()
})
// 表格设置
const tableTable = () => tableManageRef.value.openTable();
</script>

<template>
  <div class="user_container">
    <el-card class="user_card_top">
      <div class="user_top">
        <div class="input">
          <el-form :inline="true" :model="employeeSearch" :rules="employeeRule" ref="employeeRef">
            <el-form-item label="员工姓名：" prop="employeeName">
              <el-input clearable v-model="employeeSearch.keywordName" placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="employeePhone">
              <el-input clearable v-model="employeeSearch.keywordPhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <el-button :icon="Search" type="primary" @click="goSearch">搜索</el-button>
          <el-button :icon="Delete" @click="resetEmployeeForm(employeeRef)">重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="user_card">
      <div class="user_card_bottom">
        <div class="user_head">
          <el-button type="primary" :icon="Plus" @click="addEmployee">添加</el-button>
        </div>
        <div class="user_head_tools">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新表格"
              placement="bottom"
          >
            <el-button :icon="Refresh" circle @click="tableRefresh"/>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="列设置"
              placement="bottom"
          >
            <el-button type="info" :icon="Setting" circle @click="tableTable"/>
          </el-tooltip>

        </div>
      </div>
      <div>
        <el-table style="width: 100%;margin: 20px 0" border :data="employeeInfo" :default-sort="{}">
          <el-table-column type="index" label="序号" width="70" align="center"/>
          <template v-for="(item,index) in drawerData" :key="index">
            <el-table-column v-if="item.display" :label="item.name" align="center" :prop="item.prop"
                             :sortable="item.order">
              <template #default="{row}">
                <span v-if="item.prop=='type'">{{ employeeTypeMap[row.type] }}</span>
                <el-switch v-if="item.prop=='status'" @change="changeStatus(row)" v-model="row.status" :active-value="1"
                           :inactive-value="0"/>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" align="center" width="300">
            <template #default="{row}">
              <el-button type="primary" :icon="Setting" size="small" @click="editUser(row)">编辑</el-button>
              <el-popconfirm :title="`你确定要删除${row.name}吗？`" @confirm="deleteUser(row)" width="200">
                <template #reference>
                  <el-button type="danger" :icon="Delete" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
          <!--表格为空时，自定义配置内容-->
          <template #empty>
            <div style="margin-top: 30px">
              <img src="/src/assets/images/notData.png" alt="notData"/>
              <div>暂无数据</div>
            </div>
          </template>
        </el-table>
      </div>
      <!--分页器-->
      <PagiNation v-model:current="current" v-model:size="size" v-model:total="total"
                  @getTableData="getSystemUserPage"></PagiNation>
      <BottomLogo></BottomLogo>
    </el-card>
    <!--抽屉-->
    <el-drawer v-model="drawer" size="400">
      <template #header>
        <h1 style="font-weight: 600;font-size: 20px">{{ userInfo.id ? '修改用户' : '新增用户' }}</h1>
      </template>
      <template #default>
        <el-form status-icon :model="userInfo" :rules="rules" ref="fromRef">
          <el-form-item label="用户名：" label-width="100" prop="username">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码：" label-width="100" prop="password">
            <el-input v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称：" label-width="100" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="手机：" label-width="100" prop="phone">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="岗位：" label-width="100" prop="postId">
            <el-select v-model="userInfo.postId" placeholder="请选择岗位" style="width: 240px">
              <el-option
                  v-for="item in allPost"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型：" label-width="100" prop="type">
            <el-radio-group v-model="userInfo.type" class="ml-4">
              <el-radio :value="0" size="large">管理员</el-radio>
              <el-radio :value="1" size="large">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!--列标题设置抽屉-->
    <tableManage ref="tableManageRef" :drawer-data="drawerData"></tableManage>
  </div>
</template>

<style scoped lang="scss">
.user_container {
  .user_card_top {
    height: 75px;

    .user_top {
      display: flex;
      justify-content: space-between;
    }
  }

  .user_card {
    margin: 15px 0;

    .user_card_bottom {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}
</style>