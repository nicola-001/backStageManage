// 系统管理-用户管理相关接口
import request from "@/untils/request";

//枚举用户管理相关接口
enum API {
// 根据条件分页查询后台用户列表
    SYSTEMUSERPAGE_URL = '/admin/system/user/page?',
// 根据id修改后台用户状态
    UPDATESTATUS_URL = '/admin/system/user/updateStatusByUserId?',
//  判断用户名是否可用
    ISUSERNAMEAVAIABLE_URL = '/admin/system/user/isUserNameAvailable?',
//   保存或修改用户信息
    SAVEORUPDATE_URL = '/admin/system/user/saveOrUpdate',
//     删除用户信息
    DELETEUSER_URL = '/admin/system/user/deleteById?'
}

//根据条件分页查询后台用户列表
export const reqSystemUserPage = (current: number, size: number,name:string,phone:string) =>
    request.get<any, any>(API.SYSTEMUSERPAGE_URL + `current=${current}&size=${size}&name=${name}&phone=${phone}`)
// 根据id修改后台用户状态
export const reqUpdateStatus = (id: number, status: number) => request.post<any, any>(API.UPDATESTATUS_URL + `id=${id}&status=${status}`)
//判断用户名是否可用
export const reqIsUsernameAvailable = (username: string) => request.get<any, any>(API.ISUSERNAMEAVAIABLE_URL + `username=${username}`)
//保存或修改用户信息
export const reqSaveOrUpdate = (data: any) => request.post<any, any>(API.SAVEORUPDATE_URL, data)
//删除用户信息
export const reqDeleteUser = (id: number) => request.delete<any, any>(API.DELETEUSER_URL + `id=${id}`)