import { useState } from "react"
import { supabase } from '../supabase/client'

export default function Login() {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;

            console.log("Respuesta:", data);
            alert("Revisa tu correo para iniciar sesión");
        } catch (error) {
            console.error("Error en login:", error.message);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <button>send</button>
            </form>
        </div>
    )
}
