const express = require('express');

// importing MedicalRecords controllers
const getAll = require('../controllers/MedicalRecords/getAll');
const get = require('../controllers/MedicalRecords/get');
const create = require('../controllers/MedicalRecords/createRecord');
const deleteData = require('../controllers/MedicalRecords/delete');
const getRecord = require('../controllers/MedicalRecords/getRecord');
const createRecord = require('../controllers/MedicalRecords/createRecord');

const router = express.Router();

router.get('/getAll', getAll);              // get all MedicalRecords data
router.get('/get', get);                    // get medical record data
router.post('/create', create);             // create new medical record
router.delete('/delete', deleteData);       // delete medical record data
router.get('/getRecord', getRecord);        // get record for medical record
router.post('/createRecord', createRecord);  // create new record in medical record

module.exports = router;
