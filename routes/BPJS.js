const express = require('express');

// import BPJS controllers
const getAll = require('../controllers/BPJS/getAll');
const get = require('../controllers/BPJS/get');
const create = require('../controllers/BPJS/create');
const change = require('../controllers/BPJS/change');
const deleteData = require('../controllers/BPJS/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all BPJS
router.get('/get', get);                // get BPJS
router.post('/create', create);         // create BPJS
router.patch('/change', change);        // change BPJS
router.delete('/delete', deleteData);   // delete BPJS

module.exports = router;
