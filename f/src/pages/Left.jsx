import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Left = ({ onSelectUser  }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // store logged-in user

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

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

  // Filter out the logged-in user from the users list
  const filteredUsers = users.filter(user => user.id !== currentUser?.id);  //filteredUsers is array bcoz also filter() function return a new array 
                                                                            //we write quation mark bcoz : If currentUser exists → returns currentUser.id
                                                                            // : If currentUser is null or undefined → returns undefined safely (no crash)
  return (                                                                  // withoute quetion mark If currentUser is null or undefined, it throws an error
    <div className="col-md-4 bg-light border-end"
      style={{
        height: '80vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <h5 className="p-3">Contacts</h5>

      {filteredUsers.map(user => (
        <div
          key={user.id}
          className="p-3 border-bottom"
          style={{ cursor: 'pointer', marginLeft: 20 }}
          onClick={() => onSelectUser(user)}
        >
          <label>
            <img
              src={
                user.profile_url?.startsWith('/uploads/')
                  ? `http://localhost:3000${user.profile_url}`
                  : `http://localhost:3000/uploads/${user.profile_url || 'default.jpeg'}`
              }
              alt="Avatar"
              className="rounded-circle shadow border border-2 border-primary"
              style={{
                width: '55px',
                height: '55px',
                objectFit: 'cover',
                marginRight: '13px',
              }}
            />


            <b style={{ paddingRight: 10 }}>{user.username}</b>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Left;
