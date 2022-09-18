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
    unit: {
        type: String,
        enum: ['TABLET', 'BOTOL', 'BOX', 'ROLL', 'SATCHET'],
    },
    totalStock: {
        type: Number,
        required: [true, "'Jumlah Stok' tidak boleh kosong"],
    },
    receiveDate: {
        type: Date,
        required: [true, "'Tanggal Terima' tidak boleh kosong"],
    },
    receiveTotal: {
        type: Number, // jumlah yang diterima
        required: [true, "'Total Penerimaan' tidak boleh kosong"],
    },
    expireDate: {
        type: Date,
        required: [true, "'Tanggal Kadaluarsa' tidak boleh kosong"]
    },
    batchNumber: {
        type: String,
        required: [true, "'Nomor Batch' tidak boleh kosong"]
    },
});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('Drugs', drugsSchema);
