import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login({ onCompletion }){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        if(username==='admin' && password==='password'){
            onCompletion();
            navigate('/level0');
        }
        else{
            alert("Hatt tmkc");
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