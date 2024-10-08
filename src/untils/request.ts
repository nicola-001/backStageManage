import axios from "axios";
import {ElMessage} from "element-plus";
import useUserStore from "@/stores/modules/user";

// 请求头默认的编码格式UTF-8
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

//创建axios实例
const request = axios.create({
    // 请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    // 获取user仓库中的数据
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
        config.headers["access-token"] = token
    }
    return config;
});
//响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        //处理网络错误
        let msg = '';
        const status = error.response.status;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";

        }
        ElMessage({
            type: 'error',
            message: msg
        })
        return Promise.reject(error);
    });
export default request;
