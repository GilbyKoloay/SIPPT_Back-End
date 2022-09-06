const express = require('express');

// importing Login controllers
const login = require('../controllers/Login/login');

const router = express.Router();

router.post('/', login);          // login

module.exports = router;
