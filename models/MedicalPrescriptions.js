const mongoose = require('mongoose');

const medicalPrescriptionsSchema = new mongoose.Schema({
    _patient: {
        type: String,
        required: [true, "'ID Pasien' tidak boleh kosong"],
    },
    _createdBy: {
        type: String,
        required: [true, "'ID Pegawai' tidak boleh kosong"],
    },
    createdAt: {
        type: Date,
        // default: date now
    },
    // drugs (array) (stores the drugs and the description)
    isDone: {
        _finishedBy: {
            type: String,
            default: null,
        },
        status: {
            type: Boolean,
            default: false,
        },
    }
});

module.exports = mongoose.model('MedicalRecords', medicalPrescriptionsSchema);
