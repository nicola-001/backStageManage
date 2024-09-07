// 接口返回的基本类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface apartmentInfoData {
    id: number,
    name: string,
    introduction: string,
    districtId: number,
    districtName: string,
    cityId: number,
    cityName: string,
    provinceId: number,
    provinceName: string,
    addressDetail: string,
    latitude: string,
    longitude: string,
    phone: string,
    isRelease: boolean,

}

export interface recordsData {
    id: number,
    userId: number,
    name: string,
    phone: string,
    apartmentId: number,
    appointmentTime: string,
    additionalInfo: string,
    appointmentStatus: string,
    apartmentInfo: apartmentInfoData
}

//  分页查询预约信息
export interface AppointMentData {
    size: number,
    current: number,
    total: number,
    pages: number
    records: recordsData[]
}

export interface AppointMentInterface extends ResponseData {
    data: AppointMentData;
}

//根据id修改状态id
export interface UpdateViewStatusInterface extends ResponseData {
    data: {}
}