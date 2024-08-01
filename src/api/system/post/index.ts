// 系统管理-岗位管理相关接口
import request from "@/untils/request";

//枚举岗位相关接口
enum API {
    //获取岗位相关接口
    ALL_POST_URL = '/admin/system/post/list',
    // 分页获取岗位信息
    POSTPAGE_URL = '/admin/system/post/page?',
//    新增或修改更为信息
    ADDORUPDATE_URL = '/admin/system/post/saveOrUpdate',
//     根据岗位信息修改状态
    UPDATESTATUS_URL = '/admin/system/post/updateStatusByPostId?',
//     根据id删除岗位
    DELETEPOST_URL='/admin/system/post/deleteById?'
}

//获取岗位相关接口
export const reqAllPost = () => request.get<any, any>(API.ALL_POST_URL)
export const reqPostPage = (current: number, size: number) => request.get<any, any>(API.POSTPAGE_URL + `current=${current}&size=${size}`)
//新增或修改岗位信息
export const reqAddOrUpdate = (data: any) => {
//     判断是否有id
    if (data.id) {
        //     修改
        return request.post(API.ADDORUPDATE_URL, data)
    } else {
        //     添加
        return request.post(API.ADDORUPDATE_URL, data)
    }
}
//根据岗位id修改状态
export const reqPostStatus = (id: number, status: number) => request.post(API.UPDATESTATUS_URL + `id=${id}&status=${status}`)
//根据id删除岗位
export const reqDeletePost=(id:number)=>request.delete(API.DELETEPOST_URL+`id=${id}`)