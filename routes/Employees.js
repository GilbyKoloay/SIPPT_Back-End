const express = require('express');

// importing Employees controllers
const getAll = require('../controllers/employees/getAll');
const get = require('../controllers/employees/get');
const create = require('../controllers/employees/create');
const change = require('../controllers/employees/change');
const deleteData = require('../controllers/employees/delete');

const router = express.Router();

router.get('/getAll', getAll);        // get all employees data
router.get('/get', get);           // get employee data
router.post('/create', create);       // create new employee
router.patch('/change', change);      // change employee data
router.delete('/delete', deleteData); // delete employee data

module.exports = router;
