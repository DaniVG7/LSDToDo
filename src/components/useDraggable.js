import { ref } from "vue";

export function useDraggable(editTask) {
  const draggedTask = ref(null);

  const onDragStart = (task, event) => {
    draggedTask.value = task;
    // Agregar manejo de eventos táctiles
    if (event.type === "touchstart") {
      event.target.style.opacity = 0.5;
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, status) => {
    event.preventDefault();
    if (draggedTask.value) {
      draggedTask.value.tags.status = status;
      editTask(draggedTask.value.id, draggedTask.value);
      draggedTask.value = null;
    }
    // Restablecer opacidad
    if (event.type === "touchend") {
      event.target.style.opacity = 1;
    }
  };

  // Agregar manejo de eventos táctiles
  const onTouchStart = (task, event) => {
    onDragStart(task, event);
  };

  const onTouchMove = (event) => {
    event.preventDefault();
  };

  const onTouchEnd = (event, status) => {
    onDrop(event, status);
  };

  return {
    draggedTask,
    onDragStart,
    onDragOver,
    onDrop,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
