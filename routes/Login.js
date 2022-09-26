const express = require('express');

// import Login controllers
const login = require('../controllers/Login/login');

const router = express.Router();

router.post('/', login);    //  login

module.exports = router;
