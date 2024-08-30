// 房间信息管理
import request from "@/untils/request";
import type {
    ATTRListDataInterface,
    PageItemsAllData,
    PayMentAllDataInterface, TermAllDataInterface
} from "@/api/apartment/roomManageMent/type";

enum API {
    // 根据条件分页查询房间列表
    ROOMPAGEITEM_URL = '/admin/room/pageItem',
    //根据id删除房间信息
    REMOVEROOMBYID_URL = '/admin/room/removeById?',
    //保存或更新房间信息
    SAVEORUPDATE_URL = '/admin/room/saveOrUpdate',
    //查询全部属性名称和属性值列表
    ATTRLIST_URL = '/admin/attr/list',
    //支付方式
    PAYMENT_URL = '/admin/payment/list',
    //查询全部租期列表
    TERMLIST_URL = '/admin/term/list',
}

// 根据条件分页查询房间信息列表
export const reqRoomPageItem = (queryForm: any) => request.get<any, PageItemsAllData>(API.ROOMPAGEITEM_URL, {params: queryForm})
//根据id删除房间信息
export const reqRemoveById = (id: number) => request.delete(API.REMOVEROOMBYID_URL + `id=${id}`)
//保存或更新房间信息
export const reqSaveOrUpdate = (data: any) => {
    // 判断是否有id   有id  更新
    if (data.id) {
        return request.post(API.SAVEORUPDATE_URL, data)
    } else {
        return request.post(API.SAVEORUPDATE_URL, data)
    }
}
//查询全部属性名称和属性值列表
export const reqAttrList = () => request.get<any, ATTRListDataInterface>(API.ATTRLIST_URL)
//支付方式
export const reqPayMent = () => request.get<any, PayMentAllDataInterface>(API.PAYMENT_URL)
//获取全部租期列表
export const reqTermList = () => request.get<any,TermAllDataInterface>(API.TERMLIST_URL)