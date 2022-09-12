const mongoose = require('mongoose');

const drugsSchema = new mongoose.Schema({
    // changeLog (array) (stores changes. in case when the patient's data is changed, etc)
    name: {
        type: String,
        required: [true, "'Nama Obat' tidak boleh kosong"],
    },
    type: {
        type: String,
        enum: ['TABLET', 'KAPSUL', 'KAPLET', 'SIRUP', 'DROPS', 'SALEP', 'TETES', 'KRIM', 'GEL', 'SUPOSITORIA', 'INJEKSI', 'CAIRAN INFUS', 'BMHP'],
    },
    satuan: {
        type: String,
        enum: ['TABLET', 'BOTOL', 'BOX', 'ROLL', 'SATCHET'],
    },
    totalStocks: {
        type: Number,
        required: [true, ''],
    },
    tanggalPenerimaan: {
        type: Date,
    },
    jumlahPenerimaan: {
        type: String, // jumlah yang diterima
    },
    tanggalKadaluarsa: {
        type: Date,
    },
    batchNumber: {
        type: String,
    },
});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('Drugs', drugsSchema);
