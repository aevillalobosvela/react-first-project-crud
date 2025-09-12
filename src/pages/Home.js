import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Gestión de Tareas</h2>

      {/* Formulario para crear tareas */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Agregar nueva tarea</h5>
          <TaskForm />
        </div>
      </div>

      {/* Encabezado con botón para mostrar tareas */}
      <header className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">Mostrar otras tareas</p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setShowTaskDone(!showTaskDone)}
        >
          {showTaskDone ? "Ocultar" : "Mostrar"}
        </button>
      </header>

      {/* Lista de tareas */}
      <div className="card shadow-sm">
        <div className="card-body">
          <TaskList done={showTaskDone} />
        </div>
      </div>
    </div>
  );
}
