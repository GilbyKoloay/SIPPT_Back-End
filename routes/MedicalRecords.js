const express = require('express');

// importing MedicalRecords controllers
const getAll = require('../controllers/MedicalRecords/getAll');
const get = require('../controllers/MedicalRecords/get');
const create = require('../controllers/MedicalRecords/create');
const deleteData = require('../controllers/MedicalRecords/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all MedicalRecords data
router.get('/get', get);                // get medical record data
router.post('/create', create);         // create new medical record
router.delete('/delete', deleteData);   // delete medical record data

module.exports = router;