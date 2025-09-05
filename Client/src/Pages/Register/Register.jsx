import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosConfig";

function Register() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [firstName , setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await axiosInstance.post("/users/register",{
                username: username,
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
              });

              alert("User registered successfully!!!")
              navigate('/login')
              

        } catch (error) {
            alert("Something went wrong, Please try again later!")
            console.log("Err:",error)
        }
    }

    return (
      <section>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <span>Username :-</span>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <span>First name:-</span>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <span>Last name:-</span>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
      </section>
    );
}

export default Register;
