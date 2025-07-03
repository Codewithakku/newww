import React from 'react'
import { Routes,Route } from "react-router-dom";

import Inbox from "./components/Inbox";
import Signup from "./components/Signup";
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  return (
    <div className="App">
        <div>
            <Routes>
              <Route path="/" element={<Signup/>} />
               <Route path="/inbox" element={<ProtectedRoute>     {/* without JWT we can not access /inbox route */}
                                              <Inbox />
                                            </ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    </div>
  )
}

export default App