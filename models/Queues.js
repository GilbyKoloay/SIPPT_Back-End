const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    _createdBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, "'ID Pegawai' yang membuat tidak boleh kosong"],
    },
    _patient: {
        type: mongoose.Schema.ObjectId,
        required: [true, "'ID Pasien' tidak boleh kosong"],
    },
    _finishedBy: {
        type: mongoose.Schema.ObjectId,
        default: null,
    },
    createdAt: {
        type: Date,
        default: new Date(), // dev
    },
    status: {
        type: String,
        enum: ['SEDANG MENGANTRI', 'SUDAH DILAYANI'],
        default: 'SENDANG MENGANTRI',
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
