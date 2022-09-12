const express = require('express');

// importing BPJS controllers
const getAll = require('../controllers/BPJS/getAll');
const get = require('../controllers/BPJS/get');
const create = require('../controllers/BPJS/create');
const change = require('../controllers/BPJS/change');
const deleteData = require('../controllers/BPJS/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all BPJS data
router.get('/get', get);                // get BPJS data
router.post('/create', create);         // create new BPJS
router.patch('/change', change);        // change BPJS data
router.delete('/delete', deleteData);   // delete BPJS data

module.exports = router;
