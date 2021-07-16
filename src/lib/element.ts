import {ElButton,ElIcon,ElContainer,ElAside,ElMain,ElHeader,ElFooter,ElMenu,ElMenuItem,ElSubmenu,ElTabs,ElTabPane,ElDropdown,ElDropdownItem,
ElDropdownMenu,ElForm,ElFormItem,ElInput,ElRow,ElCol,ElBreadcrumb,ElBreadcrumbItem,ElTable,ElTableColumn,ElTag,ElCard,ElPagination,ElDialog,ElSelect,ElOption,
ElUpload,ElAlert,ElDrawer,ElDatePicker,ElDescriptions,ElDescriptionsItem,ElLoading,locale,} from 'element-plus'
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
    ElAlert,
    ElDrawer,
    ElDatePicker,
    ElDescriptions,
    ElDescriptionsItem
]

const plugins = [ElLoading]

export function setupElementUI(app:App){
    locale(zh_CN)
    components.forEach(component=>{
        app.component(component.name,component)
    })
    plugins.forEach(plugin=>{
        app.use(plugin)
    })
}