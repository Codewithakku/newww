import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const Left = () => {
  
  const [users, setUsers] = useState([]); //store all users in users array from mySql db
  
  const { user, selectedUser, setSelectedUser, darkMode } = useContext(UserContext); // ⬅️ added darkMode

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error in fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(u => u.id !== user?.id);  //user.id is global logged user it come from useContext 

  return (
    <>
    <div
      className={`col-md-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} border-end`}
      style={{
        height: '87.2vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <h5 className='' style={{marginLeft:'10px' , fontSize:'30px'}}>Contacts</h5>
      
      {filteredUsers.map(u => ( 
        <div
          key={u.id}
          className={`p-3 border-bottom ${darkMode ? 'border-secondary' : ''}`}
          style={{
            cursor: 'pointer',
            marginLeft: 20,
            // backgroundColor: selectedUser?.id === u.id
            //   ? (darkMode ? '#444' : '#e0e0e0')
            //   : 'transparent',
          }}
          onClick={() => {
            setSelectedUser(u);
            // onSelectUser(u);
          }}
        >
            <img
              src={
                u.profile_url
                  ? `http://localhost:3000${u.profile_url}`
                  : 'http://localhost:3000/uploads/default.jpeg'
              }
              alt="Avatar"
              className="rounded-circle shadow border border-2 border-primary"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
            <b style={{fontSize:'20px'}}>{u.username}</b>
         
        </div>
      ))}
    </div>
   </>
  );
};

export default Left;
