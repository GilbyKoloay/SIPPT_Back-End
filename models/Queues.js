const mongoose = require('mongoose');

const queuesSchema = new mongoose.Schema({
    poliUmum: {
        _createdBy: {
            type: String,
            required: [true, "'ID Pegawai' yang membuat tidak boleh kosong"],
        },
        _patient: {
            type: String,
            required: [true, "'ID Pasien' tidak boleh kosong"],
        },
        _finishedBy: {
            type: String,
            required: [true, "'ID Pegawai' yang menyelesaikan tidak boleh kosong"],
        },
        createdAt: {
            type: Date,
            // default: date now
        },
        status: {
            type: String,
            enum: ['SEDANG MENGANTRI', 'SUDAH DILAYANI'],
            required: [true, "'Status' tidak boleh kosong"],
        },
        finishedAt: {
            type: Date,
            required: [true, "'Waktu Selesai' tidak boleh kosong"],
        },
    },
    poliGigi: {
        _createdBy: {
            type: String,
            required: [true, "'ID Pegawai' yang membuat tidak boleh kosong"],
        },
        _patient: {
            type: String,
            required: [true, "'ID Pasien' tidak boleh kosong"],
        },
        _finishedBy: {
            type: String,
            required: [true, "'ID Pegawai' yang menyelesaikan tidak boleh kosong"],
        },
        createdAt: {
            type: Date,
            // default: date now
        },
        status: {
            type: String,
            enum: ['SEDANG MENGANTRI', 'SUDAH DILAYANI'],
            required: [true, "'Status' tidak boleh kosong"],
        },
        finishedAt: {
            type: Date,
            required: [true, "'Waktu Selesai' tidak boleh kosong"],
        },
    },
    poliKIA: {
        _createdBy: {
            type: String,
            required: [true, "'ID Pegawai' yang membuat tidak boleh kosong"],
        },
        _patient: {
            type: String,
            required: [true, "'ID Pasien' tidak boleh kosong"],
        },
        _finishedBy: {
            type: String,
            required: [true, "'ID Pegawai' yang menyelesaikan tidak boleh kosong"],
        },
        createdAt: {
            type: Date,
            // default: date now
        },
        status: {
            type: String,
            enum: ['SEDANG MENGANTRI', 'SUDAH DILAYANI'],
            required: [true, "'Status' tidak boleh kosong"],
        },
        finishedAt: {
            type: Date,
            required: [true, "'Waktu Selesai' tidak boleh kosong"],
        },
    },
});

module.exports = mongoose.model('Queues', queuesSchema);
