import React from 'react'
import { useEffect } from 'react';
import { useTasks } from "../context/TaskContext";

export default function TaskList() {
    const { tasks, getTasks } = useTasks();
    
    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div>
            <h1>TaskList</h1>
           
            {tasks.map(task => (
                <div key={task.id}>
                    <h1>{task.id} - {task.name} - {JSON.stringify(task.done)} </h1>
                </div>
            ))}
        </div>
    )

}
