// 接口返回的基本类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface ApartmentInfo {
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
}

//根据条件分页查询房间列表-records
export interface Records {
    id: number;
    roomNumber: string;
    rent: number;
    apartmentId: number;
    isRelease: string;
    leaseEndDate: Record<string, unknown>;
    isCheckIn: boolean;
    apartmentInfo: ApartmentInfo
}

//根据条件分页查询房间列表
export interface PageItemsData {
    size: number;
    current: number;
    records: Records[];
    total: number;
    pages: number;
}
export interface PageItemsAllData extends ResponseData{
    data: PageItemsData;
}