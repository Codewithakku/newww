import { Routes,Route } from "react-router-dom";


import React from 'react'
import Inbox from "./components/Inbox";
import Signup from "./components/Signup";
import Login from "./components/Login"


function App() {
  
  return (
    <div className="App">
        <div>
                <Routes>
                     <Route path="/" element={<Signup/>} />
                     <Route path="/inbox" element={<Inbox />} />
                     <Route path="/login" element={<Login />} />
                </Routes>
        </div>
    </div>
  )
}

export default App