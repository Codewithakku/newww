import { Routes,Route } from "react-router-dom";


import React from 'react'
import Inbox from "./components/Inbox";
import Signup from "./components/Signup";

function App() {
  
  return (
    <div className="App">
        <div>
                <Routes>
                     <Route path="/" element={<Signup/>} />
                     <Route path="/inbox" element={<Inbox />} />
                </Routes>
        </div>
    </div>
  )
}

export default App