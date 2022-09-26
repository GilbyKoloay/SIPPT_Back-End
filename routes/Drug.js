const express = require('express');

// import Drugs controllers
const getAll = require('../controllers/drugs/getAll');
const get = require('../controllers/drugs/get');
const create = require('../controllers/drugs/create');
const change = require('../controllers/drugs/change');
const deleteData = require('../controllers/drugs/delete');
const createReceive = require('../controllers/drugs/createReceive');
const changeReceive = require('../controllers/drugs/changeReceive');
const deleteReceive = require('../controllers/drugs/deleteReceive');
const createExpenditure = require('../controllers/drugs/createExpenditure');
const changeExpenditure = require('../controllers/drugs/changeExpenditure');
const deleteExpenditure = require('../controllers/drugs/deleteExpenditure');

const router = express.Router();

router.get('/getAll', getAll);                          // get all drugs
router.get('/get', get);                                // get drug
router.post('/create', create);                         // create drug
router.patch('/change', change);                        // change drug
router.delete('/delete', deleteData);                   // delete drug
router.post('/createReceive', createReceive);           // create receivement in drug
router.patch('/changeReceive', changeReceive);          // change receivement in drug
router.delete('/deleteReceive', deleteReceive);         // delete receivement in drug
router.post('/createExpenditure', createExpenditure);   // create expenditure in receivement in drug
router.patch('/changeExpenditure', changeExpenditure);  // change expenditure in receivement in drug
router.delete('/deleteExpenditure', deleteExpenditure); // delete expenditure in receivement in drug

module.exports = router;
