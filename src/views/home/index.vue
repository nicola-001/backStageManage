<script lang="ts">
export default {
  name: 'HOME'
}
</script>
<script setup lang="ts">
//获取仓库中的用户信息
import useUserStore from "@/stores/modules/user";
import {getTime} from "../../untils/getTime";

const userStore = useUserStore()
</script>

<template>
 <div class="home_box">
  <el-card>
    <div class="home_container">
      <div class="home_img">
        <img :src="userStore.avatar" alt="头像">
      </div>
      <div class="home_tittle">
        <h1>{{getTime()}}！</h1>
        <span>后台管理系统</span>
      </div>
    </div>
  </el-card>
   <div class="bottom">
     <svg-icon name="welcome"  height="260px" width="500px"></svg-icon>
   </div>
 </div>
</template>

<style scoped lang="scss">
.home_box{
  display: flex;
  flex-direction: column;
  .home_container {
    height: 100px;
    display: flex;
    align-items: center;
    .home_img {
      height: 60px;
      width: 60px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .home_tittle{
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      h1{
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 20px;
      }
      span{
        font-weight: 500;
        font-size: 12px;
        color: #605c5c;
      }
    }
  }
  .bottom{
    margin: 15px auto;
  }
}
</style>