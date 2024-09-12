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