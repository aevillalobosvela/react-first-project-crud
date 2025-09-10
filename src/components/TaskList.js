import React from 'react'
import { useEffect } from 'react';
import { useTasks } from "../context/TaskContext";
import TaskCard from './TaskCard';

export default function TaskList() {
    const { tasks, getTasks, loading } = useTasks();

    useEffect(() => {
        getTasks();
    }, [])

    function renderTasks() {
        if (loading) return (<h1>Loading...</h1>)
        else if (tasks.length === 0) return (<h1>No tasks</h1>)
        else {
            return (
                <div>
                    <h1>TaskList</h1>
                    {tasks.map(task => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                </div>
            )
        }
    }
    return (
        <div>
            {renderTasks()}
        </div>
    )
}
