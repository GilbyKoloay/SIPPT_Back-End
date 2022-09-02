const express = require('express');

// importing Patients controllers
const getAll = require('../controllers/patients/getAll');
const create = require('../controllers/patients/create');

const router = express.Router();

router.get('/getAll', getAll);      // get all patients data
router.post('/create', create);     // create new patient

module.exports = router;
