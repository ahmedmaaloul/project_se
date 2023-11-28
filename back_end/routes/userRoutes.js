const express = require('express');
const router = express.Router();
const { signup, signin, resetPassword } = require('../controllers/userController'); // Import your controllers

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/reset-password', resetPassword);

module.exports = router;
