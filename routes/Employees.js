const express = require('express');

// importing Employees controllers
const getAll = require('../controllers/employees/getAll');
const create = require('../controllers/employees/create');
const change = require('../controllers/employees/change');

const router = express.Router();

router.get('/', getAll);    // get all employees data
router.post('/', create);   // create new employees
router.patch('/', change);  // change employees data

module.exports = router;
