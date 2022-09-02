const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// importing routes
const {
    employeesRouter,
} = require('./routes');



// create express app
const app = express();

// middleware ind dev
app.use((req, res, next) => {
    console.log(`${req.path} | ${req.method}`);
    next();
});

// using routes
app.use('/api/employees', employeesRouter);

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
