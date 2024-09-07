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

export interface RoomInfo {
    id: number;
    roomNumber: string;
    rent: number;
    apartmentId: number;
    isRelease: string;
}

export interface PaymentType {
    id: number;
    name: string;
    payMonthCount: string;
    additionalInfo: string;
}

export interface LeaseTerm {
    id: number;
    monthCount: number;
    unit: string;
}

// 分页查询租约列表数据
export interface RecordsData {
    id: number;
    phone: string;
    name: string;
    identificationNumber: string;
    apartmentId: number;
    roomId: number;
    leaseStartDate: Record<string, unknown>;
    leaseEndDate: Record<string, unknown>;
    leaseTermId: number;
    rent: number;
    deposit: number;
    paymentTypeId: number;
    status: string;
    sourceType: string;
    additionalInfo: string;
    apartmentInfo: ApartmentInfo,
    roomInfo: RoomInfo,
    paymentType: PaymentType,
    leaseTerm: LeaseTerm[]
}

//根据条件分页查询租约列表
export interface ArrageMentData {
    size: number;
    current: number;
    total: number;
    pages: number;
    records: RecordsData
}

export interface ArrageMentInterface extends ResponseData {
    data: ArrageMentData;
}

//保存或修改租约信息
export interface SaveOrUpdateData {
    id?: number;
    phone?: string;
    name?: string;
    identificationNumber?: string;
    apartmentId?: number;
    roomId?: number;
    leaseStartDate?: Record<string, unknown>;
    leaseEndDate?: Record<string, unknown>;
    leaseTermId?: number;
    rent?: number;
    deposit?: number;
    paymentTypeId?: number;
    status?: string;
    sourceType?: string;
    additionalInfo?: string;
}

export interface SaveOrUpdateInterface extends ResponseData {
    data: SaveOrUpdateData;
}