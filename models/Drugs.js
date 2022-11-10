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
    preparationType: { // golongan
        type: String,
        enum: ['SERBUK', 'TABLET', 'KAPSUL', 'PIL', 'LARUTAN', 'SUSPENSI', 'CAIRAN INFUS', 'SALEP', 'VAKSIN', 'SUPPOSITORIA', 'OBAT TETES', 'INJEKSI', 'BMHP', 'ALAT KESEHATAN'],
        required: [true, "'Jenis Sediaan' tidak boleh kosong"],
    },
    unit: { // satuan
        type: String,
        enum: ['SACHET', 'TABLET', 'KAPSUL', 'PIL', 'BOTOL', 'POT', 'TUBE', 'VIAL', 'SUPPOSITORIA', 'AMPUL', 'VIAL', 'STRIP', 'PIECES', 'ROL', 'SET'],
        required: [true, "'Satuan' tidak boleh kosong"],
    },
    drug: [drugSchema],
    batchNumber: {
        type: String,
        required: [true, "'Nomor Batch' tidak boleh kosong"]
    },
    changeLog: [changeLogSchema],
}, { collection: "Drugs" });

module.exports = mongoose.model('Drugs', drugsSchema);
