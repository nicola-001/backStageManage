// 登录相关接口
import request from '@/untils/request'


enum API {
//     获取验证码
    GET_CODE_URL = '/admin/login/captcha',
//     登录
    LOGIN_URL = '/admin/login',
//     获取用户信息
    USERINFO_URL = '/admin/info',

}

//获得验证码的接口
export const reqGetCode = () => request.get(API.GET_CODE_URL)
//登录的接口
export const reqLogin = (data: any) => request.post(API.LOGIN_URL, data)
//获取用户信息的接口
export const reqUserInfo = () => request.get(API.USERINFO_URL)