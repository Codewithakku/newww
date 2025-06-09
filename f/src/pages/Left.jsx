import React from 'react';
import { Avatar, HStack } from "@chakra-ui/react"
const Left = ({ users, onSelectUser }) => {
  return (
    
    <div className="col-md-4 bg-light border-end"
      style={{
         height: '80vh', // Set height to 70% of the viewport
         overflowY: 'auto', // Enable vertical scrolling when content exceeds height
         scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
         
      }}>

      <h5 className="p-3">Contacts</h5>

      {users.map(user => (
        <div key={user.email} className="p-3 border-bottom"
            style={{ cursor: 'pointer', marginLeft: 20 }}
            onClick={() => onSelectUser(user)}
        >
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" 
           style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: 13 , }} alt="Avatar" />
  
          <b style={{ paddingRight: 10 }}>{user.name}</b>
          {/* <div className="text-muted small">{user.email}</div> */}
             
        </div>
      ))}
      
    </div>
  );
};

export default Left;
