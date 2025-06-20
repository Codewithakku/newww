import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Profile from '../components/Profile';

const Right = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  // Fetch chat history
  useEffect(() => {
    if (!selectedUser || !loggedUser) return;

    axios.get('http://localhost:3000/chat/messages', {
      params: {
        senderId: loggedUser.id,
        receiverId: selectedUser.id,
      },
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error('Message fetch error:', err));
  }, [selectedUser]);

  // Scroll to latest message when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = {
      senderId: loggedUser.id,
      receiverId: selectedUser.id,
      message: input,
    };

    try {
      await axios.post('http://localhost:3000/chat/send', newMessage);
      setMessages(prev => [...prev, { ...newMessage, isSender: 1 }]);
      setInput('');
    } catch (error) {
      console.error('Send error:', error);
    }
  };

  return (
    <div className="col-md-8 d-flex flex-column" style={{ height: '100vh'}}>
      {/* Header */}
      <div className="d-flex p-3 border-bottom align-items-center">
        <Profile selectedUser={selectedUser} />
        <h5 className="ms-2 pt-2">{selectedUser.username}</h5>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: '#fafafa', overflowY:'auto',scrollbarWidth:'none' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 d-flex ${msg.isSender ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
              className="p-2 rounded shadow-sm"
              style={{
                backgroundColor: msg.isSender ? '#0d6efd' : '#f1f1f1',
                color: msg.isSender ? '#fff' : '#000',
                maxWidth: '75%',
                overflowY: 'auto',
                scrollbarWidth: 'none'

              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input area */}
      <div className="p-3 border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Right;
