import {FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

interface LoginProps {
  onCompletion: () => void
}

function Login({ onCompletion }:LoginProps){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handlesubmit= async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const loggedInResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({username, password}),
            }
          );

          const loggedIn = await loggedInResponse.json();

          if (loggedInResponse.status !== 201) {
            alert(loggedIn.message)
      
            return;
          }
      
          if (loggedIn) {
            // navigate("/home");

            console.log(loggedIn);
            
          } else {
            alert("Invalid username / password");
          }
    };
    return(
        <div className="login-container">
            <form onSubmit={handlesubmit} className="login-form">
                <input type="text" placeholder="Username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                className="login-input" />
                <input type="password" placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="login-input" />
                <button type="submit" className="login-button">Enter Sherlocked :) </button>
            </form>
        </div>
    );
}
export default Login;