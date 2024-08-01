// 公寓管理接口类型
// 接口返回的基本类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
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