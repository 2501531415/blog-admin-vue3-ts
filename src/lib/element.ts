import {ElButton,ElIcon,ElContainer,ElAside,ElMain,ElHeader,ElFooter,ElMenu,ElMenuItem,ElSubmenu,ElTabs,ElTabPane,ElDropdown,ElDropdownItem,
ElDropdownMenu,ElForm,ElFormItem,ElInput,ElRow,ElCol,ElBreadcrumb,ElBreadcrumbItem,ElTable,ElTableColumn,ElTag,ElCard,ElPagination,ElDialog,ElSelect,ElOption,
ElUpload,ElAlert,locale} from 'element-plus'
import type {App} from 'vue'
import zh_CN from 'element-plus/lib/locale/lang/zh-cn'

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
    ElOption,
    ElUpload,
    ElAlert
]

export function setupElementUI(app:App){
    locale(zh_CN)
    components.forEach(component=>{
        app.component(component.name,component)
    })
}