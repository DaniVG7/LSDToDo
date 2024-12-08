<template>
    <button class="layout-config-button p-link" type="button" @click="addTaskButtonClick()" title="Add New Task">
        <i class="pi pi-plus"></i>
    </button>
    <AppAddTask v-model:visible="visible" @closeSidebar="visible = false" />
    <!-- @closeSidebar="visible = false" -->
</template>

<script>
import AppAddTask from '@/layout/AppAddTask.vue';

export default {
    data() {
        return {
            visible: false
        };
    },
    methods: {
        addTaskButtonClick() {
            this.visible = !this.visible;
        }
    },
    components: {
        AppAddTask
    },
}
</script>

<style scoped>
@media (max-width: 767px) {
    .layout-config-button {
        top: auto;
        bottom: 20px;
        width: 5rem;
        height: 5rem;
        font-size: xx-large
    }
}
</style>