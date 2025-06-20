const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Post message route
router.post('/send', (req, res) => {
  chatController.sendMessage(req, res, req.io); // ✅ pass io
});

// Get messages route
router.get('/messages', chatController.getMessages);

module.exports = router;
