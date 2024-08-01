import {defineStore} from "pinia";
import defAva from '@/assets/images/profile.jpg'
// @ts-ignore
import {getToken,removeToken} from '@/untils/auth'
import {reqUserInfo} from "@/api/login";
import {types} from "sass";
import Error = types.Error;
import {constentRoute} from "@/router/routers";


const useUserStore = defineStore('user', {
    state: () => ({
        // 存储token信息
        token: getToken(),
        // 存储获取到的用户名字
        username: '',
        // 存储获取到的用户头像
        avatar: '',
        // 存储路由信息，便于生成菜单组建
        menuRoutes: constentRoute,
    }),
    actions: {
        //     获取用户信息
        async getUserInfo() {
            const result: any = await reqUserInfo()
            if (result.code == 200) {
                //存储用户名称
                this.username = result.data.name
                //存储用户头像
                this.avatar = (result.data.avatarUrl == '' || result.data.avatarUrl == null) ? defAva : result.data.avatarUrl
                // 作为promiss成功的回调的值返回
                return 'ok'
            } else {
                // 作为promiss失败的回调的值返回
                return Promise.reject(new Error(result.message))
            }
        },
       async userLogout(){
           //  清除token
           removeToken()
        }
    },
})
export default useUserStore;