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

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

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

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan rekaman baru di rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan rekaman baru di rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
