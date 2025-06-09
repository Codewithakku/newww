import React from 'react';

const Right = ({ messages, onSendMessage }) => {
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="col-md-8 d-flex flex-column">
      <h5 className="p-3 border-bottom">Messages</h5>
      <div className="flex-grow-1 p-3 overflow-auto"  style={{
        height: '80vh', // Set height to 70% of the viewport
        overflowY: 'auto', // Enable vertical scrolling when content exceeds height
         scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        
      }}>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 d-flex ${msg.isSender ? '' : 'justify-content-end'}`}
          >
            <div className={`p-2 rounded w-75
                ${ msg.isSender ? 'bg-primary text-white' : 'bg-light border text-end'
                }`}
                >
                {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* msg send footer section */}
      {/* Message send footer section */}
    <div className="p-3 border-top" style={{ position: "fixed", bottom: 0, width: "50%", backgroundColor: "#fff", }}>
      <div className="input-group">
          <input type="text" className="form-control" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} />
          <button className="btn btn-primary" onClick={handleSend}> Send  </button>
      </div>
</div>

    </div>
  );
};

export default Right;
