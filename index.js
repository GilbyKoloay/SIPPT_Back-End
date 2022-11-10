const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



// create express app
const app = express();

// CORS handler
app.use(cors());
// app.use((req, res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept');
//     next();
// });

// middleware
app.use(express.json());

// middleware (dev)
const util = require('util');
app.use((req, res, next) => {
    console.log(`${req.ip.split('::ffff:')[1]} \t| ${req.method} \t| ${req.path} \t ${req.body && util.inspect(req.body, {showHidden: false, depth: null, colors: true})}`);
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
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log(`Database connection successful.`);

        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}.`);
        });
    })
    .catch((e) => {
        console.log(`Database connection failed.\n`, e);
    });
