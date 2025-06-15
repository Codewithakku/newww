const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userControllers');
const { getAllUsers } = require('../controllers/userControllers');
const { loginUser } = require('../controllers/userControllers'); 

router.get('/users', getAllUsers); // GET /users to fetch all users
router.post('/add', registerUser);
router.post('/login',loginUser);

module.exports = router;
