import { supabase } from "../supabase/client"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {

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
            <TaskList />
        </div>

    )
}
