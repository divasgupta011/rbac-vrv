const express = require('express');
const router = express.Router(); 
const {register, login, oauth, logout} = require('../controllers/authController.js')


router.post('/register',register);
router.post('/login',login);
router.post('/google-login',oauth);
router.post('/logout', logout);

module.exports = router;