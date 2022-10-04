const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// create new data in MedicalRecords collections
module.exports = async (req, res) => {
    const { _employee } = req.body;

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.create({ changeLog: {
            _changedBy: _employee,
            description: "Membuat rekam medis baru",
        }});

        res.status(200).json({
            status: "success",
            msg: `Berhasil membuat rekam medis baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal membuat rekam medis baru`,
            desc: e.message,
            data: null,
        });
    }
};
