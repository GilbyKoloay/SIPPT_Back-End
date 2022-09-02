const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "'Nama Pengguna' tidak boleh kosong"],
        unique: [true, "'Nama Pengguna' sudah terdaftar"],
    },
    password: {
        type: String,
        required: [true, "'Password' tidak boleh kosong"],
    },
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'LOKET', 'POLI UMUM', 'POLI GIGI', 'POLI KIA', 'APOTEK'],
        required: [true, "'Peran' tidak boleh kosong"],
    },
    // loginHistory (array) (stores user's data when logged in)
    // logoutHistory (array) (stores user's data when logged out)
    // log (array) (stores user's activities history)
    // changeLog (stores changes. in case when the staff's data is changed, etc)
}, {
    collection: 'Employees',
});

// const loginHistorySchema = new mongoose.Schema({});

// const logoutHistorySchema = new mongoose.Schema({});

// const logSchema = new mongoose.Schema({});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('Employees', employeesSchema);
