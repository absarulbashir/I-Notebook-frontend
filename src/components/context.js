import { createContext,useRef,useState } from "react";

const Context = createContext();

export default function ContextApi (props){
    const name = useRef("");
    const [data, setData] = useState([]);
    const email = useRef("");
    const password = useRef("");
    const islogin = useRef(false);
    //login
    const login = async (Email,Password) => {
        islogin.current=false;
        const response = await fetch("https://i-notebook-hv5d.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email,
                password: Password,
            }),
        });
        const res = await response.json();
        if (res.error === "No user found") {
            alert("No user found");
            email.current="";
            password.current="";
            return "no user found";
        } else {
            setData(res.data);
            name.current=res.name;
            email.current=Email;
            password.current=Password;
            islogin.current=true;
            localStorage.clear();
            localStorage.setItem("detail",JSON.stringify({email:Email,password:btoa(Password)}));  
            return "login successfull";
        }
    };

    //Signup 
    const signup= async (Name,Email,Password,Data)=>{
        islogin.current=false;
        const response = await fetch("https://i-notebook-hv5d.onrender.com/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name:Name,
                email: Email,
                password: Password,
                data:Data
            }),
        });
        const res = await response.json();
        if(res.error === "A user with this email or password already exists."){
            alert("A user with this email or password already exists.");
            email.current="";
            password.current="";
            return "user exists";
        }
        else {
            name.current=Name;
            email.current=Email;
            email.password=Password;
            setData(Data);
            islogin.current=true;
            localStorage.clear();
            localStorage.setItem("detail",JSON.stringify({email:Email,password:btoa(Password)}));
            return "signin successfull";
        }
    }

    const addNote = async (Title,Desc,Email,Password)=>{
        await fetch("https://i-notebook-hv5d.onrender.com/api/auth/addnote", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                title:Title,
                description:Desc,
                email: Email,
                password: Password
            }),
        });       
    }
    const deleteNote = async (Email,Password,index)=>{
        await fetch("https://i-notebook-hv5d.onrender.com/api/auth/deletenote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email,
                password: Password,
                index:index
            }),
        });     
       
    }


    return(
        <Context.Provider value={{
            login:login,
            data:data,
            name:name.current,
            email:email.current,
            password:password.current,
            signup:signup,
            addNote:addNote,
            islogin:islogin.current,
            deleteNote:deleteNote
        }}>
            {props.children}
        </Context.Provider>
    );

}

export {Context};