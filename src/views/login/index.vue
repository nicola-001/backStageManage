<script lang="ts">
export default {
  name: 'LOGIN'
}
</script>
<script setup lang="ts">
import {User, Lock} from '@element-plus/icons-vue'
import {reqGetCode, reqLogin} from "@/api/login";
import {onMounted, reactive, ref} from "vue";
import {ElNotification} from "element-plus";
import {getTime} from "@/untils/getTime";
// @ts-ignore
import {setToken, getToken} from '@/untils/auth'
import {useRouter} from "vue-router";
import useUserStore from "@/stores/modules/user";

const router = useRouter();

// 存数验证码
let codeUrl = ref('')
// 存储验证码的key
let captchaKey = ref('')
// 存数表单数据
const formData = reactive({
  username: 'user',
  password: '123456',
  captchaCode: '',
})

const userInfo = useUserStore();

// 存储token
const token = ref('')
// 判断是否已经登录
token.value = getToken()
// 合并参数
const loginParam = ref({})
//全部表单校验
const ruleFormRef = ref<any>()
// 记住密码
const isCkeckedPassword = ref<boolean>(false)
// 登录的加载效果
const loading = ref<boolean>(false)
// 用户名校验
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 3) {
    callback(new Error('用户名不能小于3位'))
  } else if (value.trim().length > 12) {
    callback(new Error('用户名不能大于12位'))
  } else {
    callback()
  }
}
// 密码校验
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

// 验证码校验
const validateCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}
// 表单验证规则
const rules = reactive({
  username: [
    {required: true, validator: validateUsername, trigger: 'blur'},
  ],
  password: [
    {required: true, validator: validatePassword, trigger: 'blur'},
  ],
  captchaCode: [
    {required: true, validator: validateCode, trigger: 'blur'},
  ],
})
// 获取验证码
const getCode = async () => {
  // 发送请求获取验证码
  const result = await reqGetCode()
  // 存入验证码
  codeUrl.value = result.data.image
  // 存入验证码的key
  captchaKey.value = result.data.key
}
// 登录按钮
const login = () => {
  // 合并参数
  loginParam.value = {
    username: formData.username,
    password: formData.password,
    captchaCode: formData.captchaCode,
    captchaKey: captchaKey.value
  }
  // 校验表单
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      // 设置加载效果
      loading.value = true
      // 发送请求
      const result: any = await reqLogin(loginParam.value)
      if (result.code === 200) {
        userInfo.token = result.data
        //存储token
        token.value = result.data
        setToken(token.value)
        // 关闭加载效果
        loading.value = false
        // 跳转页面
        router.push('/').then(() => {
          ElNotification({
            title: `HI,${getTime()}！`,
            message: '登录成功！',
            type: 'success',
          })
        })
      } else {
        // 关闭加载效果
        loading.value = false
        ElNotification({
          title: 'error',
          message: '登录失败！',
          type: 'error',
        })
        // 重新获取验证码
        await getCode()

      }
    }
  })
}
onMounted(() => {
//   获取验证码
  getCode()
})
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">
        <div class="grid-content ep-bg-purple"/>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="grid-content ep-bg-purple"/>
        <el-form status-icon ref="ruleFormRef" class="el-from" :model="formData" :rules="rules">
          <h1>Hello!</h1>
          <h2>欢迎来到后台管理</h2>
          <el-form-item prop="username">
            <el-input v-model="formData.username" :prefix-icon="User" placeholder="用户名" class="el-input"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formData.password" :prefix-icon="Lock" placeholder="密码"
                      class="el-input" show-password/>
          </el-form-item>
          <el-form-item prop="captchaCode">
            <el-input v-model="formData.captchaCode" placeholder="验证码" class="el-qrcode"></el-input>
            <div class="login-code">
              <img @click="getCode()"
                   :src="codeUrl"
                   class="login-code-img"/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isCkeckedPassword" label="记住密码" size="large" style="color: white"/>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" @click="login" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.login_container {
  height: 100vh;
  width: 100vw;
  background: url("@/assets/images/background.jpg");
  background-size: cover;

  .el-from {
    position: relative;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    border-radius: 5%;
    width: 60%;
    top: 5vh;
    left: 30%;
    height: 90vh;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 25px;
      margin: 20px 0;
    }

    .el-input {
      height: 50px;
    }

    .el-qrcode {
      height: 50px;
      width: 50%;
    }

    .login-code {
      margin-left: 20px;
      height: 50px;
      width: 30%;

      .login-code-img {
        height: 100%;
        width: 100%;
      }
    }

    .button {
      width: 100%;
      height: 50px;
    }
  }
}
</style>