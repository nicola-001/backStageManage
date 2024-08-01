// 路由鉴权
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken, removeToken} from '@/untils/auth'
import router from "@/router/index";
import useUserStore from "@/stores/modules/user";
import setting from "@/setting/setting";

// 取消导航条的转动
NProgress.configure({showSpinner: false})
// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
// 获取仓库中的信息
    const userStore = useUserStore()
//     开启进度条
    NProgress.start()
//     判断是否有token信息
    if (getToken()) {
        //     有token
        if (to.path == '/login') {
            next({path: '/'})
        } else {
            //     判断是否有用户信息-有用户信息
            if (userStore.username) {
                //     有用户信息
                // 放行
                next()
            } else {
                try {
                    // console.log('没有用户信息，重新获取用户信息')
                    // 没有用户信息-重新获取用户信息
                    await userStore.getUserInfo()
                    // 放行
                    next()
                } catch (e) {
                    console.log("catch了")
                    //     退出登录
                    removeToken()
                    //     跳转到登录页
                    next({path: '/login'})
                }
            }
        }

    }
    else {
        // 没有token情况-如果去登录页放行，否则打到登录页
        if (to.path == '/login') {
            console.log('没有token，去登录页')
            next()
        } else {
            console.log('没有token,去其他页')
            next({path: '/login'})
        }
    }
})
//全局后置路由守卫
router.afterEach((to) => {
    // 设置标题
    document.title = `${setting.PROJECT_NAME}-${to.meta.title}`
    // 进度条结束
    NProgress.done()
})