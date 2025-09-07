import { supabase } from "../supabase/client"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";

export default function Home() {

    const navigate = useNavigate();
    const obj = useTasks();
    console.log('obj :', obj);
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
        </div>

    )
}
