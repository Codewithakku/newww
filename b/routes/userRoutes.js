const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userControllers');
const { getAllUsers } = require('../controllers/userControllers');
const { loginUser } = require('../controllers/userControllers'); 

router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/users', getAllUsers); // GET /users to fetch all users

module.exports = router;
