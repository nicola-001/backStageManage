import request from "@/untils/request";
import type {FeeAddOrUpdateInter, FeeDeleteById, SaveOrUpdateAttrInter} from "@/api/apartment/attributeManageMent/type";

enum API {
//     删除配套信息
    DELETEATTRIBUTE_URL = '/admin/facility/deleteById?',
//     新增或修改配套信息
    UPDATEORADDFACILITY_URL = '/admin/facility/saveOrUpdate',
//    根据id删除标签信息
    DELEBTLABELBYID_URL = '/admin/label/deleteById?',
//    新增或修改标签信息
    SAVEORUPDATELABEL_URL = '/admin/label/saveOrUpdate',
//     新增或更新属性名称
    ATTRKEYSAVEORUPDATE_URL = '/admin/attr/key/saveOrUpdate',
//     根据id删除属性名称
    ATTRKEYDELETE_URL = '/admin/attr/key/deleteById?',
//     新增或更新属性值
    ATTRVALUESAVEORUPDATE_URL = '/admin/attr/value/saveOrUpdate',
//     根据id删除属性值
    ATTRVALUEDEKETEBYID_URL = '/admin/attr/value/deleteById?',
//     保存或更新杂费名称
    FEEKEYORUPDATE_URL = '/admin/fee/key/saveOrUpdate',
//     删除杂物名称
    FEEKEYDELETEBYID_URL = '/admin/fee/key/deleteById?',
//     保存或更新杂费值
    FEEATTRADDORUPDATE_URL = '/admin/fee/value/saveOrUpdate',
//     根据id删除杂费值
    FEEDELETE_URL = '/admin/fee/value/deleteById?'
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
        return request.post<any, any>(API.SAVEORUPDATELABEL_URL, data)
    } else {
        return request.post<any, any>(API.SAVEORUPDATELABEL_URL, data)
    }
}
//     新增或更新属性名称
export const reqAttrKeyAddOrUpdate = (data: any) => {
    if (data.id) {
        return request.post<any, SaveOrUpdateAttrInter>(API.ATTRKEYSAVEORUPDATE_URL, data)
    } else {
        return request.post<any, SaveOrUpdateAttrInter>(API.ATTRKEYSAVEORUPDATE_URL, data)
    }
}
//根据id删除属性名称
export const reqAttrDelete = (attrKeyId: number) => request.delete(API.ATTRKEYDELETE_URL + `attrKeyId=${attrKeyId}`)
//新增或更新属性值
export const reqAttrValueSaveOrUpdate = (data: any) => request.post(API.ATTRVALUESAVEORUPDATE_URL, data)
//根据id删除属性值
export const reqAttrDeleteValue = (id: number) => request.delete(API.ATTRVALUEDEKETEBYID_URL + `id=${id}`)
//保存或更新杂物名称
export const reqFeeAddOrUpdate = (data: any) => {
    if (data.id) {
        return request.post<any, FeeAddOrUpdateInter>(API.FEEKEYORUPDATE_URL, data)
    } else {
        return request.post<any, FeeAddOrUpdateInter>(API.FEEKEYORUPDATE_URL, data)
    }
}
//删除杂物名称
export const reqFeeKeyDelete = (feeKeyId: number) => request.delete(API.FEEKEYDELETEBYID_URL + `feeKeyId=${feeKeyId}`)
//保存或更新杂费值信息
export const reqAttrAddOrUpdate = (data: any) => request.post(API.FEEATTRADDORUPDATE_URL, data)
//根据id删除杂费值
export const reqFeeDelete = (id: number) => request.delete<any,FeeDeleteById>(API.FEEDELETE_URL + `id=${id}`)