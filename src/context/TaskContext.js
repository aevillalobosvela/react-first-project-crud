import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) throw new Error('useTasks must be used within a TaskContextProvider')

    return context
}

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async (done = false) => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        console.log(user)
        const { error, data } = await supabase.from('tasks').select().eq('userId', user.id).eq("done", done);
        if (error) throw error;
        setTasks(data)
    }
    return <TaskContext.Provider value={{ tasks, getTasks }}>
        {children}
    </TaskContext.Provider>
}