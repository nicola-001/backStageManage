// 属性管理的接口类型定义
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}
export interface SaveOrUpdateAttrInter extends ResponseData{
    data:string
}