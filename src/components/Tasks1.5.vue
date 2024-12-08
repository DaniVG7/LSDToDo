<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { fetchTodos, todos, deleteTask, editTask, deleteModal } from "../service/ToDosAPI.js";
import AddTask from "../components/AddTask.vue";
import { useDraggable } from "./useDraggable.js";

// Utiliza la funcionalidad de arrastrar y soltar
const { draggedTask, onDragStart, onDragOver, onDrop } = useDraggable(editTask);

// Función para manejar la actualización de tareas
const handleTaskUpdated = (onDraggedTask) => {
  const index = todos.value.findIndex(task => task.id === onDraggedTask.id);
  if (index !== -1) {
    todos.value[index] = onDraggedTask;
  }
};

// Inicializa el toast
const toast = useToast();
const editModal = ref(false);
const editedTask = ref(null);
const selectedTask = ref(null);

// Lista de departamentos
const departments = [
  "Artist & bookings",
  "Gastronomy",
  "Legal security & control",
  "Marketing & sponsors",
  "Ticketing & pre-sale",
  "Stage & equipment",
];

// Funciones para abrir y cerrar modales
const openEditModal = (task) => {
  editModal.value = true;
  editedTask.value = { ...task };
};

const closeEditModal = () => {
  editModal.value = false;
};

const openDeleteModal = (task) => {
  console.log(task.value);
  if (task) {
    deleteModal.value = true;
    selectedTask.value = task;
  }
};

const closeDeleteModal = () => {
  deleteModal.value = false;
};

// Cargar las tareas al montar el componente
onMounted(() => {
  fetchTodos();
});

// Filtrar tareas por estado
const TasksToDo = computed(() =>
  todos.value.filter((todo) => todo.tags.status.toLowerCase() === "to do")
);
const TasksInProgress = computed(() =>
  todos.value.filter((todo) => todo.tags.status.toLowerCase() === "in progress")
);
const TasksDone = computed(() =>
  todos.value.filter((todo) => todo.tags.status.toLowerCase() === "done")
);

// Función para actualizar la tarea
const updateTask = () => {
  editTask(editedTask.value.id, editedTask.value)
    .then((updatedTask) => {
      handleTaskUpdated(updatedTask);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Task was updated successfully",
        life: 3000,
      });
      closeEditModal();
    })
    .catch((error) => {
      console.error("Error al editar la tarea:", error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error on updating task",
        life: 3000,
      });
    });
};
</script>

