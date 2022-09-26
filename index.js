const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



// create express app
const app = express();

// CORS handler
app.use(cors());

// middleware
app.use(express.json());

// middleware (dev)
app.use((req, res, next) => {
    console.log(`${req.path} | ${req.method}`);
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
