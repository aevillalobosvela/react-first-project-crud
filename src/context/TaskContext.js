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
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTasks = async (done = false) => {
        setLoading(true)
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const { error, data } = await supabase.from('tasks').select().eq('userId', user.id).eq("done", done);
        if (error) throw error;
        console.log(done)
        console.log(data)
        setTasks(data)
        setLoading(false)
    }

    const createTask = async (taskName) => {
        setAdding(true)
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            const { error, data } = await supabase.from('tasks').insert({
                name: taskName,
                userId: user.id
            }).select();
            if (error) throw error;
            console.log('result :', data);
            setTasks([...tasks, ...(data || [])])
        } catch (error) {
            console.log('error :', error);
        }
        setAdding(false)
    }

    const deleteTask = async (id) => {
        try {
            const { error, data } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
            console.log(data)
            setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
            console.log('error :', error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const { error, data } = await supabase.from('tasks').update(task).eq('id', id);
            if (error) throw error;
            console.log(data)
            setTasks(tasks.map(t => t.id === id ? { ...t, ...task } : t))
        } catch (error) {
            console.log('error :', error);
        }
    }

    return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask, updateTask }}>
        {children}
    </TaskContext.Provider>
}