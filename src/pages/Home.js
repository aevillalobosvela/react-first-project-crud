import { supabase } from "../supabase/client"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
    const [showTaskDone, setShowTaskDone] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase.auth.getUser()) {
            navigate("/login")
        }
    }, [navigate])

    return (
        <div>
            Home
            <button onClick={() => supabase.auth.signOut()}>
                Logout
            </button>
            <TaskForm />
            <header>
                <span>
                    <p>Mostrar otras Tareas</p>
                    <button onClick={() => setShowTaskDone(!showTaskDone)}>Mostrar</button>
                </span>
            </header>

            <TaskList done={showTaskDone} />
        </div>

    )
}
