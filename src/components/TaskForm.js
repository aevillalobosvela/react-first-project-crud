import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return; // Evita enviar vacío
    createTask(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="text"
        name="taskName"
        className="form-control"
        placeholder="Escribe una nueva tarea..."
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <button type="submit" className="btn btn-success" disabled={adding}>
        {adding ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Agregando...
          </>
        ) : (
          "Agregar"
        )}
      </button>
    </form>
  );
}
