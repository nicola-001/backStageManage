// 房间信息管理
import request from "@/untils/request";
import type {PageItemsAllData} from "@/api/apartment/roomManageMent/type";

enum API {
    // 根据条件分页查询房间列表
    ROOMPAGEITEM_URL = '/admin/room/pageItem'
}

export const reqRoomPageItem = (queryForm: any) => request.get<any, PageItemsAllData>(API.ROOMPAGEITEM_URL, {params: queryForm})