<script setup>
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import { ref } from "vue";

// Definir los valores reactivos
const value = ref([]);
const disabledDates = ref([]); // Inicializar si es necesario
const disabledDays = ref([]);  // Inicializar si es necesario
// Función para manejar la selección de fecha en el calendario
// const mensaje = ref('');
// function handleSelect(event) {
//     const mensajeInput = event.target.value;  // Crear variable nueva para el valor del input de texto
//     mensaje = mensajeInput;  // añadir el valor el input a una variable global
//     //console.log('Input task:', event);
// }

// Función para formatear el mes y año
function formatMonthYear(monthYear) {
    const monthYearRegex = /([a-zA-Z]+)(\d{4})/;
    const match = monthYear.match(monthYearRegex);  //match coge el evento (monthYear) y hace la funcion match creando un array
    return `${match[1]} ${match[2]}`; // devolvemos el elemento 1 (el mes) y el 2(el año) por separado
}

// Agregar listener de click al calendario cuando se muestra    
function handleCalendarShow() {
    const calendario = document.querySelector('.p-datepicker');
        calendario.addEventListener('click', (event) => {
            const day = event.target.innerText;
            const monthYearClicked = calendario.querySelector('.p-datepicker-title').innerText;
            const monthYear = formatMonthYear(monthYearClicked);
            // console.log('Clicked on calendar:', day, monthYear);
            const task = document.querySelector('.task');
            task.classList.remove('hidden');
            // console.log(mensaje);
            task.innerHTML = `<b> Selected day: ${day} ${monthYear}</b>`;
        });
}

</script>

<template>
    <Calendar style="width: 100vw !important;" placeholder="Add a task" 
        :minDate="new Date()" :disabledDays="disabledDays" inline :value="value" @click="handleCalendarShow" @change="handleSelect()" />
    <section>
        <Card class="task hidden mt-5 p-5"></Card>
    </section>
</template>

<style scoped>
.p-datepicker {
    width: 100vw !important;
}

.task {
    width: max-content;
    height: 120px;
}
</style>
