const express = require('express');

// importing Employees controllers
const getAll = require('../controllers/employees/getAll');
const create = require('../controllers/employees/create');
const change = require('../controllers/employees/change');
const deleteData = require('../controllers/employees/delete');

const router = express.Router();

router.get('/', getAll);        // get all employees data
router.post('/', create);       // create new employee
router.patch('/', change);      // change employee data
router.delete('/', deleteData); // delete employee data

module.exports = router;
