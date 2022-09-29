const mongoose = require('mongoose');

const changeLogSchema = new mongoose.Schema({
    _changedBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, "'ID Pembuat/Pengubah' data tidak boleh kosong"],
    },
    changedAt: {
        type: Date,
        default: new Date(),
    },
    description: {
        type: String,
    },
}, { _id: false });

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
    name: {
        type: String,
        required: [true, "'Nama' tidak boleh kosong"],
    },
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'LOKET', 'POLI UMUM', 'POLI GIGI', 'POLI KIA', 'APOTEK'],
        required: [true, "'Peran' tidak boleh kosong"],
    },
    changeLog: [changeLogSchema],
    // loginHistory (array) (stores user's data when logged in)
    // logoutHistory (array) (stores user's data when logged out)
    // log (array) (stores user's activities history)
}, {
    collection: 'Employees',
});

module.exports = mongoose.model('Employees', employeesSchema);
