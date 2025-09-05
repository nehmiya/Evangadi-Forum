import React, { useState } from 'react'
import { data, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosConfig";

function Login() {
  const navigate = useNavigate()

      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')

      
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axiosInstance.post("/users/login",{
                email: email,
                password: password,
              });

              alert("User registered successfully!!!")
              // navigate('/home')
              localStorage.setItem('token',data?.token)
              

        } catch (error) {
            alert(error?.response?.data.msg);
        }
    }

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>

        <div>
          <span>Email:-</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <span>Password:-</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login