const express = require('express');

// importing Patients controllers
const getAll = require('../controllers/Patients/getAll');
const get = require('../controllers/Patients/get');
const create = require('../controllers/Patients/create');
const change = require('../controllers/Patients/change');
const deleteData = require('../controllers/Patients/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all patients
router.get('/get', get);                // get patient
router.post('/create', create);         // create patient
router.patch('/change', change);        // change patient
router.delete('/delete', deleteData);   // delete patient

module.exports = router;
