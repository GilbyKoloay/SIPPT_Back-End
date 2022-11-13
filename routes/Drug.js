const express = require('express');

// import Drugs controllers
const getAll = require('../controllers/Drugs/getAll');
const get = require('../controllers/Drugs/get');
const create = require('../controllers/Drugs/create');
const change = require('../controllers/Drugs/change');
const deleteData = require('../controllers/Drugs/delete');
const createReceive = require('../controllers/Drugs/createReceive');
const changeReceive = require('../controllers/Drugs/changeReceive');
const deleteReceive = require('../controllers/Drugs/deleteReceive');
const createExpenditure = require('../controllers/Drugs/createExpenditure');
const changeExpenditure = require('../controllers/Drugs/changeExpenditure');
const deleteExpenditure = require('../controllers/Drugs/deleteExpenditure');

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
