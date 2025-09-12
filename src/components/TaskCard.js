import React from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <div
      className={`card shadow-sm mb-2 ${
        task.done ? "border-success" : "border-secondary"
      }`}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="card-title mb-1">
            {task.name}
          </h6>
          <small
            className={`badge ${
              task.done ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {task.done ? "Completada" : "Pendiente"}
          </small>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
          >
            Eliminar
          </button>
          <button
            className={`btn btn-sm ${
              task.done ? "btn-outline-secondary" : "btn-outline-success"
            }`}
            onClick={handleDone}
          >
            {task.done ? "Marcar pendiente" : "Marcar completada"}
          </button>
        </div>
      </div>
    </div>
  );
}
