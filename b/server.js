const db = require('./config/db');
const express = require('express');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const app = express();
const PORT = 3000;

const cors = require('cors'); //cors atla mate ke jo aapdu backend server start on 3000 
app.use(cors());              //and so frontend mathi alag port like 5000 mathi req aave to pn aapde accept kari sakiye

app.use(express.json()); // Middleware to parse JSON

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send("Here render first file like login");
});

// Route to add data

app.use('/', userRoutes);
app.use('/chat', chatRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


