import React, { useState ,useContext } from "react";
import { Context } from "./context.js";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function Login() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context=useContext(Context);
    const [emailAlert,setEmailAlert]= useState("");
    const [passwordAlert,setPasswordAlert]= useState("");

    const fillEmail = (event) => {
        setEmail(event.target.value);
    };

    const fillPassword = (event) => {
        setPassword(event.target.value);
    };

    const login=async()=>{
        let isemail = email.indexOf("@gmail.com");
        if(isemail===-1){
            setEmailAlert("Enter a valid email address");
        }
        else if(password.length<6){
            setPasswordAlert("Enter a valid password");
        }
        else{
            let logBtn = document.querySelector("#login");
            logBtn.innerHTML="logging in...";
            let log=await context.login(email,password);
            if(log==="login successfull"){
                navigate("/");
            }
            else{
                logBtn.innerHTML="Login";
            }
        }
    
    }
    return (
        <>
            <div className="container">
                <div className="incontainer">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={fillEmail}
                        />
                         <div className="form-text" style={{color:"red",fontSize:"large"}}>
                           {emailAlert}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={fillPassword}
                        />
                         <div className="form-text" style={{color:"red",fontSize:"large"}}>
                           {passwordAlert}
                        </div>
                    </div>

                    <button className="btn btn-primary" id="login" onClick={login}>
                        Login
                    </button>
                </div>
            </div>
            <Link to="/" className="home">Home</Link>
        </>
    );
}
