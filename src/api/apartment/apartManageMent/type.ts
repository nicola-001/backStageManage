// 公寓管理接口类型
// 接口返回的基本类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface queryForm {
    current: number;
    size: number;
}

//公寓管理返回data数据类型
export interface Records {
    id?: number;
    name: string;
    introduction: string;
    districtId: number;
    districtName: string;
    cityId: number;
    cityName: string;
    provinceId: number;
    provinceName: string;
    addressDetail: string;
    latitude: string;
    longitude: string;
    phone: string;
    isRelease: string;
    totalRoomCount: number;
    freeRoomCount: number;
}

[];

// 公寓管理返回的全部data数据类型
export interface Data {
    size: number,
    current: number,
    records: Records[],
    total: number,
    pages: number
}

//公寓管理查询列表query数据类型
export interface ApartmantQueryForm extends queryForm {
    provinceId?: string,
    cityId?: string,
    districtId?: string
}

// 公寓管理返回数据类型
export interface ApartmantAllData extends ResponseData {
    data: Data
}

//获取查询省份信息列表
export interface ProvinceData {
    id: number,
    name: string
}

export interface ProvinceAllData extends ResponseData {
    data: ProvinceData
}

export interface CityData {
    id: number,
    name: string,
    provinceId: number
}

export interface CityAllData extends ResponseData {
    data: CityData
}

export interface AreaData {
    id: number,
    name: string,
    cityId: number
}

export interface AreaAllData extends ResponseData {
    data: AreaData
}

//删除请求返回数据
export interface DeleteData {
    data: Object
}

export interface DeleteAllData extends ResponseData {
    data: DeleteAllData
}

// 根据类型查询配套信息列表返回的数据
export interface FacilityListData {
    id: number,
    type: string,
    name: string,
    icon: string

}

// 根据类型查询配套信息列表返回的全部数据
export interface FacilityListALLData extends ResponseData {
    data: FacilityListData[]
}

//根据类型查询标签列表返回的数据类型
export interface LabelListData {
    id: number,
    type: string,
    name: string
}

//根据类型查询标签列表返回的所有数据的接口类型
export interface LabelListAllData extends ResponseData {
    data: LabelListData
}

//查询全部杂费名称和杂费列表的数据
export interface FeeValueData {
    id: number;
    name: string;
    feeValueList: {
        id: number;
        name: string;
        unit: string;
        feeKeyId: number;
    }[];
}

// 树形结构
export interface TreeData {
    id?: number | string
    value?: number | string
    label: string
    parentId?: number | string
    children?: TreeData[]
}

//获取查询全部杂费名称和杂费列表的数据
export interface FeeValueListAllData extends ResponseData {
    data: FeeValueData[]
}

//图片泛型定义
export interface ImgList {
    name: string,
    url: string,
}

// 保存或更新公寓信息发送请求时的接口类型
export interface SaveOrUpdateData {
    id?: number | string,
    name: string | null,//公寓名称
    provinceId: number | null,//省份id
    cityId: number | null,//城市id
    districtId: number | null,//区域id
    introduction: string | null,//公寓介绍
    addressDetail: string | null,//详细地址
    phone: string | null,//公寓前台电话
    isRelease: number,//是否发布
    feeValueIds?: number[],//获取公寓杂费
    labelIds: null,//公寓标签
    facilityInfoIds: [],//公寓配套
    graphVoList: ImgList[],
}

// 保存或更新公寓信息接收数据时的接口类型
export interface SaveOrUpdateDataReaultData {
    id?: number;
    name?: string;
    introduction?: string;
    districtId?: number;
    districtName?: string;
    cityId?: number;
    cityName?: string;
    provinceId?: number;
    provinceName?: string;
    addressDetail?: string;
    latitude?: string;
    longitude?: string;
    phone?: string;
    isRelease?: string;
    facilityInfoIds?: Record<string, unknown>[];
    labelIds?: Record<string, unknown>[];
    feeValueIds?: Record<string, unknown>[];
    graphVoList?: {
        name?: string;
        url?: string;
    }[];
}

// 保存或更新公寓管理信息时的返回的全部数据
export interface SaveOrUpdateDataReaultAllData extends ResponseData {
    data: SaveOrUpdateDataReaultData
}

//详情地址建议列表的类型
export interface addressDetailList {
    id: [],
    name: string,
    district: string | null,
    adcode: string | null,
    location: [],
    address: string | null,
    typecode: string | null,
    city: []
}

export interface graphVoListData {
    name: string;
    url: string;
}

export interface labelInfoListData {
    id: number;
    type: string;
    name: string;
}

export interface facilityInfoListData {
    id: number;
    type: string;
    name: string;
    icon: string;
}

export interface feeValueVoListData {
    id: number;
    name: string;
    unit: string;
    feeKeyId: number;
    feeKeyName: string;
}

//根据id获取公寓信息列表
export interface GetDetailData {
    id: number;
    name: string;
    introduction: string;
    districtId: number;
    districtName: string;
    cityId: number;
    cityName: string;
    provinceId: number;
    provinceName: string;
    addressDetail: string;
    latitude: string;
    longitude: string;
    phone: string;
    isRelease: string;
    graphVoListData: graphVoListData[],
    labelInfoList: labelInfoListData[],
    facilityInfoList: facilityInfoListData[],
    feeValueVoList: feeValueVoListData[]
}
export interface GetDetailAllData extends ResponseData{
    data: GetDetailData;
}