const db = require('../../models/BPJS');
const mongoose = require('mongoose');

// change data in BPJS collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        cardNumbmer,
        name,
        birthDate,
        healthFacilityLevel,
        nursingClass,
        NIK,
        address,
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

    // check bpjs' id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID BPJS tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah data BPJS",
            }},
            $set: {
                cardNumbmer,
                name,
                birthDate,
                healthFacilityLevel,
                nursingClass,
                NIK,
                address,
            },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data BPJS`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data BPJS`,
            desc: e.message,
            data: null,
        });
    }
};
