// 公寓管理接口
import request from "@/untils/request";
import type {
    ApartmantAllData, ApartmantQueryForm,
    AreaAllData,
    CityAllData,
    DeleteAllData, FacilityListALLData,
    FeeValueListAllData, GetDetailAllData, LabelListAllData,
    ProvinceAllData, SaveOrUpdateDataReaultAllData
} from "@/api/apartment/apartManageMent/type";
import type {LocationQueryValue} from "vue-router";

//枚举公寓管理的所有接口s
enum API {
//     根据条件分页查询公寓列表
    APARTMENT_URL = '/admin/apartment/pageItem',
    //获取查询省份信息列表
    PROVINCELIST_URL = '/admin/region/province/list?',
//     根据省份id获取城市信息列表
    CITYLIST_URL = '/admin/region/city/listByProvinceId?',
//     根据城市id获取区域信息列表
    AREALIST_URL = '/admin/region/district/listByCityId?',
//     根据区域信息列表获取公寓信息列表
    APARTMENTList_URL = '/admin/apartment/listInfoByDistrictId?',
//    根据id删除公寓信息
    REMOVEBYID_URL = '/admin/apartment/removeById?',
//     新增或更新用户信息
    SAVEOORUPDATE_YRL = '/admin/apartment/saveOrUpdate',
//     根据类型查询配套信息列表
    FACILITYLIST_URL = '/admin/facility/list',
//     根据类型查询列表标签
    LABEL_LIST_URL = '/admin/label/list?',
//     获取公寓杂费
    FEELIST_URL = '/admin/fee/list',
//     上传图片
    FILEUPLOAD_URL = '/admin/file/upload',
//     根据id获取公寓详情信息
    GETDETAILBYID = '/admin/apartment/getDetailById?',
//     根据id获取房间信息
    GETROOMBYID_URL = '/admin/room/getDetailById?'

}

//根据条件分页查询公寓列表
export const reqApartment = (queryForm: ApartmantQueryForm) => request.get<any, ApartmantAllData>(API.APARTMENT_URL, {params: queryForm})
//获取查询省份信息列表
export const reqListByProvince = () => request.get<any, ProvinceAllData>(API.PROVINCELIST_URL)
// 根据省份id获取城市列表
export const reqListCity = (id: number | undefined) => request.get<any, CityAllData>(API.CITYLIST_URL + `id=${id}`)
// 根据城市id获取区域列表
export const reqAreaList = (id: number | undefined) => request.get<any, AreaAllData>(API.AREALIST_URL + `id=${id}`)
// 根据区域id获取公寓列表
export const reqApartmentList = (id: number | undefined) => request.get<any, any>(API.APARTMENTList_URL + `id=${id}`)
// 根据id删除公寓信息
export const reqRemoveById = (id: number) => request.delete<any, DeleteAllData>(API.REMOVEBYID_URL + `id=${id}`)
// 新增或更改用户信息
export const reqSaveOrUpdate = (data: any) => {
//     判断是否有id  有id则为修改
    if (data.id) {
        return request.post<any, SaveOrUpdateDataReaultAllData>(API.SAVEOORUPDATE_YRL, data)
    } else {
        // 没有id则为新增
        return request.post<any, SaveOrUpdateDataReaultAllData>(API.SAVEOORUPDATE_YRL, data)
    }
}
//     根据类型查询配套信息列表
export const reqFacilityList = (type: string) => request.get<any, FacilityListALLData>(API.FACILITYLIST_URL, {params: {type}})
// 根据类型获取查询列表标签   request.get的第二个参数是config对象 包含params属性
export const reqLabelList = (type: string) => request.get<any, LabelListAllData>(API.LABEL_LIST_URL, {params: {type}});
// 获取公寓杂费
export const reqFeeList = () => request.get<any, FeeValueListAllData>(API.FEELIST_URL)
//上传图片按钮的回调
export const reqFileUload = (file: any) => request.post<any, any>(API.FILEUPLOAD_URL, file, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
// 根据id获取公寓详情信息
export const reqDetailById = (id: string | LocationQueryValue[] | null) => request.get<any, GetDetailAllData>(API.GETDETAILBYID + `id=${id}`)
//根据id获取房间信息
export const reqRoomDetailById = (id:any) => request.get(API.GETROOMBYID_URL + `id=${id}`)