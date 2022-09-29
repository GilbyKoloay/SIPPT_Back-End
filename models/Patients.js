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

const patientsSchema = new mongoose.Schema({
    _medicalRecord: {
        type: String,
        // required: [true, "'ID Rekam Medis' tidak boleh kosong"],
        default: null, // dev mode
    },
    _BPJS: {
        type: String,
        // required: [true, "'ID BPJS' tidak boleh kosong"],
        default: null, // dev mode
    },
    medicalRecordNumber: {
        type: Number,
        required: [true, "'No. Rekam Medis' tidak boleh kosong"],
        unique: [true, "'No. Rekam Medis' sudah terdaftar"],
    },
    name: {
        type: String,
        required: [true, "'Nama' tidak boleh kosong"],
    },
    birthPlace: {
        type: String,
        required: [true, "'Tempat lahir' tidak boleh kosong"],
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
    sex: {
        type: String,
        enum: ['LAKI-LAKI', 'PEREMPUAN'],
        required: [true, "'Jenis Kelamin' tidak boleh kosong"],
    },
    familyCardName: {
        type: String,
        required: [true, "'Nama Kartu Keluarga' tidak boleh kosong"],
    },
    address: {
        districtCity: {
            type: String,
            required: [true, "Kab./Kota dari 'Alamat' tidak boleh kosong"],
        },
        subDistrict: {
            type: String,
            required: [true, "'Kel.' dari 'Alamat' tidak boleh kosong"],
        },
        wardVillage: {
            type: String,
            required: [true, "'Kec./Desa' dari 'Alamat' tidak boleh kosong"],
        },
    },
    phoneNumber: {
        type: Number,
        // required: [true, "'No. Telp.' tidak boleh kosong"], // tanya kalo ini wajib ato nd
        default: null,
    },
    paymentMethod: {
        type: String,
        enum: ['BIAYA SENDIRI', 'UMUM'],
        required: [true, "'Cara Pembayaran' tidak boleh kosong"],
    },
    religion: {
        type: String,
        required: [true, "'Agama' tidak boleh kosong"],
    },
    maritalStatus: {
        type: String,
        enum: ['KAWIN', 'TIDAK KAWIN', 'JANDA/DUDA'],
        required: [true, "'Status Menikah' tidak boleh kosong"],
    },
    job: {
        type: String,
        required: [true, "'Pekerjaan' tidak boleh kosong"],
    },
    changeLog: [changeLogSchema],
}, {
    collection: 'Patients',
});

module.exports = mongoose.model('Patients', patientsSchema);
