const express = require('express');

// importing Patients controllers
const getAll = require('../controllers/Patients/getAll');
const get = require('../controllers/Patients/get');
const create = require('../controllers/Patients/create');
const change = require('../controllers/Patients/change');
const deleteData = require('../controllers/Patients/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all patients data
router.get('/get', get);                // get patient data
router.post('/create', create);         // create new patient
router.patch('/change', change);        // change patient data
router.delete('/delete', deleteData);   // delete patient data

module.exports = router;
