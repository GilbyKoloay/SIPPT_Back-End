const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// create record in MedicalRecords collections
module.exports = async (req, res) => {
    const {
        _id,
        _createdBy,
        _medicalPrescription,
        bodyHeight,
        bodyWeight,
        tension,
        pulse,
        respiration,
        bodyTemperature,
        laboratorium,
        his_phyExam_dia,
        suggestion,
        initials,
    } = req.body;

    try {
        const result = await db.updateOne({ _id }, { $push: {
            records: {
                _id: mongoose.Types.ObjectId(),
                _createdBy,
                _medicalPrescription,
                bodyHeight,
                bodyWeight,
                tension,
                pulse,
                respiration,
                bodyTemperature,
                laboratorium,
                his_phyExam_dia,
                suggestion,
                initials,
            }
        }});

        res.status(200).json({
            status: `success`,
            msg: `Berhasil menambahkan Rekam Medis baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan Rekam Medis baru`,
            desc: e.message,
            data: null,
        });
    }
};
