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

const medicalPrescriptionSchema = new mongoose.Schema({
    drug: [{
        drug: {
            type: String,
            required: [true, "'ID' obat tidak boleh kosong"],
        },
        description: {
            type: String,
            required: [true, "'Deskripsi' tidak boleh kosong"],
        }
    }],
    isDone: {
        _finishedBy: {
            type: String,
            required: [true, "'ID' petugas yang menyelesaikan resep obat tidak boleh kosong"],
        },
        changedAt: {
            type: Date,
            default: new Date(),
        },
    }
});

const recordsSchema = new mongoose.Schema({
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
    history: {
        type: String,
        // required: [true, "'' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    physicalExamination: {
        type: String,
        // required: [true, "'' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    diagnosis: {
        type: String,
        // required: [true, "'' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    medicalPrescription: medicalPrescriptionSchema,
    suggestion: {
        type: String,
        // required: [true, "'Anjuran' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    initials: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const medicalRecordsSchema = new mongoose.Schema({
    records: [recordsSchema],
    changeLog: [changeLogSchema],
}, { collection: 'MedicalRecords' });

module.exports = mongoose.model('MedicalRecords', medicalRecordsSchema);
