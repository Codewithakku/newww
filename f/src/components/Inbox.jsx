import React, { useContext } from 'react';
import Navbar from '../pages/Navbar';
import Left from '../pages/Left';
import Right from '../pages/Right';
import Profile from '../components/Profile'
import { UserContext } from './UserContext';

function Inbox() {
  // Use selectedUser and setSelectedUser from context
  const { selectedUser, setSelectedUser, darkMode } = useContext(UserContext);

  // Messages state (if needed)
  const [messages, setMessages] = React.useState([]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    localStorage.setItem('selectedUser', JSON.stringify(user));
    const storedUser = JSON.parse(localStorage.getItem('selectedUser'));
    console.log(storedUser);
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isSender: true }]);
  };

  return (
    <div className="container-fluid  ">
      <Navbar onSelectUser={handleSelectUser} />
      <div className="row" >
         <Left  onSelectUser={handleSelectUser}  />
         {selectedUser ? (
          <Right messages={messages} onSendMessage={handleSendMessage} selectedUser={selectedUser} />
          ) : (
              <div className="col-md-8 d-flex " >
                 <p className={`p-3 rounded text-center d-flex align-items-center justify-content-center  ${ darkMode ? 'bg-dark text-white border-secondary' : 'bg-light text-dark border-dark'}` } 
                    style={{height:'100%',width:'100%' ,fontSize:'25px'}}
                 >
                     Please select a user to start chatting.
                 </p>     
              </div>
         )}
      </div> 
    </div>
  );
}

export default Inbox;

