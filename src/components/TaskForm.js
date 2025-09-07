import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase/client';

export default function TaskForm() {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const result = await supabase.from('tasks').insert({
        name: taskName,
        userId: user.id
      });
      console.log('result :', result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="taskName" placeholder='Tarea'
          onChange={e => setTaskName(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  )
}
