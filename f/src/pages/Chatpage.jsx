// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import chats from '../../../backend/data/data';

// const Chatpage = () => {
//   return (
//     <div>
   
//       {/* Main Body */}
//       <div className="container-fluid mt-3">
//         <div className="row" style={{ height: '85vh' }}>
          
//           {/* Contacts (Left) */}
//           <div className="col-md-4 bg-light border-end overflow-auto">
//             <h5 className="p-3">Contacts</h5>
//             {chats[0].users.map(user => (
//                 <div key={user.email} className="p-3 border-bottom " style={{ cursor: 'pointer' }} >
//                   <strong>{user.name}</strong>
//                   <div className="text-muted small">{user.email}</div>
//                 </div>
//             ))}

            
//           </div>

//           {/* Chat History (Right) */}
//           <div className="col-md-8 d-flex flex-column">
//             <h5 className="p-3 border-bottom">Messages</h5>
         
//             <div className="flex-grow-1 p-3 overflow-auto">
//                 {/* logic of sender msgs */}
//                 <div className="mb-2">
//                     <div className="bg-primary text-white p-2 rounded w-75">
//                       Hello, how are you?
//                     </div>
//                 </div>

//                 {/* logic of receiver */}
//                 <div className="mb-2 d-flex justify-content-end">
//                     <div className="bg-light border p-2 rounded w-75 text-end">
//                       I'm good, thanks!
//                     </div>
//                 </div>
//               {/* Add more message bubbles here */}
//             </div>

//             {/* Input box */}
//             <div className="p-3 border-top">
//               <div className="input-group">
//                 <input type="text" className="form-control" placeholder="Type a message..." />
//                 <button className="btn btn-primary">Send</button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatpage;
