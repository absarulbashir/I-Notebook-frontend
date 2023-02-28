import Navbar from "./components/Navbar"
import "./App.css"
import Sign from "./components/sign.js"
import Login from "./components/login.js"
import NotesArea from "./components/notesArea"
import { BrowserRouter as Router,
Routes,
Route, } from "react-router-dom"
function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route exact path="/" element={<NotesArea/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Sign/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
