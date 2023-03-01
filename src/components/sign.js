import React,{useState , useContext} from "react";
import { Context } from "./context.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context=useContext(Context);
    const [nameAlert,setNameAlert]= useState("");
    const [emailAlert,setEmailAlert]= useState("");
    const [passwordAlert,setPasswordAlert]= useState("");

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
        if(name.length<2){
           setNameAlert("Enter a valid string")
        }

        else if(isemail === -1 || email.length<14){
            setEmailAlert("Enter a valid email address")
        }

        else if(password.length<6){
            setPasswordAlert("Plaese enter a strong password for security")
        }
        else{
            let signBtn = document.getElementById("signup");
            signBtn.innerHTML="signing in...";
            setEmailAlert("");
            setNameAlert("");
            setPasswordAlert("");
            let sign = await context.signup(name,email,password,[]);
            if(sign === "signin successfull"){
                navigate("/");
            }else{
                signBtn.innerHTML="Sign up";
            }
        }
    }

    return (
        <>
            <div className="container" style={{height:"80vh"}}>
                <div className="incontainer">
                    
                <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={name}
                            onChange={fillName}
                        />
                        <div className="form-text" style={{color:"red",fontSize:"large"}}>
                           {nameAlert}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            autoComplete="off"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={fillEmail}
                        />
                        <div style={{color:"red",fontSize:"large"}}>
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
                    </div>
                    <div className="form-text" style={{color:"red",fontSize:"large"}}>
                         {passwordAlert}
                        </div>
                    <button className="btn btn-primary" id="signup" onClick={signup} >
                        Sign up
                    </button>
                </div>
            </div>
            <Link to="/" className="home">Home</Link>
           </>
    );
}