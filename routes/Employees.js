const express = require('express');

// import Employees controllers
const getAll = require('../controllers/Employees/getAll');
const get = require('../controllers/Employees/get');
const create = require('../controllers/Employees/create');
const change = require('../controllers/Employees/change');
const deleteData = require('../controllers/Employees/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all employees
router.get('/get', get);                // get employee
router.post('/create', create);         // create employee
router.patch('/change', change);        // change employee
router.delete('/delete', deleteData);   // delete employee

module.exports = router;
