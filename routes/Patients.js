const express = require('express');

// importing Patients controllers
const getAll = require('../controllers/Patients/getAll');
const get = require('../controllers/Patients/get');
const create = require('../controllers/Patients/create');

const router = express.Router();

router.get('/getAll', getAll);      // get all patients data
router.get('/get', get);            // get patient data
router.post('/create', create);     // create new patient

module.exports = router;
