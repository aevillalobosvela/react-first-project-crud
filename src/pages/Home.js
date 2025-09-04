import { supabase } from "../supabase/client"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
        </div>

    )
}
