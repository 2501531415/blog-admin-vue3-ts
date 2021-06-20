<template>
    <div class="m-aside">
        <m-menu :menu="allowRoutes" :router="true"/>
    </div>
</template>

<script setup lang="ts">
    import {permissionStore} from '@/store/modules/permission'
    import MMenu from '@/components/element/menu/index.vue'

    const {allowRoutes}  = permissionStore()

    console.log(allowRoutes)
</script>