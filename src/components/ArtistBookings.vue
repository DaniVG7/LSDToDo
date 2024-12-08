<script setup>
import { ref, computed, onMounted } from "vue";

import { useToast } from 'primevue/usetoast';
import { fetchTodos, todos, deleteTask, editTask, deleteModal } from "../service/ToDosAPI.js";
import AddTask from "../components/AddTask.vue";

const toast = useToast();
const editModal = ref(false);
const editedTask = ref(null);
const originalTask = ref(null);
const selectedTask = ref(null);

const departments = [
    "Artist & bookings",
    "Gastronomy",
    "Legal security & control",
    "Marketing & sponsors",
    "Ticketing & pre-sale",
    "Stage & equipment",
];

const openEditModal = (task) => {
    editModal.value = true;
    originalTask.value = JSON.parse(JSON.stringify(task));
    editedTask.value = JSON.parse(JSON.stringify(task));
};

const closeEditModal = () => {
    editedTask.value = JSON.parse(JSON.stringify(originalTask.value));
    editModal.value = false;
};

const openDeleteModal = (task) => {
    if (task) {
        deleteModal.value = true;
        selectedTask.value = task;
    }
};

const closeDeleteModal = () => {
    deleteModal.value = false;
};

onMounted(() => {
    fetchTodos();
});

const TasksToDo = computed(() =>
    todos.value.filter((todo) => todo.tags.status === "To Do" && todo.tags.department === "Artist & bookings")
);

const TasksInProgress = computed(() =>
    todos.value.filter((todo) => todo.tags.status === "In Progress" && todo.tags.department === "Artist & bookings")
);

const TasksDone = computed(() =>
    todos.value.filter((todo) => todo.tags.status === "Done" && todo.tags.department === "Artist & bookings")
);
const filteredDepartments = computed(() => {
    return departments.filter(department => department !== editedTask.value.tags.department);
});

