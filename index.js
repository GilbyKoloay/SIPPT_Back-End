const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



// create express app
const app = express();

// middleware
app.use(express.json());

// middleware in dev
app.use((req, res, next) => {
    console.log(`${req.path} | ${req.method}`);
    next();
});

// importing routes
const {
    employeesRouter,
    patientsRouter,
} = require('./routes');

// using routes
app.use('/api/employee', employeesRouter);
app.use('/api/patient', patientsRouter);

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
