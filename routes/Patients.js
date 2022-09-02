const express = require('express');

// importing Patients controllers
const getAll = require('../controllers/patients/getAll');

const router = express.Router();

router.get('/getAll', getAll);          // get all patients data

module.exports = router;
