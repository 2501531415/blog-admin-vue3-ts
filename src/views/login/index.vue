<template>
    <Suspense>
    <template #default>
        <loginForm/>
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
    import loginForm from './loginForm.vue'

</script>
