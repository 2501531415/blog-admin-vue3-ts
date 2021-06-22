import { defineStore } from "pinia";

interface settingState{
    isCollapse:Boolean
}

export const settingStore = defineStore({
    id:'app',
    state():settingState{
        return {
            isCollapse:true
        }
    }
})

