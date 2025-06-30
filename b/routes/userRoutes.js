const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userControllers');
const { getAllUsers } = require('../controllers/userControllers');
const { loginUser } = require('../controllers/userControllers'); 
const { LogoutUser } = require('../controllers/userControllers'); 
const {searchUsers} = require('../controllers/userControllers')
const {updateUser} = require('../controllers/userControllers')

const upload = require('../middlewares/uploads'); // 🔁 Multer middleware

router.post('/register', upload.single('profile_url'), registerUser);
router.post('/login',loginUser);
router.post('/logout', LogoutUser);

router.get('/users', getAllUsers); // GET /users to fetch all users
router.get('/search', searchUsers);

router.put('/users/update/:id', upload.single('profile_url'), updateUser);

module.exports = router;
