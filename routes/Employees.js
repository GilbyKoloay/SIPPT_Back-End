const express = require('express');

// importing Employees controllers
const getAll = require('../controllers/Employees/getAll');
const get = require('../controllers/Employees/get');
const create = require('../controllers/Employees/create');
const change = require('../controllers/Employees/change');
const deleteData = require('../controllers/Employees/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all employees data
router.get('/get', get);                // get employee data
router.post('/create', create);         // create new employee
router.patch('/change', change);        // change employee data
router.delete('/delete', deleteData);   // delete employee data

module.exports = router;
