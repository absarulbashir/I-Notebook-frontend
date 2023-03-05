import { createContext,useState } from "react";
const Context = createContext();

export default function ContextApi (props){
    const [name,setName] = useState("");
    const [data, setData] = useState([]);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [islogin,setIslogin] = useState(false);
    //login
    const login = async (Email,Password) => {
        const response = await fetch("https://inotebook-backend-rs2s.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email,
                password: Password,
            }),
        });
        const res = await response.json();
        if (res.error) {
            setEmail("");
            setPassword("");
            return "no user found";
            
        } else {
            setData(res.data);
            setName(res.name);
            setEmail(Email);
            setPassword(Password);
            setIslogin(true);
            localStorage.clear();
            localStorage.setItem("detail",JSON.stringify({email:Email,password:btoa(Password)}));  
            return "login successfull";
        }
    };

    //Signup 
    const signup= async (Name,Email,Password,Data)=>{
        const response = await fetch("https://inotebook-backend-rs2s.onrender.com/api/auth/signup", {
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
        if(res.error){
            setEmail("");
            setPassword("");
            return "user exists";
        }
        else {
            setIslogin(true)
            setName(Name);
            setPassword(Password);
            setEmail(Email);
            setData(Data);
            localStorage.clear();
            localStorage.setItem("detail",JSON.stringify({email:Email,password:btoa(Password)}));
            return "signin successfull";
        }
    }

    const addNote = async (Title,Desc,Email,Password)=>{
        await fetch("https://inotebook-backend-rs2s.onrender.com/api/auth/addnote", {
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
        await fetch("https://inotebook-backend-rs2s.onrender.com/api/auth/deletenote", {
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
            name:name,
            email:email,
            password:password,
            signup:signup,
            addNote:addNote,
            islogin:islogin,
            deleteNote:deleteNote,
        }}>
            {props.children}
        </Context.Provider>
    );

}

export {Context};