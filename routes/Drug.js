const express = require('express');

// importing Drugs controllers
const getAll = require('../controllers/drugs/getAll');
const get = require('../controllers/drugs/get');
const create = require('../controllers/drugs/create');
const change = require('../controllers/drugs/change');
const deleteData = require('../controllers/drugs/delete');
const createReceive = require('../controllers/drugs/createReceive');
const changeReceive = require('../controllers/drugs/changeReceive');
const deleteReceive = require('../controllers/drugs/deleteReceive');

const router = express.Router();

router.get('/getAll', getAll);                  // get all drugs data
router.get('/get', get);                        // get drug data
router.post('/create', create);                 // create new drug
router.patch('/change', change);                // change drug data
router.delete('/delete', deleteData);           // delete drug data
router.post('/createReceive', createReceive);   // create new drug in drugs
router.patch('/changeReceive', changeReceive);  // change drug in drugs
router.delete('/deleteReceive', deleteReceive); // delete drug in drugs

module.exports = router;
