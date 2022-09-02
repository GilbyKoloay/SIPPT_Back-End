const mongoose = require('mongoose');

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
        type: String,
        required: [true, "'NIK' tidak boleh kosong"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "'Alamat' tidak boleh kosong"],
    },
    // changeLog (array) (stores changes. in case when the patient's data is changed, etc)
}, {
    collection: 'BPJS',
});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('BPJS', BPJSSchema);
