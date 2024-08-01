// 封装ElMessage
import {ElMessage} from 'element-plus'

export default {
    messageInfo(type: string, value: string) {
        ElMessage({
            message: value,
            type: type as 'success' | 'warning' | 'info' | 'error',
        })
    }
}
