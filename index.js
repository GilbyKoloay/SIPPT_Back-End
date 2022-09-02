const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

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
