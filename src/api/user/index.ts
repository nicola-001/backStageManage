// 用户管理
import request from "@/untils/request";

enum API {
    // 分页查询用户信息
    USERPAGE_URL = '/admin/user/page?',
    //根据用户id更新账号状态
    UPDATEUSERID_URL = '/admin/user/updateStatusById?'
}

//分页查询用户信息
export const reqUserPage = (data: any) => request.get(API.USERPAGE_URL, {params: data})
//根据用户id更新账号状态
export const reqUpdateUser = (id: number, status: number) => request.post<any, any>(API.UPDATEUSERID_URL + `id=${id}&status=${status}`)