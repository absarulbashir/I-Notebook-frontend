import { useContext,useEffect,useState } from "react";
import { Context } from "./context.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const context=useContext(Context);
  const [logSign,setLogSign] = useState({
    display:"inline-block",
    cursor:"pointer"
  });
  const [logOut,setLogOut] = useState({
    display:"none",
  });


  useEffect(()=>{
    if(context.islogin){
      setLogOut({
        display:"inline-block",
        cursor:"pointer"
      })
      setLogSign({
        display:"none"
      })
    }
  },[context.islogin])

  return (
    <>
      <nav className="navbar navbar-light bg-light">
          <h2>
            {context.name}
          </h2>
          <h2 className="inotebook">
           I-Notebook
          </h2>
          <div> 
             <a style={logSign} onClick={()=>{navigate("/login")}}>Login</a> 
             <a style={logSign} onClick={()=>{navigate("/signup")}} >Sign up</a>
             <a style={logOut} onClick={async()=>{
              localStorage.clear();
              window.location.reload();
             }} >Logout</a>
          </div>
      </nav>
    </>
  );
}
