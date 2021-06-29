import {ElButton,ElIcon,ElContainer,ElAside,ElMain,ElHeader,ElFooter,ElMenu,ElMenuItem,ElSubmenu,ElTabs,ElTabPane,ElDropdown,ElDropdownItem,
ElDropdownMenu,ElForm,ElFormItem,ElInput,ElRow,ElCol,ElBreadcrumb,ElBreadcrumbItem,ElTable,ElTableColumn,ElTag,ElCard,ElPagination,ElDialog,ElSelect,ElOption} from 'element-plus'
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
    ElDropdownMenu,
    ElForm,
    ElFormItem,
    ElInput,
    ElRow,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElTag,
    ElCard,
    ElPagination,
    ElDialog,
    ElSelect,
    ElOption
]

export function setupElementUI(app:App){
    components.forEach(component=>{
        app.component(component.name,component)
    })
}