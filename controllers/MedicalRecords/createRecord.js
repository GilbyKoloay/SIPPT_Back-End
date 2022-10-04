const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// create record in MedicalRecords collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        bodyHeight,
        bodyWeight,
        tension,
        pulse,
        respiration,
        bodyTemperature,
        laboratorium,
        history,
        physicalExamination,
        diagnosis,
        medicalPrescription,
        suggestion,
    } = req.body;

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    // check medical record's id
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
                bodyHeight,
                bodyWeight,
                tension,
                pulse,
                respiration,
                bodyTemperature,
                laboratorium,
                history,
                physicalExamination,
                diagnosis,
                medicalPrescription,
                suggestion,
            },
            changeLog: {
                _changedBy: _employee,
                description: "Menambah catatan baru",
            }
        }});

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan catatan baru di rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan catatan baru di rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
