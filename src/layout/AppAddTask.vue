<script setup>
import { ref, defineEmits } from 'vue';
import { addTask } from '@/service/ToDosAPI';
import { useToast } from 'primevue/usetoast';


const emit = defineEmits(['closeSidebar']);
const toast = useToast(); // Inicializa useToast

const visible = ref(false);

const departments = [
  "Artist & bookings",
  "Gastronomy",
  "Legal security & control",
  "Marketing & sponsors",
  "Ticketing & pre-sale",
  "Stage & equipment",
  // "Production & logistics",
  // "Hospitality & VIP services",
  // "Transportation & parking",
  // "Merchandising",
  // "Medical services",
  // "Social Media & Digital Content",
];

const statuses = ['To Do', 'In Progress', 'Done'];


// const date = new Date().toLocaleString();
const date = new Date().toLocaleString('es-ES', { // Configuración para formato 24h
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Asegura formato 24h
});




const taskName = ref('');
const taskDescription = ref('');
const selectedDepartment = ref('');
const selectedStatus = ref('');

const handleSubmit = async () => {
  if (!taskName.value || !taskDescription.value || !selectedDepartment.value || !selectedStatus.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields', life: 3000 });
    return;
  }

  const newTask = {
    text: taskName.value,
    description: taskDescription.value,
    completed: false,
    author: 'grupo3',
    tags: {
      department: selectedDepartment.value,
      status: selectedStatus.value,
      date: date,
    }
  };

  await addTask(newTask);
  console.log(newTask);
  taskName.value = '';
  taskDescription.value = '';
  selectedDepartment.value = '';
  selectedStatus.value = '';
  date.value = '';
  emit('closeSidebar');
};
</script>

<template>
  <Sidebar v-model:visible="visible" position="right" class="layout-config-sidebar w-26rem">

    <div class="p-4 w">
      <h3 class="text-xxl font-semibold mb-4 text-inline">Add a new task...</h3>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="taskName">
          Task:
        </label>
        <input v-model="taskName" required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="taskName" type="text" placeholder="Task Name" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Description:
        </label>
        <textarea v-model="taskDescription" required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="department" type="text" placeholder="Task Description..."></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="department">
          Department:
        </label>
        <select v-model="selectedDepartment" required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="" disabled>Select department</option>
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
          Status:
        </label>
        <select v-model="selectedStatus" required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="" disabled>Select status</option>
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <input type="hidden" v-model="date" />
      </div>
      <div class="flex items-center justify-end">
        <button @click="handleSubmit"
          class="bg-green-400 cursor-pointer hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          <i class="pi pi-check text-xl"></i>
        </button>
      </div>
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped>
button {
  width: 100%;
}
</style>
