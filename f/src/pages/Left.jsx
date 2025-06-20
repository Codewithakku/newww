import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from "@chakra-ui/react";

const Left = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]); //all db data store in users array 

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

  return (
    <div className="col-md-4 bg-light- border-end"
      style={{
        height: '80vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>

      <h5 className="p-3">Contacts</h5>

      {users.map(user => (
        <div key={user.id} className="p-3 border-bottom" style={{ cursor: 'pointer', marginLeft: 20 }} onClick={() => onSelectUser(user)}>
          <label>
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle"
              style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: 13 }} alt="Avatar" />

            <b style={{ paddingRight: 10 }}>{user.username}</b>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Left;
