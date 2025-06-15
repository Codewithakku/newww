import React, { useState } from 'react';
import Navbar from '../pages/Navbar';
import Left from '../pages/Left';
import Right from '../pages/Right';
import Profile from '../components/Profile'
function Inbox() {
  
  // Messages and selected user state
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    
    localStorage.setItem('selectedUser', JSON.stringify(user));
    const storedUser = JSON.parse(localStorage.getItem('selectedUser'));
    console.log(storedUser.username);
   
    // Reset messages or fetch from DB
    setMessages([
      { text: `Hello from ${storedUser.username}`, isSender: false },
      { text: "Hi!", isSender: true },
      { text: 'hmm', isSender: false },
      { text: "yes!", isSender: true },
    ]);
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isSender: true }]);
  };

  return (
    <div className="container-fluid pt-2">
    
      <Navbar />

      <div className="row">
          <Left  onSelectUser={handleSelectUser}  /> {/* here we passes props like this  users={users}  props will catch in Left component */}
         
         {selectedUser ? (
          <Right messages={messages} onSendMessage={handleSendMessage} selectedUser={selectedUser} />
        ) : (
          <div className="col-md-8 d-flex align-items-center justify-content-center">
            <p>Please select a user to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;

