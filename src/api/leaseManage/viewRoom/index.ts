import request from "@/untils/request";
import type {AppointMentInterface, UpdateViewStatusInterface} from "@/api/leaseManage/viewRoom/type";

enum API {
//     分页查询预约信息
    APPOINTMENT_URL = '/admin/appointment/page',
//     根据id更新预约状态
    UPDATEVIEWSTATUS_URL = '/admin/appointment/updateStatusById?'
}

//分页查询预约信息
export const reqAppointMent = (data: any) => request.get<any, AppointMentInterface>(API.APPOINTMENT_URL, {params: data})
//根据id更新预约状态
export const reqUpdateViewStatus = (id: number, status: number|string) => request.post<any,UpdateViewStatusInterface>(API.UPDATEVIEWSTATUS_URL + `id=${id}&status=${status}`)