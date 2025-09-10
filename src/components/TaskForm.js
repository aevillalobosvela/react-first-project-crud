import React from 'react'
import { useState } from 'react'
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="taskName" placeholder='Tarea'
          onChange={e => setTaskName(e.target.value)}
          value={taskName}
        />
        <button disabled={adding}>
          {adding ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  )
}
