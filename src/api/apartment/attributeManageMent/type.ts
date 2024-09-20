// 属性管理的接口类型定义
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface SaveOrUpdateAttrInter extends ResponseData {
    data: string
}

//保存或更新杂物名称
export interface FeeAddOrUpdateInter extends ResponseData {
    data: string
}

//根据id删除杂费值
export interface FeeDeleteById extends ResponseData {
    data: string
}

//保存或更新租期信息
export interface SaveOrUpdateTerm extends ResponseData {
    data: string
}

//删除租期信息
export interface DeleteTerm extends ResponseData {
    data: string
}

// 查询全部支付方式列表的数据
export interface PaymentData {
    id: number;
    name: string;
    payMonthCount: string;
    additionalInfo: string;
}

// 查询全部支付方式列表的接口
export interface PaymentInter extends ResponseData {
    data: PaymentData[]
}

//保存或更新支付方式接口类型
export interface SaveOrUpdatePayment extends ResponseData {
    data: string
}

//删除支付方式接口类型
export interface DeletePayment extends ResponseData {
    data: string
}
