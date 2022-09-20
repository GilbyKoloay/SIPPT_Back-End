const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
    expenditureDate: {
        type: Date,
        default: new Date(), // dev
    },
    expenditureTotal: {
        type: Number,
    },
});

const drugSchema = new mongoose.Schema({
    receiveDate: {
        type: Date,
        default: new Date(),
    },
    expireDate: {
        type: Date,
        default: new Date(), //dev
    },
    receiveTotal: {
        type: Number,
    },
    expenditure: [expenditureSchema],
});

const drugsSchema = new mongoose.Schema({
    // changeLog (array) (stores changes. in case when the patient's data is changed, etc)
    name: {
        type: String,
        required: [true, "'Nama Obat' tidak boleh kosong"],
        unique: [true, "'Nama Obat' sudah terdaftar"],
    },
    type: {
        type: String,
        enum: ['TABLET', 'KAPSUL', 'KAPLET', 'SIRUP', 'DROPS', 'SALEP', 'TETES', 'KRIM', 'GEL', 'SUPOSITORIA', 'INJEKSI', 'CAIRAN INFUS', 'BMHP'],
        required: [true, "'Tipe Obat' tidak boleh kosong"],
    },
    unit: {
        type: String,
        enum: ['TABLET', 'BOTOL', 'BOX', 'ROLL', 'SATCHET'],
        required: [true, "'Unit Obat' tidak boleh kosong"],
    },
    drug: [drugSchema],
    batchNumber: {
        type: String,
        required: [true, "'Nomor Batch' tidak boleh kosong"]
    },
}, { collection: "Drugs" });

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('Drugs', drugsSchema);
