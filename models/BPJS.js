const mongoose = require('mongoose');

const BPJSSchema = new mongoose.Schema({
    _patient: {
        type: String,
        required: [true, "'ID Pasien' tidak boleh kosong"],
    },
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
        required: [true, "'Tanggal Lahir' tidak boleh kosong"],
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
    },
    address: {
        village: {
            type: String,
            required: [true, "'Kec./Desa' dari 'Alamat' tidak boleh kosong"],
        },
        district: {
            type: String,
            required: [true, "'Kel.' dari 'Alamat' tidak boleh kosong"],
        },
        city: {
            type: String,
            required: [true, "Kab./Kota dari 'Alamat' tidak boleh kosong"],
        },
        required: [true, "'Alamat' tidak boleh kosong"],
    },
    // changeLog (array) (stores changes. in case when the patient's data is changed, etc)
});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('BPJS', BPJSSchema);
