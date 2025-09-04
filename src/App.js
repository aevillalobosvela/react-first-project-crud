import './App.css';
import { useEffect } from 'react';
import { Routes, Route , useNavigate} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/client'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session){
        console.log("sesion NO activa")
        navigate('/login')
      }else{
        console.log("sesion activa")
        navigate('/')
      }
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
