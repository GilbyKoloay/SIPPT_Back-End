const mongoose = require('mongoose');

const medicalRecordsSchema = new mongoose.Schema({
    records: {
        default: null,
    },
});

const recordsSchema = new mongoose.Schema({
    _createdBy: {
        type: String,
        required: [true, "'ID Pegawai' tidak boleh kosong"],
    },
    _medicalPrescription: {
        type: String,
        required: [true, "'ID Resep Obat' tidak boleh kosong"],
    },
    createdAt: {
        type: Date,
        // date now
    },
    bodyHeight: {
        type: mongoose.Types.Decimal128,
        // required: [true, "'Tinggi Badan' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    bodyWeight: {
        type: mongoose.Types.Decimal128,
        // required: [true, "'Berat Badan' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    tension: {
        type: String,
        // required: [true, "'Tensi' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    pulse: {
        type: mongoose.Types.Decimal128,
        // required: [true, "'Nadi' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    respiration: {
        type: mongoose.Types.Decimal128,
        // required: [true, "'Respirasi' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    bodyTemperature: {
        type: mongoose.Types.Decimal128,
        // required: [true, "'Suhu Badan' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    laboratorium: {
        type: String, // tanya ini tipe apa
        // required: [true, "'Nadi' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    his_phyExam_dia: {
        type: String,
        // required: [true, "'Anamnesa/Pemeriksaan Fisik/Diagnosa' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    suggestion: {
        type: String,
        // required: [true, "'Anjuran' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    initials: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'MedicalRecords',
});

module.exports = mongoose.model('MedicalRecords', medicalRecordsSchema);
