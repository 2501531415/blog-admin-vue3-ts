import {ElButton,ElIcon} from 'element-plus'
import type {App} from 'vue'

const components = [
    ElButton,
    ElIcon
]

export function setupElementUI(app:App){
    components.forEach(component=>{
        app.component(component.name,component)
    })
}