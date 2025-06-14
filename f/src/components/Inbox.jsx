import React, { useState } from 'react';
import Navbar from '../pages/Navbar';
import Left from '../pages/Left';
import Right from '../pages/Right';
import RightSideNav  from '../components/RightSideNav';
function Inbox() {
  // Dummy users
  const [users] = useState([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'chirag', email: 'chirag123@gmail.com'}
  ]);

  // Messages and selected user state
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Reset messages or fetch from DB
    setMessages([
      { text: `Hello from ${user.name}`, isSender: false },
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
          <Left users={users} onSelectUser={handleSelectUser}  /> {/* here we passes props like this  users={users}  props will catch in Left component */}
         
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
