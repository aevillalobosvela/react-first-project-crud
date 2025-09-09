import { createContext, useContext } from "react";

export const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) throw new Error('este es un')

    return context
}

export const TaskContextProvider = ({ children }) => {
    return <TaskContext.Provider value={{ name: "hello" }}>
        {children}
    </TaskContext.Provider>
}