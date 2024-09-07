<script setup lang="ts">
import {Delete, Plus, Refresh, Setting} from '@element-plus/icons-vue'
import { onMounted, reactive, ref} from "vue";
import {reqAddOrUpdate, reqDeletePost, reqPostPage, reqPostStatus} from "@/api/system/post";
import PagiNation from "@/components/PagiNation/index.vue";
import BottomLogo from "@/components/BottomLogo/index.vue";
import TableManage from "@/components/tableManage/index.vue";
import Message from '@/untils/MessageBox'
// 定义组建名称
defineOptions({
  name: 'POST'
})
// 定义table数据
const tableData: any = reactive([
  {name: "岗位名称", display: true, order: false, prop: 'name'},
  {name: "岗位编码", display: true, order: false, prop: 'postCode'},
  {name: "岗位描述", display: true, order: false, prop: 'description'},
  {name: "状态", display: true, order: false, prop: 'status'},
])
// 获取当前第几页
const current = ref(1)
// 获取每页几条数据
const size = ref(10)
// 存储获取岗位信息的数据
let postData = ref([])
// 分页器的总条数
const total = ref<number>(0)
// 控制添加/修改按钮的显示与隐藏
const addOrUpdateShow = ref<boolean>(false)

// 收集新增用户信息
const addInfo = reactive({
  id: 0,//用于判断是新增用户还是添加用户
  postCode: '',//岗位编码
  name: '',//岗位名称
  description: '',//岗位描述
  status: 0,//岗位状态
})
// 获取表单实例对象
const ruleFormRef = ref()
// 获取列设置实例
const tableManage = ref()
// 获取岗位信息
const getPost = async () => {
  console.log('当前页', current.value, size.value, total.value)
  // 默认获取第一条数据
  const result: any = await reqPostPage(current.value, size.value)
  if (result.code == 200) {
    postData.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getPost()
})
// 添加岗位按钮
const addPost = async () => {
  // 打开弹出框
  addOrUpdateShow.value = true
  // 清空数据
  // addInfo.id = 0
  // Object.assign(addInfo, {
  //   postCode: '',//岗位编码
  //   name: '',//岗位名称
  //   description: '',//岗位描述
  //   status: 0,//岗位状态
  // })
  ruleFormRef.value.resetFields()
  // await nextTick(() => {
  //   ruleFormRef.value.resetFields()
  // })
}
// 编辑按钮的回调
const editPost = (row: any) => {
  // 打开弹出框
  addOrUpdateShow.value = true
  //合并参数
  Object.assign(addInfo, row)
}
// 修改岗位状态
const updatePostStatus = async (row: any) => {
  await reqPostStatus(row.id, row.status)
}
// 删除岗位
const deletePost = async (row: any) => {
  // 删除请求
  const result: any = await reqDeletePost(row.id)
  if (result.code == 200) {
    Message.messageInfo('success', '删除成功!')
  }
  //重新获取数据
  await getPost()
}
// 添加或修改确定按钮的回调
const confirm = async () => {
  // 表单验证
  await ruleFormRef.value.validate()
  // 发送请求
  const result: any = await reqAddOrUpdate(addInfo)
  if (result.code == 200) {
    //   重新获取数据
    await getPost()
    // 关闭弹出框
    addOrUpdateShow.value = false
    Message.messageInfo('success', addInfo.id ? '修改成功' : '添加成功')
  } else {
    Message.messageInfo('error',addInfo.id ? '修改失败' : '添加失败')
  }

}
// 岗位名称的回调
const validatePostRule = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入岗位名称'))
  } else {
    callback()
  }
}
// 岗位编码
const validatePostCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入岗位编码'))
  } else {
    callback()
  }
}
// 岗位描述
const validateDescription = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入岗位描述'))
  } else {
    callback()
  }
}
// 表单校验规则
const rules = reactive({
  name: [{validator: validatePostRule, trigger: 'blur', required: true}],
  postCode: [{validator: validatePostCode, trigger: 'blur', required: true}],
  description: [{validator: validateDescription, trigger: 'blur', required: true}],
})
// 刷新表格
const refresh = async () => {
  // 重新获取数据
  await getPost()
}
// 列设置
const columnSetting = () => tableManage.value.openTable()

</script>

<template>
  <!--基础结构-->
  <div class="post_container">
    <el-card>
      <div class="post_top">
        <div>
          <el-button type="primary" :icon="Plus" @click="addPost">添加</el-button>
        </div>
        <div>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新表格"
              placement="bottom"
          >
            <el-button circle :icon="Refresh" @click="refresh"></el-button>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="列设置"
              placement="bottom"
          >
            <el-button type="info" circle :icon="Setting" @click="columnSetting"></el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="post_bottom">
        <!-- 表格-->
        <el-table border :data="postData" style="margin: 20px 0;">
          <!--序号列-->
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <!--根据tableData动态生成列-->
          <template v-for="(item,index) in tableData" :key="index">
            <el-table-column :label="item.name" align="center"
                             :prop="item.prop" :sortable="item.order" v-if="item.display">
              <template #default="{row}">
                <el-switch @click="updatePostStatus(row)" v-if="item.prop=='status'" v-model="row.status"
                           :active-value="1" :inactive-value="0"/>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" align="center" width="270">
            <template #default="{row}">
              <el-button type="primary" size="small" :icon="Setting" @click="editPost(row)">编辑</el-button>
              <el-popconfirm :title="`你确定要删除${row.name}吗？`" width="200" @confirm="deletePost(row)">
                <template #reference>
                  <el-button type="danger" size="small" :icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template #empty>
            <div style="margin-top: 30px">
              <img src="/src/assets/images/notData.png" alt="notData"/>
              <span>暂无数据</span>
            </div>
          </template>
        </el-table>
        <!--分页器-->
        <PagiNation v-model:total="total" v-model:size="size" v-model:current="current"
                    @getTableData="getPost"></PagiNation>
      </div>
      <BottomLogo></BottomLogo>
    </el-card>
  </div>
  <!--添加/修改按钮-->
  <el-dialog v-model="addOrUpdateShow" :title="addInfo.id?'修改':'新增'" width="500">
    <el-divider style="margin-top: 3px"/>
    <el-form ref="ruleFormRef" :model="addInfo" :rules="rules" status-icon>
      <el-form-item label="岗位名称：" label-width="150" prop="name">
        <el-input placeholder="请填写岗位名称" v-model="addInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="岗位编码：" label-width="150" prop="postCode">
        <el-input placeholder="请填写岗位编码" v-model="addInfo.postCode"></el-input>
      </el-form-item>
      <el-form-item label="岗位描述：" label-width="150" prop="description">
        <el-input placeholder="请填写岗位描述" type="textarea" v-model="addInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="状态：" label-width="150" prop="status">
        <el-radio-group v-model="addInfo.status" class="ml-4">
          <el-radio :value="0" size="large">正常</el-radio>
          <el-radio :value="1" size="large">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addOrUpdateShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--列设置-->
  <table-manage ref="tableManage" :drawer-data="tableData"></table-manage>
</template>

<style scoped lang="scss">
.post_container {
  .post_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post_bottom {
    .post_table {
      margin: 15px 0;
    }
  }
}
</style>