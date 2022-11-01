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

const expenditureSchema = new mongoose.Schema({
    expenditureDate: {
        type: Date,
        // default: new Date(), // dev (this date should be taken from front-end)
    },
    expenditureTotal: {
        type: Number,
    },
});

const drugSchema = new mongoose.Schema({
    receiveDate: {
        type: Date,
        // default: new Date(), // dev (this date should be taken from front-end)
    },
    expireDate: {
        type: Date,
        // default: new Date(), //dev (this date should be taken from front-end)
    },
    receiveTotal: {
        type: Number,
    },
    expenditure: [expenditureSchema],
});

const drugsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "'Nama Obat' tidak boleh kosong"],
        unique: [true, "'Nama Obat' sudah terdaftar"],
    },
    type: { // golongan
        type: String,
        enum: ['TABLET', 'KAPSUL', 'KAPLET', 'SIRUP', 'DROPS', 'SALEP', 'TETES', 'KRIM', 'GEL', 'SUPOSITORIA', 'INJEKSI', 'CAIRAN INFUS', 'BMHP'],
        required: [true, "'Tipe Obat' tidak boleh kosong"],
    },
    unit: { // satuan
        type: String,
        enum: ['TABLET', 'BOTOL', 'BOX', 'ROLL', 'SATCHET'],
        required: [true, "'Unit Obat' tidak boleh kosong"],
    },
    drug: [drugSchema],
    batchNumber: {
        type: String,
        required: [true, "'Nomor Batch' tidak boleh kosong"]
    },
    changeLog: [changeLogSchema],
}, { collection: "Drugs" });

module.exports = mongoose.model('Drugs', drugsSchema);
