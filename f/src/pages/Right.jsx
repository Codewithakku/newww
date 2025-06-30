import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Profile from '../components/Profile';
import { UserContext } from '../components/UserContext';

const Right = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  const { user, selectedUser, darkMode } = useContext(UserContext);

  useEffect(() => {
    if (!selectedUser || !user) return;

    axios
      .get('http://localhost:3000/chat/messages', {
        params: {
          senderId: user.id,
          receiverId: selectedUser.id,
        },
      })
      .then(res => setMessages(res.data))
      .catch(err => console.error('Message fetch error:', err));
  }, [selectedUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = {
      senderId: user.id,
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
    <div
      className={`col-md-8 d-flex flex-column ${darkMode ? 'bg-dark text-white' : ''}`}
      style={{ height: '85.2vh' , }}
    >
      {/* Header */}
      <div className={`d-flex border-bottom align-items-center  ${darkMode ? 'border-secondary' : ''}`}>
        <Profile selectedUser={selectedUser} />
        <h5 className="pt-2" style={{ marginLeft: '-5px',fontSize:'25px',fontFamily:'sans-serif' }}>{selectedUser.username}</h5>
      </div>

      {/* Chat messages */}
      <div
        className="flex-grow-1 p-3 overflow-auto"
        style={{
          backgroundColor: darkMode ? '#1e1e1e' : '#fafafa',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 fs-4 d-flex ${msg.isSender ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
              className="p-2 rounded shadow-sm"
              style={{
                backgroundColor: msg.isSender
                  ? darkMode ? '#0d6efd' : '#0d6efd'
                  : darkMode ? '#333' : '#f1f1f1',
                color: msg.isSender ? '#fff' : darkMode ? '#fff' : '#000',
                maxWidth: '75%',
              }}
            >
              {msg.message}
              <div
                style={{
                  fontSize: '0.75rem',
                  marginTop: '2px',
                  color: darkMode ? '#ccc' : 'black',
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div> {/* to find newest message */ }
      </div>

      {/* Input field */}
      <div className={`p-3 border-top ${darkMode ? 'border-secondary' : ''}`}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
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
