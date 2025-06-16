const db = require('./config/db');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const cors = require('cors'); //cors atla mate ke jo aapdu backend server start on 3000 
app.use(cors());              //and so frontend mathi alag port like 5000 mathi req aave to pn aapde accept kari sakiye

app.use(express.json()); // Middleware to parse JSON

const FILE_PATH = path.join(__dirname, 'userModel.json');

app.get('/', (req, res) => {
  res.send("Here render first file like login");
});


// Route to add data
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


