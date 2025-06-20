const db = require('../config/db');
const jwt = require('jsonwebtoken');

// 🔐 JWT Secret and Expiry
const JWT_SECRET = 'mySuperSecretKey123'; // Strong secret for signing
const JWT_EXPIRES_IN = '1d'; // Token valid for 1 day

// ===================== REGISTER =====================
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

// ===================== LOGIN =====================
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // 1) Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 2) Check user existence
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

    // 4) Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 5) Success response with token
    return res.status(200).json({
      message: 'Login successful',
       // Send token to client
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  });
};

// ===================== GET ALL USERS =====================
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, username, email FROM users';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.json(results);
  });
};

exports.searchUsers = (req, res) => {
  const search = req.query.search;
  if (!search) return res.json([]);

  const query = `SELECT id, username,email FROM users WHERE username LIKE ?`;

  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      console.error('❌ Search error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};
