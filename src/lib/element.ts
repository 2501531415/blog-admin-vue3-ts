import {ElButton,ElIcon,ElContainer,ElAside,ElMain,ElHeader,ElFooter,ElMenu,ElMenuItem,ElSubmenu,ElTabs,ElTabPane,ElDropdown,ElDropdownItem,ElDropdownMenu} from 'element-plus'
import type {App} from 'vue'

const components = [
    ElButton,
    ElIcon,
    ElContainer,
    ElAside,
    ElMain,
    ElHeader,
    ElFooter,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElTabs,
    ElTabPane,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu
]

export function setupElementUI(app:App){
    components.forEach(component=>{
        app.component(component.name,component)
    })
}