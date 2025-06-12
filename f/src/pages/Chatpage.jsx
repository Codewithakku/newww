import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { messages } from '../data/messages';
import Left from './Left';
import Right from './Right';
import Navbar from './Navbar';

const Chatpage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = (message) => {
    const newMessage = {
      readBy: [],
      _id: Date.now().toString(),
      sender: {
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        _id: "1",
        name: "Piyush",
      },
      content: message,
      chat: "60a3de1ff381d830b884998d",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-3">
        <div className="row" style={{ height: '85vh' }}>
          <Left 
            users={messages.map(msg => msg.sender).filter((user, index, self) => 
              index === self.findIndex((u) => u._id === user._id)
            )}
            onSelectUser={setSelectedUser}
          />
          <Right 
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
