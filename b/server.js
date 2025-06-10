const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const cors = require('cors'); //cors atla mate ke jo aapdu backend server start on 3000 
app.use(cors());              //and so frontend mathi alag port like 5000 mathi req aave to pn aapde accept kari sakiye

app.use(express.json()); // Middleware to parse JSON

const FILE_PATH = path.join(__dirname, 'signup.json');

app.get('/', (req, res) => {
  res.send("Here render first file like login");
});


// Route to add data
app.post('/add', (req, res) => 
{
  const newData = req.body;

  // Step 1: Read existing data which come from in body
  fs.readFile(FILE_PATH, 'utf8', (err, fileData) => {
    let dataArray = [];  //this dataArray is tempary... inside  array we store body data and  after through this array store data in Json file 

    if (!err && fileData) {
      try {
        dataArray = JSON.parse(fileData);
      } catch (parseErr) {
        return res.status(500).send('Error parsing JSON');
      }
    }

    // Step 2: Add new data
    dataArray.push(newData);

    // Step 3: Write updated data back in  signup.json
    fs.writeFile(FILE_PATH, JSON.stringify(dataArray, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send('Error writing file');
      res.send('✅ Data added successfully!');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


