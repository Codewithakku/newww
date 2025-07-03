import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Profile from '../components/Profile';
import { UserContext } from '../components/UserContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Right = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [someoneTyping, setSomeoneTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { user, selectedUser, darkMode } = useContext(UserContext);

  // Register user with socket
  useEffect(() => {
    if (user?.id) {
      socket.emit('register', user.id);
    }
  }, [user]);

  // Fetch chat history
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

  // Scroll to bottom when new message comes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle socket events
  useEffect(() => {
    const handleIncoming = (msg) => {
      const isRelevant =
        (msg.senderId === selectedUser?.id && msg.receiverId === user?.id) ||
        (msg.senderId === user?.id && msg.receiverId === selectedUser?.id);

      if (isRelevant) {
        setMessages(prev => [...prev, { ...msg, isSender: msg.senderId === user.id }]);
      }
    };

    const handleTyping = (data) => {
      if (data.senderId === selectedUser?.id && data.receiverId === user?.id) {
        setSomeoneTyping(true);
      }
    };

    const handleStopTyping = (data) => {
      if (data.senderId === selectedUser?.id && data.receiverId === user?.id) {
        setSomeoneTyping(false);
      }
    };

    socket.on('chat message', handleIncoming);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('chat message', handleIncoming);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
  }, [selectedUser, user]);

  // Input change with typing indicator
  const handleChange = (e) => {
    setInput(e.target.value);

    if (!typing && user && selectedUser) {
      setTyping(true);
      socket.emit('typing', { senderId: user.id, receiverId: selectedUser.id });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      if (user && selectedUser) {
        socket.emit('stopTyping', { senderId: user.id, receiverId: selectedUser.id });
      }
    }, 1500);
  };

  // Send message
  const handleSend = async () => {
    if (!input.trim() || !user || !selectedUser) return;

    const newMessage = {
      senderId: user.id,
      receiverId: selectedUser.id,
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:3000/chat/send', newMessage);
      socket.emit('chat message', newMessage);
      socket.emit('stopTyping', { senderId: user.id, receiverId: selectedUser.id });
      setInput('');
    } catch (error) {
      console.error('Send error:', error);
    }
  };

  return (
    <div className={`col-md-8 d-flex flex-column ${darkMode ? 'bg-dark text-white' : ''}`} style={{ height: '87.2vh' }}>
      {/* Header */}
      <div className={`d-flex border-bottom align-items-center ${darkMode ? 'border-secondary' : ''}`}>
        <Profile selectedUser={selectedUser} />
        <h5 className="pt-2" style={{ marginLeft: '-5px', fontSize: '25px', fontFamily: 'sans-serif' }}>
          {selectedUser?.username}
        </h5>
      </div>

      {/* Messages */}
      <div
        className="flex-grow-1 p-3"
        style={{
          backgroundColor: darkMode ? '#1e1e1e' : '#fafafa',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 fs-5 d-flex ${msg.isSender ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
              className="p-2 rounded shadow-sm"
              style={{
                backgroundColor: msg.isSender ? '#0d6efd' : darkMode ? '#333' : '#f1f1f1',
                color: msg.isSender ? '#fff' : darkMode ? '#fff' : '#000',
                maxWidth: '75%',
              }}
            >
              {msg.message}
              <div
                style={{
                  fontSize: '1rem',
                  marginTop: '2px',
                  color: darkMode ? '#ccc' : '#000',
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

        <div ref={messagesEndRef} ></div>

      </div>

      {/* Typing indicator */}
        {someoneTyping && (
          <div className="mb-2  d-flex justify-content-start" style={{position:'absolute' ,marginTop:'625px' ,fontSize:'22px'}}>
            <div className=" fst-italic">Typing...</div>
          </div>
        )}

        
      {/* Input */}
      <div className={`p-3 border-top ${darkMode ? 'border-secondary' : ''}`}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder="Type a message..."
            value={input}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) handleSend();
            }}
          />
          <Button variant="primary" onClick={handleSend}> Send </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Right;
