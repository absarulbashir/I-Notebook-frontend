import React, { useState ,useContext } from "react";
import { Context } from "./context.js";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

export default function Login() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context=useContext(Context);

    const fillEmail = (event) => {
        setEmail(event.target.value);
    };

    const fillPassword = (event) => {
        setPassword(event.target.value);
    };

    const login=async()=>{
        let isemail = email.indexOf("@gmail.com");
        if(isemail===-1 || email.length<=10){
            toast( "Enter a valid Email Address" ,{
                position:"bottom-right",
                style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                progressStyle:{background:"brown"},
               })
        }
        else if(password.length<6){
            toast( "Enter a valid Password" ,{
                position:"bottom-right",
                style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                progressStyle:{background:" rgb(135, 2, 2)"},
               })
        }
        else{
            let logBtn = document.querySelector("#login");
            logBtn.innerHTML="logging in...";
            let log=await context.login(email,password);
            if(log==="login successfull"){
                toast( "Login Successfull" ,{
                    position:"bottom-right",
                    style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                    progressStyle:{background:"darkgreen"},
                   })
                navigate("/");
            }
            else{
                toast( "No User Found" ,{
                    position:"bottom-right",
                    style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                    progressStyle:{background:"brown"},
                })

                logBtn.innerHTML="Login";
            }
        }
    
    }
    return (
        <>
            <div className="logContainer">
                        <input
                            type="email"
                            value={email}
                            onChange={fillEmail}
                            placeholder="Enter your Email"
                        />
                
                        <input
                            type="password"
                            value={password}
                            onChange={fillPassword}
                            placeholder="Enter your Password"
                        />
                    
                    <button  className="logBtn" id="login" onClick={login}>
                        Login
                    </button>
            </div>
            <Link  to="/" className="home" >Home</Link>
        </>
    );
}
