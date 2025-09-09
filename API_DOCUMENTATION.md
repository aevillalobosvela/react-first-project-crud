# API Documentation

## Table of Contents
- [Authentication API](#authentication-api)
- [Task Management API](#task-management-api)
- [React Components API](#react-components-api)
- [Context API](#context-api)
- [Supabase Client](#supabase-client)

---

## Authentication API

### `supabase.auth.signInWithOtp(options)`
Sends a magic link to user's email for authentication.

**Parameters:**
- `options` (Object)
  - `email` (string): User's email address

**Returns:** Promise<{data, error}>

**Example:**
```javascript
const { data, error } = await supabase.auth.signInWithOtp({ email: "user@example.com" });
```

### `supabase.auth.getUser()`
Gets the current authenticated user.

**Returns:** Promise<{data: {user}, error}>

**Example:**
```javascript
const { data: { user }, error } = await supabase.auth.getUser();
```

### `supabase.auth.signOut()`
Signs out the current user.

**Returns:** Promise<{error}>

**Example:**
```javascript
await supabase.auth.signOut();
```

### `supabase.auth.onAuthStateChange(callback)`
Listens for authentication state changes.

**Parameters:**
- `callback` (Function): `(event, session) => void`

**Example:**
```javascript
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    // User is logged in
  } else {
    // User is logged out
  }
});
```

---

## Task Management API

### `supabase.from('tasks').insert(data)`
Creates a new task in the database.

**Parameters:**
- `data` (Object)
  - `name` (string): Task name
  - `userId` (string): User ID who owns the task

**Returns:** Promise<{data, error}>

**Example:**
```javascript
const result = await supabase.from('tasks').insert({
  name: "Complete project",
  userId: user.id
});
```

---

## React Components API

### TaskForm Component

**Import:**
```javascript
import TaskForm from '../components/TaskForm';
```

**Props:** None

**State:**
- `taskName` (string): Current task name input value

**Methods:**
- `handleSubmit(e)`: Handles form submission and creates new task

**Usage:**
```jsx
<TaskForm />
```

### Login Component

**Import:**
```javascript
import Login from '../pages/Login';
```

**Props:** None

**State:**
- `email` (string): Current email input value

**Methods:**
- `handleSubmit(e)`: Handles login form submission

**Usage:**
```jsx
<Login />
```

### Home Component

**Import:**
```javascript
import Home from '../pages/Home';
```

**Props:** None

**Dependencies:**
- Uses `useTasks()` hook from TaskContext
- Uses `useNavigate()` from react-router-dom

**Features:**
- Displays TaskForm component
- Provides logout functionality
- Redirects unauthenticated users to login

**Usage:**
```jsx
<Home />
```

### NotFound Component

**Import:**
```javascript
import NotFound from '../pages/NotFound';
```

**Props:** None

**Usage:**
```jsx
<NotFound />
```

---

## Context API

### TaskContext

**Import:**
```javascript
import { TaskContext, useTasks, TaskContextProvider } from '../context/TaskContext';
```

### `useTasks()` Hook

**Returns:** Context value or throws error if used outside provider

**Example:**
```javascript
const taskContext = useTasks();
```

**Error Handling:**
Throws error with message "este es un" if used outside TaskContextProvider.

### TaskContextProvider Component

**Props:**
- `children` (ReactNode): Child components

**Provides:**
- `name` (string): Currently provides "hello" as example value

**Usage:**
```jsx
<TaskContextProvider>
  <App />
</TaskContextProvider>
```

---

## Supabase Client

### Configuration

**Import:**
```javascript
import { supabase } from '../supabase/client';
```

**Environment Variables Required:**
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_KEY`: Your Supabase anon key

**Setup:**
```javascript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);
```

---

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  userId UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Error Handling

### Common Error Patterns

**Authentication Errors:**
```javascript
try {
  const { data, error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
} catch (error) {
  console.error("Error en login:", error.message);
}
```

**Database Errors:**
```javascript
try {
  const result = await supabase.from('tasks').insert(data);
  console.log('result:', result);
} catch (error) {
  console.log('error:', error);
}
```

---

## Usage Examples

### Complete Authentication Flow
```javascript
// 1. Send magic link
const { data, error } = await supabase.auth.signInWithOtp({ 
  email: "user@example.com" 
});

// 2. Check authentication state
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    navigate('/');
  } else {
    navigate('/login');
  }
});

// 3. Get current user
const { data: { user }, error } = await supabase.auth.getUser();

// 4. Sign out
await supabase.auth.signOut();
```

### Complete Task Creation Flow
```javascript
// 1. Get authenticated user
const { data: { user }, error: userError } = await supabase.auth.getUser();
if (userError) throw userError;

// 2. Create task
const result = await supabase.from('tasks').insert({
  name: "New Task",
  userId: user.id
});
```