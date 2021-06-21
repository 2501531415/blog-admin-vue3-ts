import { defineStore } from "pinia";

interface appState{
    isCollapse:Boolean
}

export const appStore = defineStore({
    id:'app',
    state():appState{
        return {
            isCollapse:true
        }
    }
})

