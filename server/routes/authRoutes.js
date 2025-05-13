const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerHandler, loginHandler, logoutHandler, forceLogoutHandler } = require('../controllers/authController');

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.post('/force-logout', forceLogoutHandler);


module.exports = router;
