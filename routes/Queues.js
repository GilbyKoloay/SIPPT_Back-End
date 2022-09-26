const express = require('express');

// importing Queues controllers
const getAll = require('../controllers/Queues/getAll');
const create = require('../controllers/Queues/create');
const deleteData = require('../controllers/Queues/delete');

const router = express.Router();

router.get('/getAll', getAll);          // get all queues
router.post('/create', create);         // create queue
router.delete('/delete', deleteData);   // delete queue

module.exports = router;
