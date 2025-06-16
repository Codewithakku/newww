const db = require('../config/db');

exports.registerUser = (req, res) => {
  const { username, mobile, email, password } = req.body;

    if (!username || !mobile || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (username, mobile, email, password) VALUES (?, ?, ?, ?)';

    db.query(sql, [username, mobile, email, password], (err, result) => {
        if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: '✅ Registration successful' });
    });
};


exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // 1) Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 2) Check if user exists
  const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // 3) Compare plain password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 4) Success: send user data
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
};

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, username, email FROM users';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.json(results);
  });
};