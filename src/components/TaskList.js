import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskList({ done = false }) {
  const { tasks, getTasks, loading } = useTasks();

  useEffect(() => {
    getTasks(done);
  }, [done]);

  function renderTasks() {
    if (loading)
      return (
        <div className="text-center my-4">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando tareas...</p>
        </div>
      );

    if (tasks.length === 0)
      return (
        <div className="alert alert-warning text-center my-3">
          No hay tareas {done ? "completadas" : "pendientes"}.
        </div>
      );

    return (
      <div className="mt-3">
        <h4 className="mb-3 text-center">
          {done ? "✅ Tareas Completadas" : "🕒 Tareas Pendientes"}
        </h4>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>{renderTasks()}</div>;
}