<template>
  <div class="grid">
    <!-- TO DO Section -->
    <div class="col-12 lg:col-6 xl:col-4 p-3">
      <div class="card mb-0 bg-red-200">
        <div class="flex justify-content-between mb-3">
          <span class="block text-500 font-medium mb-3">TO DO</span>
          <div class="flex align-items-center justify-content-center bg-red-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-exclamation-triangle text-red-500 text-xl"></i>
          </div>
        </div>
        <div class="mb-5" v-if="TasksToDo.length === 0">
          <span><b>Waiting Tasks to do... </b></span>
          <i class="pi pi-spin pi-spinner"></i>
        </div>
        <div class="mb-3">
          <span class="text-red-700 font-medium">{{ TasksToDo.length }}</span>
          <span class="text-500 font-medium"> Tasks waiting to be started</span>
        </div>
        <div v-for="task in TasksToDo" :key="task.id" class="bg-red-100 p-2 rounded mb-4" draggable="true"
          @dragstart="onDragStart(task, $event)" @dragover.prevent="onDragOver" @drop.prevent="onDrop($event, 'to do')"
          @touchstart="onTouchStart(task, $event)" @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd($event, 'to do')">
          <div class="text-900 font-medium text-xl">{{ task.text }}</div>
          <div class="text-500">
            <b><u>Description</u>:</b> {{ task.description }}
          </div>
          <div class="text-500">
            <b><u>Department</u>:</b> {{ task.tags.department.toUpperCase() }}
          </div>
          <div class="text-500">
            <b><u>Status</u>:</b> {{ task.tags.status.toUpperCase() }}
          </div>
          <div class="text-right mt-2">
            <button class="p-button p-button-danger p-button-rounded mr-2" @click="openDeleteModal(task)">
              <i class="pi pi-trash"></i>
            </button>
            <button @click="openEditModal(task)" class="p-button p-button-success p-button-rounded">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- IN PROGRESS Section -->
    <div class="col-12 lg:col-6 xl:col-4 p-3">
      <div class="card mb-0 bg-yellow-300">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">IN PROGRESS [...]</span>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>

        <div v-if="TasksInProgress.length === 0" class="mb-5">
          <b>No tasks In Progress yet</b>
        </div>
        <div class="mb-3">
          <span class="text-yellow-700 font-medium">{{
            TasksInProgress.length
          }}</span>
          <span class="text-500 font-medium"> Tasks in progress...</span>
        </div>
        <div v-for="task in TasksInProgress" :key="task.id" class="bg-yellow-100 p-2 rounded mb-4" draggable="true"
          @dragstart="onDragStart(task, $event)" @dragover.prevent="onDragOver"
          @drop.prevent="onDrop($event, 'in progress')" @touchstart="onTouchStart(task, $event)"
          @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event, 'in progress')">
          <div class="text-900 font-medium text-xl">{{ task.text }}</div>
          <div class="text-500">
            <b><u>Description</u>:</b> {{ task.description }}
          </div>
          <div class="text-500">
            <b><u>Department</u>:</b> {{ task.tags.department.toUpperCase() }}
          </div>
          <div class="text-500">
            <b><u>Status</u>:</b> {{ task.tags.status.toUpperCase() }}
          </div>
          <div class="text-right mt-2">
            <button class="p-button p-button-danger p-button-rounded mr-2" @click="openDeleteModal(task)">
              <i class="pi pi-trash"></i>
            </button>
            <button @click="openEditModal(task)" class="p-button p-button-success p-button-rounded">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DONE Section -->
    <div class="col-12 lg:col-6 xl:col-4 p-3">
      <div class="card mb-0 bg-green-300">
        <div class="flex justify-content-between mb-3">
          <span class="block text-500 font-medium mb-3">DONE</span>
          <div class="flex align-items-center justify-content-center bg-green-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-check-circle text-green-500 text-xl"></i>
          </div>
        </div>
        <div v-if="TasksDone.length === 0" class="mb-5">
          <b>Tasks completed</b>
        </div>
        <div class="mb-3">
          <span class="text-green-700 font-medium">{{ TasksDone.length }}</span>
          <span class="text-500 font-medium"> Tasks completed successfully</span>
        </div>
        <div v-for="task in TasksDone" :key="task.id" class="bg-green-100 p-2 rounded mb-4" draggable="true"
          @dragstart="onDragStart(task, $event)" @dragover.prevent="onDragOver" @drop.prevent="onDrop($event, 'done')"
          @touchstart="onTouchStart(task, $event)" @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd($event, 'done')">
          <div class="text-900 font-medium text-xl">{{ task.text }}</div>
          <div class="text-500">
            <b><u>Description</u>:</b> {{ task.description }}
          </div>
          <div class="text-500">
            <b><u>Department</u>:</b> {{ task.tags.department.toUpperCase() }}
          </div>
          <div class="text-500">
            <b><u>Status</u>:</b> {{ task.tags.status.toUpperCase() }}
          </div>
          <div class="text-right mt-2">
            <button class="p-button p-button-danger p-button-rounded mr-2" @click="openDeleteModal(task)">
              <i class="pi pi-trash"></i>
            </button>
            <button @click="openEditModal(task)" class="p-button p-button-success p-button-rounded">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo para editar tarea -->
    <!-- Diálogo para editar tarea -->
    <Dialog v-model:visible="editModal" modal>
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
            <option v-for="department in departments" :value="department">
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
        <div class="flex items-center justify-end">
          <button
            class="bg-blue-400 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="updateTask">
            <i class="pi pi-save text-xl"></i> Save
          </button>
          <button @click="closeEditModal"
            class="bg-red-400 text-white ml-5 hover:bg-red-700 cursor-pointer font-bold py-2 px-3 rounded">
            Cancel
          </button>
        </div>
      </div>
    </Dialog>

    <!-- Diálogo para eliminar tarea -->
    <Dialog v-model:visible="deleteModal" modal>
      <div class="p-4 w">
        <h3 class="text-lg font-semibold mb-4 text-inline">
          Are you sure to delete the next task "{{ selectedTask.text }}" ?
        </h3>
        <div class="text-center">
          <button @click="deleteTask(selectedTask.id)"
            class="bg-red-400 text-white hover:bg-red-700 cursor-pointer font-bold px-3 py-2 rounded m-5">
            Delete
          </button>
          <button @click="closeDeleteModal"
            class="bg-blue-400 cursor-pointer hover:bg-blue-700 text-white font-bold px-3 py-2 rounded focus:outline-none focus:shadow-outline m-5">
            Back
          </button>
        </div>
      </div>
    </Dialog>
  </div>

  <!-- Agregar Tarea Button -->
  <AddTask />
</template>

<style>
#task {
  border-radius: 10px;
}
</style>
