const express = require('express');

// importing Employees controllers
const {
    getAll,
} = require('../controllers/employees');

const router = express.Router();

// get all employees data
router.get('/', getAll);

module.exports = router;
