import React,{useState , useContext} from "react";
import { Context } from "./context.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
export default function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context=useContext(Context);

    const fillEmail = (event) => {
        setEmail(event.target.value);
    };

    const fillPassword = (event) => {
        setPassword(event.target.value);
    };
    const fillName = (event) => {
        setName(event.target.value);
    };


    const signup =async()=>{
        
        let isemail = email.indexOf("@gmail.com");
        if(name.length<1){
            toast( "Please enter a valid string" ,{
                position:"bottom-right",
                style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                progressStyle:{background:"brown"},
            })

        }

        else if(isemail === -1 || email.length<14){
             toast( "Enter a valid email address" ,{
                    position:"bottom-right",
                    style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                    progressStyle:{background:"brown"},
                })

        }

        else if(password.length<6){
            toast( "Please enter a strong password having greater than 6 characters" ,{
                position:"bottom-right",
                style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"medium",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                progressStyle:{background:"brown"},
            })

        }
        else{
            let signBtn = document.getElementById("login");
            signBtn.innerHTML="signing in...";
            let sign = await context.signup(name,email,password,[]);
            if(sign === "signin successfull"){
                toast( "Sign up successfull" ,{
                    position:"bottom-right",
                    style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                    progressStyle:{background:"darkgreen"},
                })

                navigate("/");
            }else{
                toast( "A user already exists" ,{
                    position:"bottom-right",
                    style:{background:"rgb(91, 6, 119)",color:"white",fontSize:"large",fontWeight:"200",borderRadius:"0px",borderTopRightRadius:"15px",borderBottomLeftRadius:"15px"},
                    progressStyle:{background:"brown"},
                })
                signBtn.innerHTML="Sign up";
            }
        }
    }

    return (
        <>
            <div className="logContainer">
                        <input
                            type="text"
                            value={name}
                            onChange={fillName}
                            placeholder="Enter your Name"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={fillEmail}
                            placeholder="Enter your Email"
                        />
                
                        <input
                            value={password}
                            onChange={fillPassword}
                            placeholder="Enter your Password"
                        />
                    
                    <button className="logBtn" id="login" onClick={signup}>
                        Sign up
                    </button>
            </div>
            <Link to="/" className="home">Home</Link>
           </>
    );
}