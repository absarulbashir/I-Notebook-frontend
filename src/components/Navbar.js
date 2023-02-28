import { useContext,useEffect,useState } from "react";
import { Context } from "./context.js";

export default function Navbar() {
  const context=useContext(Context);
  const [logSign,setLogSign] = useState({
    display:"inline-block"
  });
  const [logOut,setLogOut] = useState({
    display:"none"
  });

  useEffect(()=>{
    if(context.islogin){
      setLogOut({
        display:"inline-block"
      })
      setLogSign({
        display:"none"
      })
    }
  },[context.islogin])

  return (
    <>
      <nav className="navbar navbar-light bg-light">
          <h1>
            {context.name}
          </h1>
          <h1 className="inotebook">
           I-Notebook
          </h1>
          <div> 
             <a style={logSign} href="/login">Login</a> 
             <a style={logSign} href="/signup">Sign up</a>
             <a style={logOut} onClick={()=>{
              localStorage.clear();
             }} href="/" >Logout</a>
          </div>
      </nav>
    </>
  );
}
