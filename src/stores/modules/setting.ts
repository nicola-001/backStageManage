// 关于layout组件相关配置
import {defineStore} from 'pinia'

const useLayOutsettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//用于控制菜单是否折叠
            refresh: false//控制刷新效果
        }
    },
})
export default useLayOutsettingStore


/**
 * ()=>{
 *         const fold =ref(false);//用于控制菜单是否折叠
 *         const refresh=ref(false)//控制刷新效果
 *     return{
 *         fold,refresh
 *     }
 * }
 */