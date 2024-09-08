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

export interface PageItemsAllData extends ResponseData {
    data: PageItemsData;
}

export interface attrValueList {
    id: number;
    name: string;
    attrKeyId: number
}

//获取全部属性值和属性列表的类型
export interface ATTRListInterface {
    id: number,
    name: string,
    attrValueList: attrValueList[]
}

export interface ATTRListDataInterface extends ResponseData {
    data: ATTRListInterface[];
}

//获取支付方式的接口类型
export interface PayMentInterface {
    id: number;
    name: string;
    payMonthCount: string,
    additionalInfo: string
}

export interface PayMentAllDataInterface extends ResponseData {
    data: PayMentInterface[]
}

//获取全部租期列表的接口类型
export interface TermInterface {
    id: number,
    monthCount: string,
    unit: string
}

export interface TermAllDataInterface extends ResponseData {
    data: TermInterface[];
}