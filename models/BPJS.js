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

const BPJSSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: [true, "'Nomor Kartu' tidak boleh kosong"],
    },
    name: {
        type: String,
        required: [true, "'Nama' tidak boleh kosong"],
    },
    birthDate: {
        date: {
            type: Number,
            required: [true, "'Tanggal' dari 'Tanggal Lahir' tidak boleh kosong"],
        },
        month: {
            type: Number,
            required: [true, "'Bulan' dari 'Tanggal Lahir' tidak boleh kosong"],
        },
        year: {
            type: Number,
            required: [true, "'Tahun' dari 'Tanggal Lahir' tidak boleh kosong"],
        },
    },
    healthFacilityLevel: {
        type: String,
        // required: [true, "'Level FasKes' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    nursingClass: {
        type: String,
        // required: [true, "'Kelas Rawat' tidak boleh kosong"],
        default: null,
    },
    NIK: {
        type: Number,
        required: [true, "'NIK' tidak boleh kosong"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "'Alamat' tidak boleh kosong"],
    },
    changeLog: [changeLogSchema],
}, {
    collection: 'BPJS',
});

module.exports = mongoose.model('BPJS', BPJSSchema);
