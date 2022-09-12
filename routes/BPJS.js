const express = require('express');

// importing BPJS controllers
const create = require('../controllers/BPJS/create');

const router = express.Router();

router.post('/create', create);         // create new BPJS

module.exports = router;
