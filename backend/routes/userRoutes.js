const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const rbacMiddleware = require('../middlewares/rbacMiddleware');

const router = express.Router();

router.get('/admin', authMiddleware, rbacMiddleware(['Admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

router.get('/moderator', authMiddleware, rbacMiddleware(['Admin', 'Moderator']), (req, res) => {
  res.json({ message: 'Moderator access granted' });
});

router.get('/user', authMiddleware, rbacMiddleware(['User', 'Admin', 'Moderator']), (req, res) => {
  res.json({ message: 'User access granted' });
});

module.exports = router;