const updateTask = () => {
    editTask(editedTask.value.id, editedTask.value)
        .then(() => {
            fetchTodos();
            toast.add({ severity: 'success', summary: 'Success', detail: 'Task was updated successfully', life: 3000 });
            closeEditModal();
        })
        .catch((error) => {
            console.error('Error al editar la tarea:', error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error on updating task', life: 3000 });
        });
}
</script>

<template>
    <div class="grid">
        <!-- TO DO Section -->
        <div class="col-12 lg:col-6 xl:col-4 p-3">
            <div>
                <div class="card flex justify-content-between block bg-red-100 px-3 py-2 mb-4">
                    <span class="flex align-items-center text-red-700 font-medium">To Do</span>
                    <div class="flex align-items-center justify-content-center border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-exclamation-triangle text-red-300 text-xl"></i>
                    </div>
                </div>
                <hr>
                <div class="mb-5 ml-3" v-if="TasksToDo.length === 0"> <span><b>Waiting Tasks to do... </b></span> <i
                        class="pi pi-spin pi-spinner"></i>
                </div>
                <div class="mb-3 ml-3">
                    <span class="text-700 font-medium"><b>{{ TasksToDo.length }}</b></span>
                    <span class="text-500 font-medium"> Tasks waiting to be started</span>
                </div>
                <section v-for="task in TasksToDo" :key="task.id" class="card cardToDo p-2 rounded mb-4 p-3">
                    <div>
                        <div class="text-400 text-xs py-2">
                            {{ task.tags.department }}
                        </div>
                        <div class="text-900 font-medium text-xl">{{ task.text }}</div>
                        <div class="text-500 py-2">
                            {{ task.description }}
                        </div>
                        <div class="text-500">
                            <i style="font-size: 10px">Created on: {{ task.tags.date }}</i>
                        </div>
                        <div class="text-right mt-2">
                            <button class="btnDelete mr-2" @click="openDeleteModal(task)">
                                <i class="pi pi-trash"></i>
                            </button>
                            <button @click="openEditModal(task)" class="btnEdit">
                                <i class="pi pi-pencil"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- IN PROGRESS Section -->
        <div class="col-12 lg:col-6 xl:col-4 p-3">
            <div>
                <div class="card flex justify-content-between block bg-yellow-100 px-3 py-2 mb-4">
                    <span class="flex align-items-center text-yellow-500 font-medium">In Progress...</span>
                    <div class="flex align-items-center justify-content-center border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-spin pi-spinner text-yellow-500"></i>
                    </div>
                </div>
                <hr>
                <div class="mb-5 ml-3" v-if="TasksInProgress.length === 0">
                    <b>No tasks In Progress yet</b>
                </div>
                <div class="mb-3 ml-3">
                    <span class="text-700 font-medium">{{ TasksInProgress.length }}</span>
                    <span class="text-500 font-medium"> Tasks in progress...</span>
                </div>
                <div v-for="task in TasksInProgress" :key="task.id" class="card cardInProgress p-2 rounded mb-4 p-3">
                    <div class="text-400 text-xs py-2">
                        {{ task.tags.department }}
                    </div>
                    <div class="text-900 font-medium text-xl">{{ task.text }}</div>
                    <div class="text-500 py-2">
                        {{ task.description }}
                    </div>
                    <div class="text-500">
                        <i style="font-size: 10px">Created on: {{ task.tags.date }}</i>
                    </div>
                    <div class="text-right mt-2">
                        <button class="btnDelete mr-2" @click="openDeleteModal(task)">
                            <i class="pi pi-trash"></i>
                        </button>
                        <button @click="openEditModal(task)" class="btnEdit">
                            <i class="pi pi-pencil"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- DONE Section -->
        <div class="col-12 lg:col-6 xl:col-4 p-3">
            <div>
                <div class="card flex justify-content-between block bg-green-100 px-3 py-2 mb-4">
                    <span class="flex align-items-center text-green-600 font-medium">Done</span>
                    <div class="flex align-items-center justify-content-center border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check-circle text-green-600"></i>
                    </div>
                </div>
                <hr>
                <div class="mb-5 ml-3" v-if="TasksDone.length === 0">
                    <b>No tasks In Progress yet</b>
                </div>
                <div class="mb-3 ml-3">
                    <span class="text-700 font-medium">{{ TasksDone.length }}</span>
                    <span class="text-500 font-medium"> Tasks Completed.</span>
                </div>
                <div v-for="task in TasksDone" :key="task.id" class="card cardDone p-2 rounded mb-4 p-3">
                    <div class="text-400 text-xs py-2">
                        {{ task.tags.department }}
                    </div>
                    <div class="text-900 font-medium text-xl">{{ task.text }}</div>
                    <div class="text-500 py-2">
                        {{ task.description }}
                    </div>
                    <div class="text-500">
                        <i style="font-size: 10px">Created on: {{ task.tags.date }}</i>
                    </div>
                    <div class="text-right mt-2">
                        <button class="btnDelete mr-2" @click="openDeleteModal(task)">
                            <i class="pi pi-trash"></i>
                        </button>
                        <button @click="openEditModal(task)" class="btnEdit">
                            <i class="pi pi-pencil"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Diálogo para editar tarea -->
        <Dialog v-model:visible="editModal" modal :style="{ width: '400px' }">
            <div class="p-4 w">
                <h3 class="text-xxl font-semibold mb-5 text-inline">Editing task...</h3>
                <div class="mb-4">
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Task Name" v-model="editedTask.text" />
                </div>
                <div class="mb-4">
                    <textarea v-model="editedTask.description"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Task Description..." rows="5"></textarea>
                </div>
                <div class="mb-4">
                    <select v-model="editedTask.tags.department"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option :value="editedTask.tags.department" selected>
                            {{ editedTask.tags.department }}
                        </option>
                        <option v-for="department in filteredDepartments" :value="department">
                            {{ department }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <select v-model="editedTask.tags.status"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option :value="editedTask.tags.status" selected>
                            {{ editedTask.tags.status }}
                        </option>
                        <option value="To Do" v-if="editedTask.tags.status !== 'To Do'">To Do</option>
                        <option value="In Progress" v-if="editedTask.tags.status !== 'In Progress'">In Progress</option>
                        <option value="Done" v-if="editedTask.tags.status !== 'Done'">Done</option>
                    </select>
                </div>
                <div class="flex items-center justify-center editsButtons">
                    <Button label="Save" severity="success" raised @click="updateTask" class="mr-5">
                    </Button>
                    <Button @click="closeEditModal" label="Cancel" severity="danger" plain text raised>
                    </Button>
                </div>
            </div>
        </Dialog>
        <Dialog v-model:visible="deleteModal" modal>
            <div class="p-4 w">
                <h3 class="text-lg font-semibold mb-5 text-inline">Are you sure to delete the next task "{{
                    selectedTask.text
                    }}" ?</h3>
                <div class="text-center">
                    <Button @click="deleteTask(selectedTask.id)" label="Delete" severity="danger" raised>
                    </Button>
                    <Button @click="closeDeleteModal" label="Back" plain text raised class="ml-5">
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>

    <!-- Agregar Tarea Button -->
    <AddTask />
</template>

<style scoped>
#task {
    border-radius: 10px;
}

.btnEdit {
    background-color: #e5e5e5;
    cursor: pointer;
    border: none;
    border-radius: 25%;
    padding: 8px 12px;
    transition: 0.2s;
}

.btnEdit:hover {
    background-color: rgb(185, 183, 183);
    color: white;
}

.btnDelete {
    background-color: #e5e5e5;
    border: none;
    cursor: pointer;
    border-radius: 25%;
    padding: 8px 12px;
    color: red;
    transition: 0.2s;
}

.btnDelete:hover {
    background-color: rgba(236, 77, 77, 0.8);
    color: #e5e5e5;
}

.cardToDo {
    transition: 0.3s;
}

.cardToDo:hover {
    box-shadow: 0px 2px 10px 0 rgba(245, 17, 1, 0.5) !important;
}

.cardInProgress {
    transition: 0.3s;
}

.cardInProgress:hover {
    box-shadow: 0px 2px 10px 0 rgba(246, 222, 50, 0.9) !important;
}

.cardDone {
    transition: 0.3s;
}

.cardDone:hover {
    box-shadow: 0px 2px 10px 0 rgba(50, 183, 130, 0.9) !important;
}

.editsButtons {
    width: max-content;
    margin: auto;
}
</style>
