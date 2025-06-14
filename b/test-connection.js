const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aakash@159', // your MySQL password
  database: 'chatapp'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database.');

  // 1. Create a test table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS test_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(100)
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) return console.error('❌ Table creation error:', err.message);

    console.log('✅ test_users table ready.');

    // 2. Insert a test user
    const insertQuery = `INSERT INTO test_users (name, email) VALUES (?, ?)`;
    connection.query(insertQuery, ['Aakash', 'aakash@example.com'], (err) => {
      if (err) return console.error('❌ Insert error:', err.message);

      console.log('✅ Test user inserted.');

      // 3. Fetch users
      connection.query(`SELECT * FROM test_users`, (err, results) => {
        if (err) return console.error('❌ Select error:', err.message);

        console.log('✅ Users from DB:', results);

        connection.end(); // Close after all done
      });
    });
  });
});
