const express = require('express');
const app = express();
app.use(express.json()); // Middleware para manejar JSON en las solicitudes

let tasks = []; // Aquí se almacenarán las tareas en memoria

// Endpoint para crear una nueva tarea (POST /users/:username/todos)
app.post('/users/:username/todos', (req, res) => {
  const { username } = req.params;
  const newTask = { id: Date.now().toString(), ...req.body, author: username };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Endpoint para actualizar una tarea (PATCH /users/:username/todos/:id)
app.patch('/users/:username/todos/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Endpoint para obtener todas las tareas de un usuario (GET /users/:username/todos)
app.get('/users/:username/todos', (req, res) => {
  const { username } = req.params;
  const userTasks = tasks.filter(task => task.author === username);
  res.json(userTasks);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

