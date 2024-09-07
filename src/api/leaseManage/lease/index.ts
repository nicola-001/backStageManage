import request from "@/untils/request";
import type {ArrageMentInterface, SaveOrUpdateInterface} from "@/api/leaseManage/lease/type";

enum API {
//     根据条件分页查询租期列表
    ARRAGEMENT_URL = '/admin/agreement/page?',
//     保存或修改租约信息
    SAVEORPDATEAGREEMENT_URL = '/admin/agreement/saveOrUpdate',
//     根据公寓id查询房间列表
    LISEBASICBYAPARTMENT_URL = '/admin/room/listBasicByApartmentId?'
}

//根据条件分页查询租期列表
export const reqArrageMent = (data: any) => request.get<any, ArrageMentInterface>(API.ARRAGEMENT_URL, {params: data})
//保存或修改租约信息
export const reqSaveOrUpdateAgreement = (data: any) => {
    // 判断是否有id
    if (data.id) {//修改
        return request.post<any, SaveOrUpdateInterface>(API.SAVEORPDATEAGREEMENT_URL, data)
    } else {//新增
        return request.post<any, SaveOrUpdateInterface>(API.SAVEORPDATEAGREEMENT_URL, data)
    }
}
//根据公寓id查询房间信息列表
export const reqBasicApartment = (id: number | undefined) => request.get(API.LISEBASICBYAPARTMENT_URL + `id=${id}`)