<script setup lang="ts">
import BottomLogo from "@/components/BottomLogo/index.vue";

defineOptions({
  name: 'addOrUpdatePage'
})
import {ref} from 'vue'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

import type {UploadFile} from 'element-plus'
import router from "@/router";
// 取消按钮的回调
const cancel = () => {
  router.push({name: "Apart"})
}
// 测试
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const value = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
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
        <el-form>
          <el-form-item label="公寓名称" label-width="100" style="width: 40%" size="default">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="公寓介绍" label-width="100" style="width: 40%" size="small">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="所处区域" label-width="100">
            <el-select v-model="value" placeholder="请选择省份" style="width: 12%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-select v-model="value" placeholder="请选择城市" style="width: 12%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-select v-model="value" placeholder="请选择区域" style="width: 12%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100" style="width: 40%">
            <el-input placeholder="请输入详细地址查询"></el-input>
          </el-form-item>
          <el-form-item label="公寓前台电话" label-width="100" style="width: 40%">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否发布" label-width="100">
            <el-radio-group>
              <el-radio value="1" size="small">Option 1</el-radio>
              <el-radio value="2" size="small">Option 2</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公寓配套" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓配套">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓标签" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓标签">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公寓杂费" label-width="100" style="width: 40%">
            <el-select v-model="value" placeholder="请选择公寓杂费">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片" label-width="100">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <el-icon>
                <Plus/>
              </el-icon>

              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                  <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
                </div>
              </template>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image"/>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <!--底部-->
      <div class="addBottom">
        <el-button type="info" style="width: 120px" @click="cancel">取消</el-button>
        <el-button type="primary" style="width: 120px">新增</el-button>
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