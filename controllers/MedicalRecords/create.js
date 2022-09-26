const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// create new data in MedicalRecords collections
module.exports = async (req, res) => {
    try {
        const result = await db.create({});

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
