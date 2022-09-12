const express = require('express');

// importing MedicalRecords controllers
const create = require('../controllers/MedicalRecords/create');

const router = express.Router();

router.post('/create', create);         // create new medical record

module.exports = router;
