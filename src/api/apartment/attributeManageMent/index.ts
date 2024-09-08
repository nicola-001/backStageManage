import request from "@/untils/request";

enum API {
//     删除配套信息
    DELETEATTRIBUTE_URL = '/admin/facility/deleteById?',
//     新增或修改配套信息
    UPDATEORADDFACILITY_URL = '/admin/facility/saveOrUpdate',
//    根据id删除标签信息
    DELEBTLABELBYID_URL = '/admin/label/deleteById?',
//    新增或修改标签信息
    SAVEORUPDATELABEL_URL = '/admin/label/saveOrUpdate'
}

//删除配套信息
export const reqDeleteAttribute = (id: number) => request.delete(API.DELETEATTRIBUTE_URL + `id=${id}`)
//新增或修改配套信息
export const reqUpdateOrAddFacility = (data: any) => {
    if (data.id) {
        return request.post(API.UPDATEORADDFACILITY_URL, data)
    } else {
        return request.post(API.UPDATEORADDFACILITY_URL, data)
    }
}
//根据id删除标签信息
export const reqDeleteLabel = (id: number) => request.delete<any, any>(API.DELEBTLABELBYID_URL + `id=${id}`)
//新增或修改标签信息
export const reqLabelList = (data: any) => {
    if (data.id) {
        return request.post<any,any>(API.SAVEORUPDATELABEL_URL, data)
    } else {
        return request.post<any,any>(API.SAVEORUPDATELABEL_URL, data)
    }
}