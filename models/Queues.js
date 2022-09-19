const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
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
        default: new Date(),
    },
    status: {
        type: String,
        enum: ['SEDANG MENGANTRI', 'SUDAH DILAYANI'],
        required: [true, "'Status' tidak boleh kosong"],
    },
    finishedAt: {
        type: Date,
        default: null,
    },
});

const queuesSchema = new mongoose.Schema({
    poliUmum: [queueSchema],
    poliGigi: [queueSchema],
    poliKIA: [queueSchema],
}, { collection: 'Queues' });

module.exports = mongoose.model('Queues', queuesSchema);
