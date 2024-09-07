import request from "@/untils/request";

enum API {
//     删除配套信息
    DELETEATTRIBUTE_URL = '/admin/facility/deleteById?',
//     新增或修改配套信息
    UPDATEORADDFACILITY_URL = '/admin/facility/saveOrUpdate'
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