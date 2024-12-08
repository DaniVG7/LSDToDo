import { ref } from 'vue';
import toastService from '../main.js'; // Importa la instancia del servicio ToastService


const todos = ref([]);
const deleteModal = ref(false); // Agrega esta línea
const closeDeleteModal = () => {
  deleteModal.value = false;
};

//View Tasks
export const fetchTodos = async () => {
  try {
    const response = await fetch("https://node-todos.vercel.app/users/grupo3/todos");
    const data = await response.json();
    todos.value = data; // Asignar los datos a la propiedad reactiva
    console.log(data);
  } catch (error) {
      
  }
};

//Delete Task
const deleteTask = async (id) => {
  try {
    const response = await fetch(`https://node-todos.vercel.app/users/grupo3/todos/${id}`, {
      'method': 'DELETE',
    });

    if (response.ok) {
      todos.value = todos.value.filter(todo => todo.id !== id);
      toastService.add({ severity: 'success', summary: 'Task deleted', detail: 'Task was deleted successfully', life: 3000 }); // Utiliza toastService
    } else {
      console.error('Error al eliminar la tarea:', response.status);
      toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on deleting task', life: 3000 }); // Utiliza toastService
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on deleting task', life: 3000 }); // Utiliza toastService
  }

  closeDeleteModal();
};

//Add Task
const addTask = async (newTask) => {
  try {
    const response = await fetch('https://node-todos.vercel.app/users/grupo3/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (response.ok) {
      const data = await response.json();
      todos.value.push(data);
      toastService.add({ severity: 'success', summary: 'Success', detail: 'Task was added successfully', life: 3000 });
    } else {
      console.error('Error al agregar la tarea:', response.status);
      toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on adding task', life: 3000 });
    }
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
    toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on adding task', life: 3000 });
  }
};

// Edit task

const editTask = async (id, newTask) => {
  try {
    const response = await fetch(`https://node-todos.vercel.app/users/grupo3/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    if (response.ok) {
      const updatedTask = await response.json();
      return updatedTask;
    } else {
      console.error('Error al editar la tarea:', response.status);
    }
  } catch (error) {
    console.error('Error al editar la tarea:', error);
  }
};



export { todos, deleteTask, deleteModal, addTask, editTask }; // Exportamos la referencia a 'todos' para que sea accesible donde sea necesario



// import { ref } from 'vue';
// import toastService from '../main.js'; // Importa la instancia del servicio ToastService


// const todos = ref([]);
// const deleteModal = ref(false); // Agrega esta línea
// const closeDeleteModal = () => {
//   deleteModal.value = false;
// };

// //View Tasks
// export const fetchTodos = async () => {
//   try {
//     const response = await fetch("https://virtserver.swaggerhub.com/DVG9383_1/ToDosAPI/1.0.0/users/grupo3/todos");
//     const data = await response.json();
//     todos.value = data; // Asignar los datos a la propiedad reactiva
//     console.log(data);
//   } catch (error) {
      
//   }
// };

// //Delete Task
// const deleteTask = async (id) => {
//   try {
//     const response = await fetch(`https://virtserver.swaggerhub.com/DVG9383_1/ToDoAPI/1.0.0/grupo3/todos/${id}`, {
//       'method': 'DELETE',
//     });

//     if (response.ok) {
//       todos.value = todos.value.filter(todo => todo.id !== id);
//       toastService.add({ severity: 'success', summary: 'Task deleted', detail: 'Task was deleted successfully', life: 3000 }); // Utiliza toastService
//     } else {
//       console.error('Error al eliminar la tarea:', response.status);
//       toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on deleting task', life: 3000 }); // Utiliza toastService
//     }
//   } catch (error) {
//     console.error('Error al eliminar la tarea:', error);
//     toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on deleting task', life: 3000 }); // Utiliza toastService
//   }

//   closeDeleteModal();
// };

// //Add Task
// const addTask = async (newTask) => {
//   try {
//     const response = await fetch('https://virtserver.swaggerhub.com/DVG9383_1/ToDoAPI/1.0.0/grupo3/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newTask)
//     });

//     if (response.ok) {
//       const data = await response.json();
//       todos.value.push(data);
//       toastService.add({ severity: 'success', summary: 'Success', detail: 'Task was added successfully', life: 3000 });
//     } else {
//       console.error('Error al agregar la tarea:', response.status);
//       toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on adding task', life: 3000 });
//     }
//   } catch (error) {
//     console.error('Error al agregar la tarea:', error);
//     toastService.add({ severity: 'error', summary: 'Error', detail: 'Error on adding task', life: 3000 });
//   }
// };

// // Edit task

// const editTask = async (id, newTask) => {
//   try {
//     const response = await fetch(`https://virtserver.swaggerhub.com/DVG9383_1/ToDosAPI/1.0.0/users/grupo3/todos/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newTask)
//     });

//     console.log(response); // <-- Verifica la respuesta completa

//     if (response.ok) {
//       const updatedTask = await response.json();
//       console.log(updatedTask); // <-- Verifica los datos actualizados
//       return updatedTask;
//     } else {
//       console.error('Error al editar la tarea:', response.status);
//     }
//   } catch (error) {
//     console.error('Error al editar la tarea:', error);
//   }
// };



// export { todos, deleteTask, deleteModal, addTask, editTask }; // Exportamos la referencia a 'todos' para que sea accesible donde sea necesario
