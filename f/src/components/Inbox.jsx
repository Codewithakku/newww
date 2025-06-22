import React, { useState } from 'react';
import Navbar from '../pages/Navbar';
import Left from '../pages/Left';
import Right from '../pages/Right';
import Profile from '../components/Profile'

function Inbox() {

  // Messages and selected user state
  const [messages, setMessages] = useState([]);           //messages is array
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {  //thia function call when we click on contacts

    setSelectedUser(user);
    
    //selected user store in local storage 
    localStorage.setItem('selectedUser', JSON.stringify(user));
    const storedUser = JSON.parse(localStorage.getItem('selectedUser'));
    console.log(storedUser);
   
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isSender: true }]);
  };

  return (
    <div className="container-fluid pt-2">
    
      <Navbar onSelectUser={handleSelectUser} />

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

