const express = require('express');

// importing MedicalRecords controllers
const getAll = require('../controllers/MedicalRecords/getAll');
const get = require('../controllers/MedicalRecords/get');
const create = require('../controllers/MedicalRecords/create');
const deleteData = require('../controllers/MedicalRecords/delete');
const getRecord = require('../controllers/MedicalRecords/getRecord');
const createRecord = require('../controllers/MedicalRecords/createRecord');
const changeRecord = require('../controllers/MedicalRecords/changeRecord');
const deleteRecord = require('../controllers/MedicalRecords/deleteRecord');

const router = express.Router();

router.get('/getAll', getAll);                  // get all MedicalRecords data
router.get('/get', get);                        // get medical record data
router.post('/create', create);                 // create new medical record
router.delete('/delete', deleteData);           // delete medical record data
router.get('/getRecord', getRecord);            // get record for medical record
router.post('/createRecord', createRecord);     // create new record in medical record
router.patch('/changeRecord', changeRecord);    // change record in medical record
router.delete('/deleteRecord', deleteRecord);   // delete record in medical record

module.exports = router;
