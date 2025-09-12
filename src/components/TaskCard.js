import React from 'react'
import { useTasks } from '../context/TaskContext';

export default function TaskCard({ task }) {

    const { deleteTask ,updateTask} = useTasks()

    const handleDelete = () => {
        deleteTask(task.id);
    }
    const handleDone = () => {
        updateTask(task.id, { done: !task.done })
    }

    return (
        <div>
            <h5>{task.id} - {task.name} - {JSON.stringify(task.done)} </h5>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => handleDone()}>Done</button>
        </div>
    )
}
