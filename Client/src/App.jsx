import { Route,Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import './App.css'
import { createContext, useEffect, useState } from 'react'
import axiosInstance from './Utils/axiosConfig'


  export const AppState = createContext();

function App() {
  const [user,setUser] = useState({})
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const checkUser = async()=>{
    try {
      const {data} = await axiosInstance.get("/users/check",{
        headers: {
          Authorization: "Bearer " + token 
        }
      });

      setUser(data)
    } catch (error) {;
      alert(error?.response?.data.msg)
      navigate('/login')
    }
  }

  useEffect(()=>{
    checkUser()
  },[])


  return (
    <>
      <AppState.Provider value={{user,setUser}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      </AppState.Provider>
    </>
  );
}

export default App
