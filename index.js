const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



// create express app
const app = express();

// Front-End
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// CORS handler
app.use(cors());

// middleware
app.use(express.json());

// middleware (dev)
// const util = require('util'); // local
app.use((req, res, next) => {
    // console.log(`${req.ip.split('::ffff:')[1]} \t| ${req.method} \t| ${req.path} \t ${req.body && util.inspect(req.body, {showHidden: false, depth: null, colors: true})}`); // local
    next();
});

// importing routes
const {
    loginRouter,
    employeesRouter,
    patientsRouter,
    BPJSRouter,
    medicalRecordsRouter,
    queueRouter,
    drugRouter,
} = require('./routes');

// using routes
app.use('/api/login', loginRouter);

// middleware to authenticate user token
const authentication = require('./middlewares/authentication');
app.use(authentication);

// using protected routes (requires token)
app.use('/api/employee', employeesRouter);
app.use('/api/patient', patientsRouter);
app.use('/api/BPJS', BPJSRouter);
app.use('/api/medicalRecord', medicalRecordsRouter);
app.use('/api/drug', drugRouter);
app.use('/api/queue', queueRouter);

// 404 endpoint handler
app.use((req, res) => {
    res.status(404).json({
        status: `error`,
        msg: `Tidak ditemukan`,
        desc: `Endpoint not found`,
        data: null,
    });
});

// connect to database and listen for requests
mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://SIPPT:DatabasePasswordInDevelopmentModeChangeThisBeforeDeployment@sippt.mgnnzsg.mongodb.net/SIPPT')
    .then(() => {
        console.log(`Database connection successful.`);

        // listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Listening on port ${process.env.PORT || 4000}.`);
        });
    })
    .catch((e) => {
        console.log(`Database connection failed.\n`, e);
    });
