import React, { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Profile from '../components/Profile';

const Right = ({ messages, onSendMessage, selectedUser }) => {
  
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="col-md-8 d-flex flex-column position-relative">
      <div className='d-flex'>
          <Profile />
          <h5 className='pt-4' style={{ marginLeft: '-10px', marginTop: '3px' }}>{selectedUser.username}</h5>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto"
            style={{
              height: '80vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
        
          {messages.map((msg, index) => (
      <div
            key={index}
            className={`mb-2 d-flex ${msg.isSender ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <div className="p-2 rounded shadow-sm"
              style={{
                backgroundColor: msg.isSender ? '#0d6efd' : '#f1f1f1',
                color: msg.isSender ? '#fff' : '#000',
                textAlign: msg.isSender ? 'right' : 'left',
                maxWidth: '75%',
                wordBreak: 'break-word',
              }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Footer message box */}
      <div className="p-3 border-top" style={{ position: 'fixed', bottom: 0, width: '66.66%' }}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Right;
