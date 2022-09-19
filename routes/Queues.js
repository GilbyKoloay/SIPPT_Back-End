const express = require('express');

// importing Queues controllers
const getAll = require('../controllers/Queues/getAll');
const create = require('../controllers/Queues/create');
const deleteData = require('../controllers/Queues/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all queues data
router.post('/create', create);         // create new queue
router.delete('/delete', deleteData);   // delete queue data

module.exports = router;
