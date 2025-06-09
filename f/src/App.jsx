import React, { useState } from 'react';
// import Navbar from './pages/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Left from './pages/Left';
// import Right from './pages/Right';
import chats from '../../b/data/data'; // import chat data
import Signup from './components/Signup';

function App() {
  // State for selected user and messages
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([
    // example initial messages
    { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
     { text: 'Hello!', isSender: false },
    { text: 'Hi there!', isSender: true },
  ]);

  // Flatten all users from chats (example)
  const allUsers = chats.flatMap(chat => chat.users);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Optionally load messages for that user here
  };

  const handleSendMessage = (msgText) => {
    const newMsg = { text: msgText, isSender: true };
    setMessages(prev => [...prev, newMsg]);
    // Optionally send msg to backend or add received msg
  };

  return (
    // <div className="App">
    //   <Navbar />

    //   <div className="container-fluid mt-3">
    //       <div className="row" style={{ height: '85vh' }}>
    //         {/* Left - User list */}
    //         <Left users={allUsers} onSelectUser={handleSelectUser} />

    //         {/* Right - Chat Window */}
    //         <div className="col-md-8 d-flex flex-column">
    //           <Right messages={messages} onSendMessage={handleSendMessage} />
    //         </div>
    //       </div>
    //     </div>
    // </div>

    <div>
      <Signup/>
    </div>
  );
}

export default App;
